import * as m from '@/paraglide/messages'
import { Container, PageHeader } from '@/components/ui'
import { NewsList } from '@/components/templates'

import { getNews, getMembers } from '@/lib/payload'

interface NewsPageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params

  // Fetch data in parallel
  const [newsList, members] = await Promise.all([getNews(), getMembers({ locale })])

  // Create member map
  const memberMap = members.reduce(
    (acc, member) => {
      acc[member.name] = member.slug
      return acc
    },
    {} as Record<string, string>,
  )

  return (
    <div className="news-page bg-white min-h-screen">
      {/* Header Section */}
      <PageHeader title={m['news.title']()} subtitle={m['news.subtitle']()} />

      {/* News List Section */}
      <section className="py-24 bg-slate-50">
        <Container>
          <NewsList newsList={newsList} showFeatured={true} locale={locale} memberMap={memberMap} />
        </Container>
      </section>
    </div>
  )
}
