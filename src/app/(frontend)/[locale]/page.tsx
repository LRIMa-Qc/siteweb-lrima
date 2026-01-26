import * as m from '@/paraglide/messages'
import { getNews, getPublications, getMembers, createMemberMap } from '@/lib/payload'
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
 * This page is composed of modular sections:
 * - HeroSection: Full-viewport hero with background image
 * - HorizontalScrollSection: About section with horizontal scroll effect
 * - NewsSection: Latest news with featured cards
 * - PublicationsSection: Recent publications list
 * - AudienceSection: "Pour/For" scroll-highlight section
 * - GallerySection: Photo marquee gallery
 * - CTASection: Call-to-action with contact buttons
 */
export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params

  // Fetch data in parallel for better performance
  const [news, publications, members] = await Promise.all([
    getNews({ limit: NEWS_LIMIT, featured: true, locale }),
    getPublications({ limit: PUBLICATIONS_LIMIT, locale }),
    getMembers({ locale }),
  ])

  // Create member map for linking authors to profiles
  const memberMap = createMemberMap(members)

  // Get localized audience data
  const audiences = getLocalizedAudiences(locale)

  return (
    <div className="home bg-white min-h-screen">
      <HeroSection />

      <HorizontalScrollSection
        locale={locale}
        title={m['home.about.title']()}
        description={m['home.about.description']()}
      />

      <NewsSection locale={locale} news={news} memberMap={memberMap} />

      <PublicationsSection locale={locale} publications={publications} memberMap={memberMap} />

      <AudienceSection locale={locale} audiences={audiences} />

      <GallerySection locale={locale} images={GALLERY_IMAGES} />

      <CTASection locale={locale} />
    </div>
  )
}
