/**
 * WordPress SQL to Payload CMS Migration Script
 *
 * This script parses the WordPress SQL dump and converts the data
 * to JSON format compatible with Payload CMS collections.
 *
 * Usage:
 *   npx tsx scripts/migrate-wordpress-data.ts
 *
 * Output:
 *   - migrated-data/publications.json
 *   - migrated-data/software.json
 *   - migrated-data/news.json
 */

import * as fs from 'fs'
import * as path from 'path'

// ============================================================================
// Types
// ============================================================================

interface WordPressPublication {
  publication_id: string
  publication_type: string
  publication_names: string
  publication_title: string
  publication_state: string
  publication_journal: string
  publication_country: string | null
  publication_date: string
}

interface WordPressSoftware {
  software_id: string
  software_name: string
  software_link: string | null
}

interface WordPressPost {
  ID: string
  post_author: string
  post_date: string
  post_date_gmt: string
  post_content: string
  post_title: string
  post_excerpt: string
  post_status: string
  comment_status: string
  ping_status: string
  post_password: string
  post_name: string
  to_ping: string
  pinged: string
  post_modified: string
  post_modified_gmt: string
  post_content_filtered: string
  post_parent: string
  guid: string
  menu_order: string
  post_type: string
  post_mime_type: string
  comment_count: string
}

interface WordPressPostMeta {
  meta_id: string
  post_id: string
  meta_key: string
  meta_value: string
}

// type Localized<T> = { fr: T } (Removed in favor of flat data for import)

// Payload CMS types
interface PayloadPublication {
  title: string
  slug: string
  authors: { author: string }[]
  abstract: string
  year: number
  venue?: string
  journal?: string
  publishedDate: string
  url?: string
  keywords: { keyword: string }[]
}

interface PayloadSoftware {
  name: string
  slug: string
  description: string
  url?: string
  year?: number
}

interface PayloadRichTextNode {
  type: string
  text?: string
  children?: PayloadRichTextNode[]
  direction?: 'ltr' | 'rtl' | null
  format?: string | number
  indent?: number
  version?: number
  mode?: string
  style?: string
  detail?: number
}

interface PayloadRichText {
  root: {
    type: string
    children: PayloadRichTextNode[]
    direction: 'ltr' | 'rtl' | null
    format: number
    indent: number
    version: number
  }
}

interface PayloadNews {
  title: string
  slug: string
  summary?: string
  content: PayloadRichText
  author?: string
  category?: string
  tags: { tag: string }[]
  featured: boolean
  featuredImage?: string
  publishedDate: string
}

// ============================================================================
// Utility Functions
// ============================================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100)
}

function parseYear(dateStr: string): number {
  // Try to extract a 4-digit year from various date formats
  const yearMatch = dateStr.match(/\b(19|20)\d{2}\b/)
  if (yearMatch) {
    return parseInt(yearMatch[0], 10)
  }
  return new Date().getFullYear()
}

function parseAuthors(authorsStr: string): { author: string }[] {
  // Split authors by common separators: ", and ", " and ", ","
  const separators = /(?:,\s*and\s+|\s+and\s+|,\s*)/i
  return authorsStr
    .split(separators)
    .map((author) => author.trim())
    .filter((author) => author.length > 0)
    .map((author) => ({ author }))
}

