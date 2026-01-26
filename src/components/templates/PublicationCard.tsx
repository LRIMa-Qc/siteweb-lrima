import Link from 'next/link'
import { Publication } from '@/types'
import * as m from '@/paraglide/messages'
import { ArrowIcon, MemberLink } from '@/components/ui'
import { getThemeStyles, Theme } from '@/lib/theme'
import { formatDate } from '@/lib/formatDate'

interface PublicationCardProps {
  publication: Publication
  locale?: string
  theme?: Theme
  memberMap?: Record<string, string>
}

export const PublicationCard: React.FC<PublicationCardProps> = ({
  publication,
  locale = 'fr',
  theme = 'light',
  memberMap = {},
}) => {
  const href = `/${locale}/publications/${publication.slug}`
  const styles = getThemeStyles(theme)
  const isDark = theme === 'dark'
  const buttonHoverBg = 'group-hover:bg-primary-600'
  const iconHoverColor = 'group-hover:text-white'

  // Construct formatted type/venue string
  const pubType = publication.journal
    ? m['publications.types.journal']({}, { locale: locale as any })
    : publication.venue
      ? m['publications.types.conference']({}, { locale: locale as any })
      : m['publications.types.publication']({}, { locale: locale as any })

  return (
    <article
      className={`group cursor-pointer border-t ${styles.borderColor} py-12 lg:py-16 first:border-t-0 transition-colors`}
    >
      <Link href={href}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6 text-sm">
              <span className={`font-bold ${styles.typeColor} uppercase tracking-widest text-xs`}>
                {pubType}
              </span>
              <span className={`${styles.metaColor}`}>•</span>
              <span className={`${styles.metaColor} font-medium`}>{publication.year}</span>
            </div>

            {/* Authors */}
            {publication.authors.length > 0 && (
              <div
                className={`mb-4 text-base font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
              >
                {publication.authors.map((author, index) => (
                  <span key={index}>
                    <MemberLink
                      name={author}
                      slug={memberMap[author] || memberMap[author.trim()]}
                      locale={locale}
                      className={
                        isDark ? 'text-slate-200 hover:text-primary-400' : 'hover:text-primary-600'
                      }
                    />
                    {index < publication.authors.length - 1 && ', '}
                  </span>
                ))}
              </div>
            )}

            <h3
              className={`font-display text-2xl lg:text-4xl font-bold ${styles.titleColor} ${styles.linkHoverColor} transition-colors leading-tight mb-6`}
            >
              {publication.title}
            </h3>
            <p className={`text-lg ${styles.textColor} leading-relaxed max-w-4xl line-clamp-2`}>
              {publication.abstract}
            </p>
          </div>

          {/* Arrow Button */}
          <div className="flex items-center pt-2">
            <div
              className={`w-14 h-14 rounded-full border-2 ${styles.buttonBorder} flex items-center justify-center ${styles.buttonHoverBorder} ${buttonHoverBg} transition-all shadow-sm group-hover:shadow-md`}
            >
              <ArrowIcon
                className={`w-6 h-6 ${styles.iconColor} ${iconHoverColor} group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all`}
              />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
