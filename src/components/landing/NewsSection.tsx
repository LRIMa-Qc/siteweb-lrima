/**
 * News Section Component
 *
 * Displays the latest news articles in a featured card grid layout.
 * Features:
 * - Large section header with "View All" link
 * - Two-column grid of news cards with hover effects
 * - Placeholder cards when no news is available
 * - Scroll animations via ScrollAnimation component
 */

import Link from 'next/link'
import {
  ScrollAnimation,
  StaggerContainer,
  SectionHeader,
  ArrowIcon,
  Section,
} from '@/components/ui'
import * as m from '@/paraglide/messages'
import { News } from '@/types'
import { NewsCard } from '@/components/templates/NewsCard'

// ============================================================================
// Types
// ============================================================================

interface NewsSectionProps {
  /** Current locale for i18n */
  locale: string
  /** Array of news items to display */
  news: News[]
  /** Map of member names to slugs for linking */
  memberMap?: Record<string, string>
}

// ============================================================================
// Constants
// ============================================================================

/** Number of placeholder cards to show when no news */
const PLACEHOLDER_COUNT = 2

// ============================================================================
// Component
// ============================================================================

export function NewsSection({ locale, news, memberMap = {} }: NewsSectionProps) {
  const newsToDisplay = news.length > 0 ? news.slice(0, 2) : null
  const title = m['home.latestNews']({}, { locale: locale as any })
  const viewAllText = m['home.viewAll']({}, { locale: locale as any })

  return (
    <Section aria-labelledby="news-heading">
      {/* Section Header */}
      <ScrollAnimation animation="fade-up" className="mb-16 lg:mb-24">
        <SectionHeader
          id="news-heading"
          title={title}
          description={m['news.description']({}, { locale: locale as any })}
          linkHref={`/${locale}/nouvelles`}
          linkText={viewAllText}
          theme="light"
        />
      </ScrollAnimation>

      {/* News Grid */}
      <StaggerContainer
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        staggerDelay={150}
      >
        {newsToDisplay
          ? newsToDisplay.map((newsItem) => (
              <div key={newsItem.id} className="h-full">
                <NewsCard news={newsItem} locale={locale} memberMap={memberMap} />
              </div>
            ))
          : [...Array(PLACEHOLDER_COUNT)].map((_, i) => (
              <div key={i} className="h-full">
                <div className="animate-pulse bg-slate-100 rounded-3xl h-[400px] w-full"></div>
              </div>
            ))}
      </StaggerContainer>

      {/* Mobile View All Link */}
      <MobileViewAllLink href={`/${locale}/nouvelles`} text={viewAllText} />
    </Section>
  )
}

// ============================================================================
// Sub-components
// ============================================================================

interface MobileViewAllLinkProps {
  href: string
  text: string
}

function MobileViewAllLink({ href, text }: MobileViewAllLinkProps) {
  return (
    <Link href={href} className="group flex lg:hidden items-center justify-center gap-3 mt-12">
      <span className="text-lg font-medium text-slate-700">{text}</span>
      <ArrowIcon className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  )
}
