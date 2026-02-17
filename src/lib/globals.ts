import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Fetch the Homepage global content for a given locale.
 */
export async function getHomepageContent(locale: string) {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({
    slug: 'homepage',
    locale: locale as 'en' | 'fr',
  })
  return data
}

/**
 * Fetch the Site Settings global content for a given locale.
 */
export async function getSiteSettings(locale: string) {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as 'en' | 'fr',
  })
  return data
}
