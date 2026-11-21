import type { MetadataRoute } from 'next'
import { getMembers, getNews, getPublications } from '@/lib/payload'
import { locales } from '@/paraglide/runtime'
import { SITE_CONFIG } from '@/lib/constants'

export const revalidate = 86400

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url
  const staticRoutes = ['', '/membres', '/nouvelles', '/publications', '/contact', '/InHouse']

  const entries: MetadataRoute.Sitemap = []

  // Static routes
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      })
    }
  }

  // Dynamic routes
  try {
    const [members, news, publications] = await Promise.all([
      getMembers(),
      getNews({ limit: 100 }),
      getPublications({ limit: 100 }),
    ])

    for (const locale of locales) {
      for (const member of members) {
        entries.push({
          url: `${baseUrl}/${locale}/membres/${member.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
      for (const item of news) {
        entries.push({
          url: `${baseUrl}/${locale}/nouvelles/${item.slug}`,
          lastModified: item.updatedDate || item.publishedDate || new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
      for (const pub of publications) {
        entries.push({
          url: `${baseUrl}/${locale}/publications/${pub.slug}`,
          lastModified: pub.publishedDate || new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    }
  } catch (e) {
    console.error('Failed to generate sitemap:', e)
  }

  return entries
}

