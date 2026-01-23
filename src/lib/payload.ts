import { getPayload } from 'payload'
import config from '@/payload.config'
import type { News, Member, Publication } from '@/types'

/**
 * Cached Payload CMS instance to avoid re-initialization on subsequent calls.
 * Improves performance by reusing the same instance across requests.
 */
let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null

/**
 * Retrieves or initializes the Payload CMS client instance.
 *
 * @returns Promise resolving to the Payload client
 */
async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload
  }
  cachedPayload = await getPayload({ config })
  return cachedPayload
}

// ==================== NEWS ====================

/**
 * Fetches news articles from the CMS with optional filtering.
 *
 * @param options - Optional parameters for filtering and pagination
 * @param options.limit - Maximum number of news items to fetch (default: 100)
 * @param options.featured - Filter by featured status
 * @param options.locale - Locale for content (default: 'en')
 * @returns Promise resolving to an array of News items
 */
export async function getNews(options?: {
  limit?: number
  featured?: boolean
  locale?: string
}): Promise<News[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'news',
      limit: options?.limit || 100,
      where: options?.featured !== undefined ? { featured: { equals: options.featured } } : {},
      sort: '-publishedDate',
      locale: (options?.locale || 'fr') as 'en' | 'fr',
    })

    return docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      summary: doc.summary || undefined,
      content: doc.content, // Keep as raw Lexical structure
      imageUrl: typeof doc.image === 'object' ? doc.image?.url || undefined : undefined,
      author: doc.author || undefined,
      category: doc.category || undefined,
      tags: doc.tags?.map((t: any) => t.tag) || [],
      featured: doc.featured || undefined,
      publishedDate: new Date(doc.publishedDate),
      updatedDate: doc.updatedAt ? new Date(doc.updatedAt) : undefined,
      slug: doc.slug,
    }))
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

/**
 * Fetches a single news article by its slug.
 *
 * @param slug - The unique slug identifier for the news article
 * @param locale - Locale for content (default: 'fr')
 * @returns Promise resolving to a News item or null if not found
 */
export async function getNewsBySlug(slug: string, locale?: string): Promise<News | null> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'news',
      where: { slug: { equals: slug } },
      limit: 1,
      locale: (locale || 'fr') as 'en' | 'fr',
    })

    if (!docs || docs.length === 0) return null

    const doc = docs[0]
    return {
      id: doc.id,
      title: doc.title,
      summary: doc.summary || undefined,
      content: doc.content, // Keep as raw Lexical structure
      imageUrl: typeof doc.image === 'object' ? doc.image?.url || undefined : undefined,
      author: doc.author || undefined,
      category: doc.category || undefined,
      tags: doc.tags?.map((t: any) => t.tag) || [],
      featured: doc.featured || undefined,
      publishedDate: new Date(doc.publishedDate),
      updatedDate: doc.updatedAt ? new Date(doc.updatedAt) : undefined,
      slug: doc.slug,
    }
  } catch (error) {
    console.error('Error fetching news by slug:', error)
    return null
  }
}

// ==================== MEMBERS ====================

/**
 * Fetches team members from the CMS with optional filtering by status.
 *
 * @param options - Optional parameters for filtering
 * @param options.status - Filter by member status (active, alumni, or collaborator)
 * @param options.locale - Locale for content (default: 'en')
 * @returns Promise resolving to an array of Member items
 */
export async function getMembers(options?: {
  status?: 'active' | 'alumni' | 'collaborator'
  locale?: string
}): Promise<Member[]> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'members',
      where: options?.status ? { status: { equals: options.status } } : {},
      sort: '-joinDate',
      locale: (options?.locale || 'fr') as 'en' | 'fr',
    })

    return docs.map((doc: any) => ({
      id: doc.id,
      name: doc.name,
      title: doc.title,
      role: doc.role,
      email: doc.email,
      phone: doc.phone,
      bio: doc.bio,
      imageUrl: typeof doc.image === 'object' ? doc.image?.url : undefined,
      researchInterests: doc.researchInterests?.map((ri: any) => ri.interest) || [],
      publications: [],
      website: doc.website,
      linkedIn: doc.linkedIn,
      googleScholar: doc.googleScholar,
      status: doc.status,
      joinDate: new Date(doc.joinDate),
      slug: doc.slug,
    }))
  } catch (error) {
    console.error('Error fetching members:', error)
    return []
  }
}

