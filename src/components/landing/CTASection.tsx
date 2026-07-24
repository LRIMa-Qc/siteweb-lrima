/**
 * CTA Section Component
 *
 * Call-to-action section at the bottom of the landing page.
 * Features:
 * - Large headline
 * - Description text
 * - Primary and secondary action buttons
 * - Scroll animation on entry
 */

import Image from 'next/image'
import { Button } from '@/components/ui'
import { ScrollAnimation } from '@/components/ui'
import * as m from '@/paraglide/messages'

// ============================================================================
// Types
// ============================================================================

interface CTASectionProps {
  /** Current locale for i18n */
  locale: string
  /** Override title from CMS */
  title?: string
  /** Override subtitle from CMS */
  subtitle?: string
  /** Override contact button label from CMS */
  contactLabel?: string
  /** Override join button label from CMS */
  joinLabel?: string
  /** Override robot image URL from CMS */
  robotImageUrl?: string
}

// ============================================================================
// Component
// ============================================================================

export function CTASection({
  locale,
  title,
  subtitle,
  contactLabel,
  joinLabel,
  robotImageUrl,
}: CTASectionProps) {
  return (
    <section className="relative py-24 lg:py-32" aria-labelledby="cta-heading">
      <div className="w-full px-5 lg:px-12">
        <ScrollAnimation animation="fade-up" className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Robot GIF - Side on desktop */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 lg:w-72 lg:h-72">
                <Image
                  src={robotImageUrl || '/robot-gif.gif'}
                  alt="Robot animation"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left flex-1">
              {/* Headline */}
              <h2
                id="cta-heading"
                className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-slate-700 tracking-tight mb-6 leading-none"
              >
                {title || m['home.cta.title']({}, { locale: locale as any })}
              </h2>

              {/* Description */}
              <p className="text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed">
                {subtitle || m['home.cta.subtitle']({}, { locale: locale as any })}
              </p>

              {/* Action Buttons */}
              <ActionButtons locale={locale} contactLabel={contactLabel} joinLabel={joinLabel} />
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

// ============================================================================
// Sub-components
// ============================================================================

interface ActionButtonsProps {
  locale: string
  contactLabel?: string
  joinLabel?: string
}

function ActionButtons({ locale, contactLabel, joinLabel }: ActionButtonsProps) {
  return (
    <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
      {/* Primary CTA */}
      <Button
        href={`/${locale}/contact`}
        size="lg"
        variant="primary"
        className="px-10 py-4 text-base"
      >
        {contactLabel || m['home.cta.contact']({}, { locale: locale as any })}
      </Button>

      {/* Secondary CTA */}
      <Button
        href={`/${locale}/membres`}
        size="lg"
        variant="outline"
        className="px-10 py-4 text-base border-slate-200 text-slate-600 hover:bg-slate-50"
      >
        {joinLabel || m['home.cta.join']({}, { locale: locale as any })}
      </Button>
    </div>
  )
}
