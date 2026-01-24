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

import Link from 'next/link'
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
}

// ============================================================================
// Component
// ============================================================================

export function CTASection({ locale }: CTASectionProps) {
  return (
    <section className="relative py-32 lg:py-48" aria-labelledby="cta-heading">
      <div className="w-full px-6 lg:px-16">
        <ScrollAnimation animation="fade-up" className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Robot GIF - Side on desktop */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 lg:w-72 lg:h-72">
                <Image
                  src="/robot-gif.gif"
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
                className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-slate-700 tracking-tight mb-8 leading-none"
              >
                {m['home.cta.title']({}, { locale: locale as any })}
              </h2>

              {/* Description */}
              <p className="text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                {m['home.cta.subtitle']({}, { locale: locale as any })}
              </p>

              {/* Action Buttons */}
              <ActionButtons locale={locale} />
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
}

function ActionButtons({ locale }: ActionButtonsProps) {
  return (
    <div className="flex gap-5 justify-center lg:justify-start flex-wrap">
      {/* Primary CTA */}
      <Button
        href={`/${locale}/contact`}
        size="lg"
        variant="primary"
        className="px-12 py-5 text-base"
      >
        {m['home.cta.contact']({}, { locale: locale as any })}
      </Button>

      {/* Secondary CTA */}
      <Button
        href={`/${locale}/members`}
        size="lg"
        variant="outline"
        className="px-12 py-5 text-base border-slate-200 text-slate-600 hover:bg-slate-50"
      >
        {m['home.cta.join']({}, { locale: locale as any })}
      </Button>
    </div>
  )
}