function createRichText(html: string): PayloadRichText {
  // Clean WordPress block comments and minor HTML cleanup
  const cleanSource = html
    .replace(/<!--[^>]*-->/g, '') // Remove WordPress block comments
    .replace(/\\n/g, '\n') // Unescape newlines
    .replace(/\\r/g, '') // Remove carriage returns
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/(^(\s|<br\s*\/?>|&nbsp;)+)|((\s|<br\s*\/?>|&nbsp;)+$)/g, '') // Strip leading/trailing junk
    .trim()

  // Split into paragraphs (by double newline or single newline if it looks like a block)
  const lines = cleanSource.split(/\n\s*\n/).filter((line) => line.trim() !== '')

  return {
    root: {
      type: 'root',
      children: lines.map((line) => {
        // Remove remaining HTML tags for each paragraph and strip leading/trailing spaces/breaks
        const textContent = line
          .replace(/<[^>]+>/g, '')
          .replace(/(^(\s|<br\s*\/?>|&nbsp;)+)|((\s|<br\s*\/?>|&nbsp;)+$)/g, '')
          .trim()

        return {
          type: 'paragraph',
          version: 1,
          children: [
            {
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: textContent,
              type: 'text',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: 0,
          indent: 0,
        }
      }),
      direction: 'ltr',
      format: 0,
      indent: 0,
      version: 1,
    },
  }
}

function extractSummaryFromContent(content: string): string {
  // Remove WordPress block comments and HTML tags
  const cleanText = content
    .replace(/<!--[^>]*-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\\n/g, ' ')
    .replace(/\\r/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  // Take first 200 characters as summary
  return cleanText.substring(0, 200) + (cleanText.length > 200 ? '...' : '')
}

function extractCategoryFromPostType(postType: string): string {
  switch (postType) {
    case 'post':
      return 'Blog'
    case 'page':
      return 'Page'
    default:
      return 'General'
  }
}

// ============================================================================
// SQL Parsing Functions
// ============================================================================

function parseSQLInserts<T>(
  sqlContent: string,
  tableName: string,
  fieldMapper: (values: (string | null)[]) => T,
): T[] {
  const results: T[] = []

  // Search patterns for INSERT statements - handle both VALUES( and VALUES (
  const insertPrefixNoSpace = `INSERT INTO \`${tableName}\` VALUES(`
  const insertPrefixWithSpace = `INSERT INTO \`${tableName}\` VALUES (`

  let searchPos = 0

  while (searchPos < sqlContent.length) {
    // Find the next INSERT for our table
    let insertStart = sqlContent.indexOf(insertPrefixNoSpace, searchPos)
    let prefixLength = insertPrefixNoSpace.length

    const insertStartWithSpace = sqlContent.indexOf(insertPrefixWithSpace, searchPos)

    // Use whichever comes first (if both found)
    if (insertStart === -1 || (insertStartWithSpace !== -1 && insertStartWithSpace < insertStart)) {
      insertStart = insertStartWithSpace
      prefixLength = insertPrefixWithSpace.length
    }

    if (insertStart === -1) break

    // Find the VALUES content - need to handle nested parentheses
    const valuesStart = insertStart + prefixLength
    let valuesEnd = -1
    let parenDepth = 1
    let inQuotes = false
    let quoteChar = ''
    let escaped = false

    for (let i = valuesStart; i < sqlContent.length; i++) {
      const char = sqlContent[i]

      if (escaped) {
        escaped = false
        continue
      }

      if (char === '\\') {
        escaped = true
        continue
      }

      if (!inQuotes && (char === '"' || char === "'")) {
        inQuotes = true
        quoteChar = char
        continue
      }

      if (inQuotes && char === quoteChar) {
        // Check if the next char is also the same quote (escaped quote like '' or "")
        if (i + 1 < sqlContent.length && sqlContent[i + 1] === quoteChar) {
          i++ // Skip the escaped quote
          continue
        }
        inQuotes = false
        continue
      }

      if (!inQuotes) {
        if (char === '(') parenDepth++
        if (char === ')') {
          parenDepth--
          if (parenDepth === 0) {
            valuesEnd = i
            break
          }
        }
      }
    }

    if (valuesEnd === -1) {
      // Could not find closing paren, move past this INSERT
      searchPos = valuesStart
      continue
    }

    const valuesStr = sqlContent.substring(valuesStart, valuesEnd)
    const values = parseValues(valuesStr)

    try {
      results.push(fieldMapper(values))
    } catch (e) {
      // Skip failed rows silently for large tables
    }

    // Move search position past this INSERT statement
    // Look for next record: either "),(" for multi-value INSERT or ");" for end
    let nextPos = valuesEnd + 1

    // Check if there are more values in this INSERT (multi-value INSERT format)
    while (nextPos < sqlContent.length) {
      const nextChar = sqlContent[nextPos]
      if (nextChar === ',') {
        // Skip whitespace after comma
        nextPos++
        while (nextPos < sqlContent.length && /\s/.test(sqlContent[nextPos])) {
          nextPos++
        }
        if (sqlContent[nextPos] === '(') {
          // Another value tuple - parse it
          nextPos++ // Skip the opening paren
          let tupleEnd = -1
          parenDepth = 1
          inQuotes = false
          quoteChar = ''
          escaped = false

          for (let i = nextPos; i < sqlContent.length; i++) {
            const char = sqlContent[i]

            if (escaped) {
              escaped = false
              continue
            }

            if (char === '\\') {
              escaped = true
              continue
            }

            if (!inQuotes && (char === '"' || char === "'")) {
              inQuotes = true
              quoteChar = char
              continue
            }

            if (inQuotes && char === quoteChar) {
              if (i + 1 < sqlContent.length && sqlContent[i + 1] === quoteChar) {
                i++
                continue
              }
              inQuotes = false
              continue
            }

            if (!inQuotes) {
              if (char === '(') parenDepth++
              if (char === ')') {
                parenDepth--
                if (parenDepth === 0) {
                  tupleEnd = i
                  break
                }
              }
            }
          }

          if (tupleEnd !== -1) {
            const tupleStr = sqlContent.substring(nextPos, tupleEnd)
            const tupleValues = parseValues(tupleStr)
            try {
              results.push(fieldMapper(tupleValues))
            } catch (e) {
              // Skip failed rows
            }
            nextPos = tupleEnd + 1
            continue
          }
        }
      }
      break
    }

    searchPos = nextPos
  }

  return results
}

function parseValues(valuesStr: string): (string | null)[] {
  const values: (string | null)[] = []
  let current = ''
  let inQuotes = false
  let quoteChar = ''
  let escaped = false

  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i]

    if (escaped) {
      if (char === 'n') current += '\n'
      else if (char === 'r') current += '\r'
      else if (char === 't') current += '\t'
      else if (char === '\\') current += '\\'
      else if (char === "'") current += "'"
      else if (char === '"') current += '"'
      else current += char

      escaped = false
      continue
    }

    if (char === '\\') {
      escaped = true
      continue
    }

    if (!inQuotes && (char === '"' || char === "'")) {
      inQuotes = true
      quoteChar = char
      continue
    }

    if (inQuotes && char === quoteChar) {
      // Check if the next char is also the same quote (escaped quote like '' or "")
      if (i + 1 < valuesStr.length && valuesStr[i + 1] === quoteChar) {
        current += quoteChar // Add the escaped quote to the value
        i++ // Skip the next quote
        continue
      }
      inQuotes = false
      continue
    }

    if (!inQuotes && char === ',') {
      values.push(current.trim() === 'NULL' ? null : current.trim())
      current = ''
      continue
    }

    current += char
  }

  // Push the last value
  if (current.trim()) {
    values.push(current.trim() === 'NULL' ? null : current.trim())
  }

  return values
}

