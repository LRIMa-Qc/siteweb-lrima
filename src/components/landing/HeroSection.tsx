import { ThreeWavesBackground } from './ThreeWavesBackground'

import { Button } from '@/components/ui'
import * as m from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'

interface HeroSectionProps {
  /** Override lab name from CMS */
  labName?: string
  /** Override tagline from CMS */
  tagline?: string
  /** Override research CTA label from CMS */
  ctaResearchLabel?: string
  /** Override contact CTA label from CMS */
  ctaContactLabel?: string
}

export function HeroSection({
  labName,
  tagline,
  ctaResearchLabel,
  ctaContactLabel,
}: HeroSectionProps) {
  const locale = getLocale()

  return (
    <section
      className="relative h-screen flex items-center justify-center bg-white overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated morphing background */}
      <ThreeWavesBackground />

      {/* Centered hero content */}
      <div className="relative mb-[15vh] z-10 px-6 lg:px-16 text-center max-w-5xl pointer-events-none flex flex-col items-center">
        {/* Laboratory Name */}
        <div className="mb-0 animate-fade-in-up">
          <h2 className="font-display text-[clamp(0.5rem,4vw,1.5rem)] font-semibold tracking-tight text-blue-600">
            {labName || 'Laboratoire de recherche en informatique de Maisonneuve'}
          </h2>
        </div>

        {/* Tagline */}
        <h1 className="font-display text-[clamp(4rem,6vw,6rem)] font-bold tracking-tight leading-[1.1] text-slate-900 mb-8 max-w-4xl">
          {tagline || m['home.hero.tagline']({}, { locale: locale as any })}
        </h1>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pointer-events-auto mt-4">
          <Button
            href={`/${locale}/publications`}
            variant="primary"
            className="px-8 py-3.5 min-w-[180px] shadow-lg shadow-slate-900/10"
          >
            {ctaResearchLabel || m['home.hero.cta.research']({}, { locale: locale as any })}
          </Button>
          <Button
            href={`/${locale}/contact`}
            variant="secondary"
            className="px-8 py-3.5 min-w-[180px]"
          >
            {ctaContactLabel || m['home.hero.cta.contact']({}, { locale: locale as any })}
          </Button>
        </div>
      </div>

      {/* Gradient Fade for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
    </section>
  )
}
