import * as m from '@/paraglide/messages'
import { getNews, getPublications, getMembers, createMemberMap } from '@/lib/payload'
import { getHomepageContent } from '@/lib/globals'
import {
  HeroSection,
  HorizontalScrollSection,
  NewsSection,
  PublicationsSection,
  AudienceSection,
  GallerySection,
  CTASection,
  GALLERY_IMAGES,
  NEWS_LIMIT,
  PUBLICATIONS_LIMIT,
  getLocalizedAudiences,
} from '@/components/landing'
import type { Media } from '@/payload-types'

/**
 * Props for the HomePage component
 */
interface HomePageProps {
  params: Promise<{
    locale: string
  }>
}

/**
 * Home Page - Landing page for the LRIMa website
 *
 * Fetches editable content from the Payload CMS Homepage global.
 * Falls back to hardcoded paraglide messages and constants when CMS fields are empty.
 */
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  // Fetch data in parallel for better performance
  const [news, publications, members, homepageContent] = await Promise.all([
    getNews({ limit: NEWS_LIMIT, featured: true, locale }),
    getPublications({ limit: PUBLICATIONS_LIMIT, locale }),
    getMembers({ locale }),
    getHomepageContent(locale),
  ])

  // Create member map for linking authors to profiles
  const memberMap = createMemberMap(members)

  // Build audience data: prefer CMS, fallback to constants
  const cmsAudiences = homepageContent?.audiences
  const audiences =
    cmsAudiences && cmsAudiences.length > 0
      ? cmsAudiences.map((item) => ({ text: item.text || '' }))
      : getLocalizedAudiences(locale)

  // Build gallery images: prefer CMS, fallback to constants
  const cmsGallery = homepageContent?.gallery?.images
  const galleryImages =
    cmsGallery && cmsGallery.length > 0
      ? cmsGallery.map((item) => {
          const media = item.image as Media | undefined
          return {
            src: media?.url || '',
            alt: media?.alt || 'Gallery image',
          }
        })
      : [...GALLERY_IMAGES]

  // Build horizontal scroll images: prefer CMS, fallback to hardcoded
  const hImages = homepageContent?.horizontalImages
  const horizontalImages = {
    image1: (hImages?.image1 as Media | undefined)?.url || '/hori-image-2.jpg',
    image1Alt: (hImages?.image1 as Media | undefined)?.alt || '',
    image2: (hImages?.image2 as Media | undefined)?.url || '/hori-image-1.jpg',
    image2Alt: (hImages?.image2 as Media | undefined)?.alt || '',
    image3: (hImages?.image3 as Media | undefined)?.url || '/hori-image-3.jpg',
    image3Alt: (hImages?.image3 as Media | undefined)?.alt || '',
  }

  // Build stats: prefer CMS, fallback to hardcoded
  const cmsStats = homepageContent?.stats?.items
  const stats =
    cmsStats && cmsStats.length > 0
      ? cmsStats.map((item) => ({ number: item.number, label: item.label }))
      : [
          { number: '30+', label: m['home.stats.publications']({}, { locale: locale as any }) },
          { number: '25+', label: m['home.stats.researchers']({}, { locale: locale as any }) },
          { number: '10+', label: m['home.stats.years']({}, { locale: locale as any }) },
        ]

  // Build quote: prefer CMS, fallback to paraglide
  const quoteText = homepageContent?.quote?.text || m['home.quote']({}, { locale: locale as any })
  const quoteSource =
    homepageContent?.quote?.source || m['home.quoteSource']({}, { locale: locale as any })

  // Build CTA data
  const ctaData = {
    title: homepageContent?.cta?.title || undefined,
    subtitle: homepageContent?.cta?.subtitle || undefined,
    contactLabel: homepageContent?.cta?.contactLabel || undefined,
    joinLabel: homepageContent?.cta?.joinLabel || undefined,
    robotImageUrl: (homepageContent?.cta?.robotImage as Media | undefined)?.url || '/robot-gif.gif',
  }

  // Gallery title
  const galleryTitle = homepageContent?.gallery?.title || undefined

  return (
    <div className="home bg-white min-h-screen">
      <HeroSection
        labName={homepageContent?.hero?.labName || undefined}
        tagline={homepageContent?.hero?.tagline || undefined}
        ctaResearchLabel={homepageContent?.hero?.ctaResearchLabel || undefined}
        ctaContactLabel={homepageContent?.hero?.ctaContactLabel || undefined}
      />

      <HorizontalScrollSection
        locale={locale}
        title={homepageContent?.about?.title || m['home.about.title']()}
        description={homepageContent?.about?.description || m['home.about.description']()}
        horizontalImages={horizontalImages}
        stats={stats}
        quoteText={quoteText}
        quoteSource={quoteSource}
      />

      <NewsSection locale={locale} news={news} memberMap={memberMap} />

      <PublicationsSection locale={locale} publications={publications} memberMap={memberMap} />

      <AudienceSection locale={locale} audiences={audiences} />

      <GallerySection locale={locale} images={galleryImages} title={galleryTitle} />

      <CTASection locale={locale} {...ctaData} />
    </div>
  )
}
