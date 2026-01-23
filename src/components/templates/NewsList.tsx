import { News } from '@/types'
import { NewsCard } from './NewsCard'
import * as m from '@/paraglide/messages'

interface NewsListProps {
  newsList: News[]
  showFeatured?: boolean
  locale?: string
  memberMap?: Record<string, string>
}

export const NewsList: React.FC<NewsListProps> = ({
  newsList,
  showFeatured = true,
  locale = 'fr',
  memberMap = {},
}) => {
  // Sort news by date (descending)
  const sortedNews = [...newsList].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  )

  // Separate featured news if needed
  const featuredNews = showFeatured ? sortedNews.filter((news) => news.featured) : []
  const regularNews = showFeatured ? sortedNews.filter((news) => !news.featured) : sortedNews

  return (
    <div>
      {/* Featured news section */}
      {featuredNews.length > 0 && (
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold mb-8 text-slate-900">
            {m['news.featured']()}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.slice(0, 2).map((news) => (
              <NewsCard
                key={news.id}
                news={news}
                variant="featured"
                locale={locale}
                memberMap={memberMap}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular news section */}
      {regularNews.length > 0 && (
        <div>
          {showFeatured && featuredNews.length > 0 && (
            <h2 className="font-display text-3xl font-bold mb-8 text-slate-900">
              {m['news.allNews']()}
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularNews.map((news) => (
              <NewsCard key={news.id} news={news} locale={locale} memberMap={memberMap} />
            ))}
          </div>
        </div>
      )}

      {sortedNews.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-lg">{m['newsList.noNews']()}</div>
      )}
    </div>
  )
}
