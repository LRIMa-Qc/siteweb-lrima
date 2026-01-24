import Link from 'next/link'
import Image from 'next/image'
import { News } from '@/types'
import * as m from '@/paraglide/messages'
import { MemberLink } from '@/components/ui'

interface NewsCardProps {
  news: News
  variant?: 'featured' | 'default'
  locale?: string
  memberMap?: Record<string, string>
}

export const NewsCard: React.FC<NewsCardProps> = ({
  news,
  variant = 'default',
  locale = 'fr',
  memberMap = {},
}) => {
  const href = `/${locale}/nouvelles/${news.slug}`

  // Use imageUrl directly or fallback
  const imageUrl = news.imageUrl || '/placeholder.jpg'

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Common label
  const label =
    news.category ||
    (variant === 'featured'
      ? m['news.label']({}, { locale: locale as any })
      : m['news.label']({}, { locale: locale as any }))

  // Featured Variant
  if (variant === 'featured') {
    return (
      <Link href={href} className="block group h-full">
        <div className="relative overflow-hidden h-full flex flex-col glass-card bg-white rounded-3xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary-500/10 group-hover:border-primary-200">
          <div className="relative w-full h-80 overflow-hidden bg-slate-100">
            <Image
              src={imageUrl}
              alt={news.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/20">
                {label}
              </span>
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <h3 className="font-display font-bold text-2xl lg:text-3xl mb-4 text-slate-900 group-hover:text-primary-600 transition-colors leading-tight">
              {news.title}
            </h3>
            <div className="text-sm text-slate-500 mb-4 flex items-center gap-1">
              <span className="font-medium text-slate-400">{formatDate(news.publishedDate)}</span>
              {news.author && (
                <>
                  <span className="text-slate-300">•</span>
                  <MemberLink
                    name={news.author}
                    slug={memberMap[news.author] || memberMap[news.author.trim()]}
                    locale={locale}
                    className="text-slate-500 hover:text-primary-600 font-medium"
                  />
                </>
              )}
            </div>
            <p className="text-slate-600 leading-relaxed mb-4 flex-1 line-clamp-3">
              {news.summary}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <article className="group h-full">
      <Link href={href} className="block h-full">
        <div className="relative h-full flex flex-col glass-card bg-white rounded-3xl p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary-500/10 group-hover:border-primary-200">
          {/* Image Container */}
          <div className="relative h-64 rounded-2xl overflow-hidden mb-6 bg-slate-100">
            <Image
              src={imageUrl}
              alt={news.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium border border-white/20">
                {label}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1">
            <h3 className="font-display text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors mb-4 leading-tight">
              {news.title}
            </h3>
            <div className="text-sm text-slate-400 mb-4 font-medium">
              {formatDate(news.publishedDate)}
            </div>
            <p className="text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-1">
              {news.summary}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
