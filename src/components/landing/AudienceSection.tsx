/**
 * Audience Section Component (Pour / For)
 *
 * Scroll-driven text highlight effect section showing target audiences.
 * Features:
 * - Sticky "Pour/For" header
 * - List of audiences that highlight on scroll
 * - CTA section at the bottom
 *
 * @note Uses custom CSS classes defined in globals.css:
 * - scroll-highlight-section
 * - scroll-highlight-header
 * - scroll-highlight-fluid
 * - scroll-highlight-content
 * - scroll-highlight-title
 * - scroll-highlight-list
 * - scroll-highlight-item
 */

import Link from 'next/link'
import { Button } from '@/components/ui'
import * as m from '@/paraglide/messages'

interface AudienceSectionProps {
  /** Current locale for i18n */
  locale: string
  /** Array of audience items */
  audiences: Array<{ text: string }>
}

export function AudienceSection({ locale, audiences }: AudienceSectionProps) {
  const isFrench = locale === 'fr'

  return (
    <section
      className="scroll-highlight-section relative overflow-hidden"
      style={{ '--count': audiences.length } as React.CSSProperties}
      aria-label={m['home.audiences.students.title']({}, { locale: locale as any })
        .replace('For ', '')
        .replace('Pour ', '')}
    >
      {/* Scroll-driven Header */}
      <header className="scroll-highlight-header scroll-highlight-fluid">
        <section className="scroll-highlight-content">
          <h2 className="scroll-highlight-title font-display">
            <span aria-hidden="true">{isFrench ? 'Pour\u00A0' : 'For\u00A0'}</span>
            <span className="sr-only">
              {m['home.audiences.students.title']({}, { locale: locale as any })}
            </span>
          </h2>

          {/* Audience List */}
          <ul className="scroll-highlight-list" aria-hidden="true">
            {audiences.map((item, index) => (
              <li
                key={index}
                className="scroll-highlight-item"
                style={{ '--i': index } as React.CSSProperties}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </section>
      </header>

      {/* CTA Section */}
      <CTABlock locale={locale} />
    </section>
  )
}

interface CTABlockProps {
  locale: string
}

function CTABlock({ locale }: CTABlockProps) {
  return (
    <main className="relative flex items-center justify-center min-h-screen bg-slate-800 text-white">
      <section className="text-center px-6">
        <p className="scroll-highlight-fluid font-display font-semibold mb-8">
          {m['home.cta.subtitle']({}, { locale: locale as any })}
        </p>
        <Button
          href={`/${locale}/contact`}
          size="lg"
          variant="primary"
          className="rounded-full px-8 py-4 bg-white text-slate-800 hover:bg-slate-100"
        >
          {m['home.cta.contact']({}, { locale: locale as any })}
        </Button>
      </section>
    </main>
  )
}
