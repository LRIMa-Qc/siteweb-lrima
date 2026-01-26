/**
 * Publications Section Component
 *
 * Displays recent publications in a minimal list layout with dark background.
 * Features:
 * - Dark theme (slate-800 background)
 * - Large section header
 * - List of publication cards with hover effects
 * - Scroll animations
 */

import {
  ScrollAnimation,
  StaggerContainer,
  SectionHeader,
  Section,
  MobileViewAllLink,
} from '@/components/ui'
import * as m from '@/paraglide/messages'
import { Publication } from '@/types'
import { PublicationCard } from '@/components/templates/PublicationCard'

// ============================================================================
// Types
// ============================================================================

interface PublicationsSectionProps {
  /** Current locale for i18n */
  locale: string
  /** Array of publications to display */
  publications: Publication[]
  /** Whether data is loading */
  isLoading?: boolean
  /** Map of member names to slugs for linking */
  memberMap?: Record<string, string>
}

// ============================================================================
// Constants
// ============================================================================

/** Number of placeholder cards to show when loading */
const PLACEHOLDER_COUNT = 3

// ============================================================================
// Component
// ============================================================================

export function PublicationsSection({
  locale,
  publications,
  isLoading = false,
  memberMap = {},
}: PublicationsSectionProps) {
  const hasPublications = publications.length > 0
  const title = m['home.recentPublications']({}, { locale: locale as any })
  const viewAllText = m['home.viewAll']({}, { locale: locale as any })

  return (
    <Section className="bg-slate-800 text-white" aria-labelledby="publications-heading">
      {/* Section Header */}
      <ScrollAnimation animation="fade-up" className="mb-16 lg:mb-24">
        <SectionHeader
          id="publications-heading"
          title={title}
          description={m['publications.description']({}, { locale: locale as any })}
          linkHref={`/${locale}/publications`}
          linkText={viewAllText}
          theme="dark"
        />
      </ScrollAnimation>

      {/* Publications List */}
      <StaggerContainer className="space-y-0" staggerDelay={100}>
        {isLoading ? (
          // Loading State
          [...Array(PLACEHOLDER_COUNT)].map((_, i) => (
            <div
              key={i}
              className="py-10 border-t border-white/10 animate-pulse"
              role="status"
              aria-label="Loading publication"
            >
              <div className="h-8 bg-white/10 w-1/3 mb-4 rounded"></div>
              <div className="h-4 bg-white/5 w-2/3 rounded"></div>
            </div>
          ))
        ) : hasPublications ? (
          // Data State
          publications.map((publication) => (
            <PublicationCard
              key={publication.id}
              publication={publication}
              locale={locale}
              theme="dark"
              memberMap={memberMap}
            />
          ))
        ) : (
          // Empty State
          <div className="py-20 text-center border-t border-white/10">
            <p className="text-xl text-white/40">
              {m['publications.noPublications']({}, { locale: locale as any })}
            </p>
          </div>
        )}
      </StaggerContainer>

      {/* Mobile View All Link */}
      <MobileViewAllLink
        href={`/${locale}/publications`}
        text={viewAllText}
        textColor="text-white"
      />
    </Section>
  )
}