// ============================================================================
// Data Transformation Functions
// ============================================================================

function transformPublications(wpPubs: WordPressPublication[]): PayloadPublication[] {
  return wpPubs.map((pub) => {
    const year = parseYear(pub.publication_date)
    const isJournal = pub.publication_type === 'international_journal'

    const publication: PayloadPublication = {
      title: pub.publication_title.trim(),
      slug: slugify(pub.publication_title),
      authors: parseAuthors(pub.publication_names),
      abstract: `Publication in ${pub.publication_journal || 'conference proceedings'}.`,
      year,
      publishedDate: `${year}-01-01`,
      keywords: [],
    }

    if (isJournal) {
      publication.journal = pub.publication_journal || undefined
    } else {
      publication.venue = [pub.publication_journal, pub.publication_country]
        .filter(Boolean)
        .join(', ')
    }

    // Extract keywords from publication type
    if (pub.publication_type) {
      publication.keywords.push({
        keyword: pub.publication_type.replace(/_/g, ' '),
      })
    }

    return publication
  })
}

function transformPosts(
  wpPosts: WordPressPost[],
  postMeta: Map<string, string>,
  attachments: Map<string, string>,
): PayloadNews[] {
  // Filter for published posts and pages only (exclude revisions, attachments, etc.)
  const publishedPosts = wpPosts.filter(
    (post) =>
      post.post_status === 'publish' &&
      (post.post_type === 'post' || post.post_type === 'page') &&
      post.post_title.trim().length > 0 &&
      post.post_content.trim().length > 0,
  )

  return publishedPosts.map((post) => {
    const thumbnailId = postMeta.get(post.ID)
    const featuredImage = thumbnailId ? attachments.get(thumbnailId) : undefined

    return {
      title: post.post_title.replace(/\\'/g, "'").trim(),
      slug: post.post_name || slugify(post.post_title),
      content: createRichText(post.post_content),
      author: 'LRIMA',
      category: extractCategoryFromPostType(post.post_type),
      tags: [],
      featured: false,
      featuredImage,
      publishedDate: post.post_date.split(' ')[0], // Extract date part only
    }
  })
}

function transformSoftware(wpSoftware: WordPressSoftware[]): PayloadSoftware[] {
  return wpSoftware.map((sw) => {
    // Try to extract year from name (e.g., "SCV (2016)")
    const yearMatch = sw.software_name.match(/\((\d{4})\)/)
    const year = yearMatch ? parseInt(yearMatch[1], 10) : undefined

    return {
      name: sw.software_name.replace(/\r?\n/g, ' ').trim(),
      slug: slugify(sw.software_name),
      description: sw.software_name,
      url: sw.software_link || undefined,
      year,
    }
  })
}

// ============================================================================
// Main Migration Function
// ============================================================================

async function migrate() {
  console.log('Starting WordPress to Payload CMS Migration...\n')

  // Read the SQL file - use process.cwd() for ESM/tsx compatibility
  const projectRoot = process.cwd()
  const sqlPath = path.join(projectRoot, 'dup-database__6a1cb72-08202717.sql')

  if (!fs.existsSync(sqlPath)) {
    console.error(`SQL file not found at: ${sqlPath}`)
    process.exit(1)
  }

  console.log(`Reading SQL file: ${sqlPath}`)
  const sqlContent = fs.readFileSync(sqlPath, 'utf-8')
  console.log(`   File size: ${(sqlContent.length / 1024 / 1024).toFixed(2)} MB\n`)

  // Parse PUBLICATIONS table
  console.log('Parsing PUBLICATIONS table...')
  const wpPublications = parseSQLInserts<WordPressPublication>(
    sqlContent,
    'PUBLICATIONS',
    (values) => ({
      publication_id: values[0] || '',
      publication_type: values[1] || '',
      publication_names: values[2] || '',
      publication_title: values[3] || '',
      publication_state: values[4] || '',
      publication_journal: values[5] || '',
      publication_country: values[6],
      publication_date: values[7] || '',
    }),
  )
  console.log(`   Found ${wpPublications.length} publications`)

  // Parse SOFTWARE table
  console.log('Parsing SOFTWARE table...')
  const wpSoftware = parseSQLInserts<WordPressSoftware>(sqlContent, 'SOFTWARE', (values) => ({
    software_id: values[0] || '',
    software_name: values[1] || '',
    software_link: values[2],
  }))
  console.log(`   Found ${wpSoftware.length} software entries`)

  // Parse wp_posts table for news/blog posts
  console.log('Parsing wp_posts table...')
  const wpPosts = parseSQLInserts<WordPressPost>(sqlContent, 'wp_posts', (values) => ({
    ID: values[0] || '',
    post_author: values[1] || '',
    post_date: values[2] || '',
    post_date_gmt: values[3] || '',
    post_content: values[4] || '',
    post_title: values[5] || '',
    post_excerpt: values[6] || '',
    post_status: values[7] || '',
    comment_status: values[8] || '',
    ping_status: values[9] || '',
    post_password: values[10] || '',
    post_name: values[11] || '',
    to_ping: values[12] || '',
    pinged: values[13] || '',
    post_modified: values[14] || '',
    post_modified_gmt: values[15] || '',
    post_content_filtered: values[16] || '',
    post_parent: values[17] || '',
    guid: values[18] || '',
    menu_order: values[19] || '',
    post_type: values[20] || '',
    post_mime_type: values[21] || '',
    comment_count: values[22] || '',
  }))
  console.log(`   Found ${wpPosts.length} total posts (including pages, revisions, attachments)\n`)

  // Parse wp_postmeta table for featured image IDs
  console.log('Parsing wp_postmeta table...')
  const wpPostMeta = parseSQLInserts<WordPressPostMeta>(sqlContent, 'wp_postmeta', (values) => ({
    meta_id: values[0] || '',
    post_id: values[1] || '',
    meta_key: values[2] || '',
    meta_value: values[3] || '',
  }))
  console.log(`   Found ${wpPostMeta.length} meta entries`)

  // Create a map of post ID to its thumbnail ID
  const featuredImageMap = new Map<string, string>()
  wpPostMeta.forEach((meta) => {
    if (meta.meta_key === '_thumbnail_id') {
      featuredImageMap.set(meta.post_id, meta.meta_value)
    }
  })

  // Create a map of attachment IDs to their GUIDs (URLs)
  const attachmentMap = new Map<string, string>()
  wpPosts.forEach((post) => {
    if (post.post_type === 'attachment') {
      attachmentMap.set(post.ID, post.guid)
    }
  })

  // Transform data to Payload format
  console.log('Transforming data to Payload CMS format...')
  const payloadPublications = transformPublications(wpPublications)
  const payloadSoftware = transformSoftware(wpSoftware)
  const payloadNews = transformPosts(wpPosts, featuredImageMap, attachmentMap)
  console.log(`   Found ${payloadNews.length} publishable news/page posts`)

  // Create output directory
  const outputDir = path.join(projectRoot, 'migrated-data')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Write JSON files
  console.log('\nWriting JSON files...')

  const publicationsPath = path.join(outputDir, 'publications.json')
  fs.writeFileSync(publicationsPath, JSON.stringify(payloadPublications, null, 2))
  console.log(`   Done: ${publicationsPath}`)

  const softwarePath = path.join(outputDir, 'software.json')
  fs.writeFileSync(softwarePath, JSON.stringify(payloadSoftware, null, 2))
  console.log(`   Done: ${softwarePath}`)

  const newsPath = path.join(outputDir, 'news.json')
  fs.writeFileSync(newsPath, JSON.stringify(payloadNews, null, 2))
  console.log(`   Done: ${newsPath}`)

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('Migration Complete!')
  console.log('='.repeat(60))
  console.log(`
Summary:
  Publications: ${payloadPublications.length} records
  Software: ${payloadSoftware.length} records
  News/Pages: ${payloadNews.length} records

Output directory: ${outputDir}
`)
}

// Run migration
migrate().catch(console.error)