/**
 * Fetches a single team member by their slug.
 *
 * @param slug - The unique slug identifier for the member
 * @param locale - Locale for content (default: 'fr')
 * @returns Promise resolving to a Member item or null if not found
 */
export async function getMemberBySlug(slug: string, locale?: string): Promise<Member | null> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'members',
      where: { slug: { equals: slug } },
      limit: 1,
      locale: (locale || 'fr') as 'en' | 'fr',
    })

    if (!docs || docs.length === 0) return null

    const doc = docs[0]
    return {
      id: doc.id,
      name: doc.name,
      title: doc.title,
      role: doc.role,
      email: doc.email || undefined,
      phone: doc.phone || undefined,
      bio: doc.bio,
      imageUrl: typeof doc.image === 'object' ? doc.image?.url || undefined : undefined,
      researchInterests: doc.researchInterests?.map((ri: any) => ri.interest) || [],
      publications: [],
      website: doc.website || undefined,
      linkedIn: doc.linkedIn || undefined,
      googleScholar: doc.googleScholar || undefined,
      status: doc.status,
      joinDate: new Date(doc.joinDate),
      slug: doc.slug,
    }
  } catch (error) {
    console.error('Error fetching member by slug:', error)
    return null
  }
}

// ==================== PUBLICATIONS ====================

/**
 * Fetches scientific publications from the CMS with optional filtering.
 *
 * @param options - Optional parameters for filtering and pagination
 * @param options.year - Filter publications by year
 * @param options.limit - Maximum number of publications to fetch (default: 100)
 * @param options.locale - Locale for content (default: 'fr')
 * @returns Promise resolving to an array of Publication items
 */
export async function getPublications(options?: {
  year?: number
  limit?: number
  locale?: string
}): Promise<Publication[]> {
  try {
    const payload = await getPayloadClient()

    const where: any = {}
    if (options?.year) where.year = { equals: options.year }

    const { docs } = await payload.find({
      collection: 'publications',
      where,
      limit: options?.limit || 100,
      sort: '-year',
      locale: (options?.locale || 'fr') as 'en' | 'fr',
    })

    return docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      authors: doc.authors?.map((a: any) => a.author) || [],
      abstract: doc.abstract,
      year: doc.year,
      venue: doc.venue,
      journal: doc.journal,
      volume: doc.volume,
      issue: doc.issue,
      pages: doc.pages,
      doi: doc.doi,
      url: doc.url,
      pdfUrl: doc.pdfUrl,
      keywords: doc.keywords?.map((k: any) => k.keyword) || [],
      citation: doc.citation,
      publishedDate: new Date(doc.publishedDate),
      slug: doc.slug,
    }))
  } catch (error) {
    console.error('Error fetching publications:', error)
    return []
  }
}

/**
 * Fetches a single publication by its slug.
 *
 * @param slug - The unique slug identifier for the publication
 * @param locale - Locale for content (default: 'fr')
 * @returns Promise resolving to a Publication item or null if not found
 */
export async function getPublicationBySlug(
  slug: string,
  locale?: string,
): Promise<Publication | null> {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'publications',
      where: { slug: { equals: slug } },
      limit: 1,
      locale: (locale || 'fr') as 'en' | 'fr',
    })

    if (!docs || docs.length === 0) return null

    const doc = docs[0]
    return {
      id: doc.id,
      title: doc.title,
      authors: doc.authors?.map((a: any) => a.author) || [],
      abstract: doc.abstract,
      year: doc.year,
      venue: doc.venue || undefined,
      journal: doc.journal || undefined,
      volume: doc.volume || undefined,
      issue: doc.issue || undefined,
      pages: doc.pages || undefined,
      doi: doc.doi || undefined,
      url: doc.url || undefined,
      pdfUrl: doc.pdfUrl || undefined,
      keywords: doc.keywords?.map((k: any) => k.keyword) || [],
      publishedDate: new Date(doc.publishedDate),
      slug: doc.slug,
    }
  } catch (error) {
    console.error('Error fetching publication by slug:', error)
    return null
  }
}
