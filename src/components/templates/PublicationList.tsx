'use client'

import { Publication } from '@/types'
import { PublicationCard } from './PublicationCard'
import * as m from '@/paraglide/messages'

interface PublicationListProps {
  publications: Publication[]
  locale?: string
  memberMap?: Record<string, string>
}

export const PublicationList: React.FC<PublicationListProps> = ({
  publications,
  locale = 'fr',
  memberMap = {},
}) => {
  // Sort publications by year (descending) and then by title
  const sortedPublications = [...publications].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year
    }
    return a.title.localeCompare(b.title)
  })

  // Group publications by year
  const publicationsByYear = sortedPublications.reduce(
    (acc, publication) => {
      const year = publication.year
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(publication)
      return acc
    },
    {} as Record<number, Publication[]>,
  )

  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div>
      {years.map((year) => (
        <div key={year} className="mb-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900">{year}</h2>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>
          <div className="space-y-6">
            {publicationsByYear[year].map((publication) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                locale={locale}
                memberMap={memberMap}
              />
            ))}
          </div>
        </div>
      ))}

      {sortedPublications.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-lg">
          {m['publicationsList.noPublications']()}
        </div>
      )}
    </div>
  )
}
