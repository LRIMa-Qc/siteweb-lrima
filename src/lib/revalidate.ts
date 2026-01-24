import { revalidatePath } from 'next/cache'

/**
 * Revalidates specific paths on the frontend to ensure data consistency.
 *
 * @param paths - Array of paths to revalidate (e.g., ['/', '/nouvelles'])
 */
export async function revalidatePaths(paths: string[]) {
  try {
    const locales = ['en', 'fr']

    for (const path of paths) {
      for (const locale of locales) {
        const localizedPath = `/${locale}${path === '/' ? '' : path}`
        revalidatePath(localizedPath)
      }
    }
  } catch (error) {
    console.error('[Revalidate] Error:', error)
  }
}

/**
 * Standard revalidation logic for collections.
 * Revalidates the home page, the collection listing page, and the specific item page.
 *
 * @param collection - The slug of the collection (e.g., 'news')
 * @param slug - The slug of the specific item changed
 * @param routePrefix - The URL prefix for the collection (e.g., '/nouvelles')
 */
export async function revalidateCollection(
  collection: string,
  slug?: string,
  routePrefix?: string,
) {
  const paths = ['/']

  if (routePrefix) {
    paths.push(routePrefix)
    if (slug) {
      paths.push(`${routePrefix}/${slug}`)
    }
  }

  await revalidatePaths(paths)
}
