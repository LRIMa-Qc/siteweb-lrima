/**
 * Payload CMS Data Import Script
 *
 * This script imports migrated JSON data into Payload CMS collections
 * using the Local API. It also handles uploading local media files.
 *
 * Usage:
 *   npx tsx scripts/import-to-payload.ts
 */

import * as dotenv from 'dotenv'
dotenv.config()

import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

// Path to downloaded WordPress media
const WP_MEDIA_DIR = path.join(projectRoot, 'wp-media')
const MIGRATED_DATA_DIR = path.join(projectRoot, 'migrated-data')

async function importData() {
  console.log('Starting Data Import to Payload CMS...\n')

  // Import config dynamically to ensure dotenv has loaded environment variables first
  const configModule = await import('../src/payload.config')
  const payload = await getPayload({ config: configModule.default })

  // 0. Cleanup (Optional: clear collections before import in dev)
  console.log('Cleaning up existing data...')
  await payload.delete({
    collection: 'publications',
    where: { id: { exists: true } },
  })
  await payload.delete({
    collection: 'news',
    where: { id: { exists: true } },
  })

  // 1. Import Publications
  await importCollection(payload, 'publications', 'publications.json')

  // 2. Import News (with Media handling)
  await importNews(payload)

  console.log('\nImport completed successfully!')
  process.exit(0)
}

async function importCollection(payload: any, slug: string, filename: string) {
  const filePath = path.join(MIGRATED_DATA_DIR, filename)
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filename}, skipping...`)
    return
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  console.log(`Importing ${data.length} entries into '${slug}'...`)

  for (const item of data) {
    try {
      await payload.create({
        collection: slug,
        locale: 'fr',
        data: item,
      })
    } catch (error: any) {
      console.error(`Failed to import onto '${slug}': ${item.title?.fr || item.name || 'Unknown'}`)
      if (error.data?.errors) {
        console.error('   Validation errors:', JSON.stringify(error.data.errors, null, 2))
      } else {
        console.error(`   Reason: ${error.message}`)
      }
    }
  }
}

async function importNews(payload: any) {
  const filePath = path.join(MIGRATED_DATA_DIR, 'news.json')
  if (!fs.existsSync(filePath)) {
    console.log('news.json not found, skipping news import...')
    return
  }

  const newsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  console.log(`Importing ${newsData.length} news entries...`)

  for (const item of newsData) {
    try {
      let mediaId = undefined

      // Handle featured image if present
      if (item.featuredImage) {
        mediaId = await uploadMedia(payload, item.featuredImage, item.title.fr)
      }

      // Create news entry
      const { featuredImage, ...newsItem } = item
      await payload.create({
        collection: 'news',
        locale: 'fr',
        data: {
          ...newsItem,
          image: mediaId,
        },
      })
    } catch (error: any) {
      console.error(`Failed to import news: ${item.title?.fr}`)
      if (error.data?.errors) {
        console.error('   Validation errors:', JSON.stringify(error.data.errors, null, 2))
      } else {
        console.error(`   Reason: ${error.message}`)
      }
    }
  }
}

async function uploadMedia(
  payload: any,
  wpUrl: string,
  title: string,
): Promise<string | undefined> {
  // Extract relative path from URL (e.g., wp-content/uploads/2020/04/image.jpg -> 2020/04/image.jpg)
  const uploadsMatch = wpUrl.match(/wp-content\/uploads\/(.+)$/)
  if (!uploadsMatch) return undefined

  const relativePath = uploadsMatch[1]
  const localPath = path.join(WP_MEDIA_DIR, relativePath)

  if (!fs.existsSync(localPath)) {
    // console.log(`Media file not found locally: ${relativePath}`)
    return undefined
  }

  try {
    // Check if media already exists (optional, but good for idempotency)
    const existingMedia = await payload.find({
      collection: 'media',
      where: {
        alt: {
          equals: title,
        },
      },
      limit: 1,
    })

    if (existingMedia.docs.length > 0) {
      return existingMedia.docs[0].id
    }

    // Upload new media
    const fileStats = fs.statSync(localPath)
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: title,
      },
      file: {
        data: fs.readFileSync(localPath),
        name: path.basename(localPath),
        size: fileStats.size,
        mimetype: getMimeType(localPath),
      },
    })

    return media.id
  } catch (error: any) {
    console.error(`   Failed to upload media: ${relativePath}`)
    console.error(`      Reason: ${error.message}`)
    return undefined
  }
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
  }
  return mimeTypes[ext] || 'application/octet-stream'
}

importData().catch((err) => {
  console.error('Fatal error during import:')
  console.error(err)
  process.exit(1)
})
