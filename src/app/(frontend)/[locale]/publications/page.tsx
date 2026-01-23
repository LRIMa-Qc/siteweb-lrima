import * as m from '@/paraglide/messages'
import { Container, PageHeader } from '@/components/ui'
import { PublicationList } from '@/components/templates'

import { getPublications, getMembers } from '@/lib/payload'

interface PublicationsPageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function PublicationsPage({ params }: PublicationsPageProps) {
  const { locale } = await params

  // Fetch data in parallel
  const [publications, members] = await Promise.all([getPublications(), getMembers({ locale })])

  // Create member map
  const memberMap = members.reduce(
    (acc, member) => {
      acc[member.name] = member.slug
      return acc
    },
    {} as Record<string, string>,
  )

  return (
    <div className="publications-page bg-white min-h-screen">
      {/* Header Section */}
      <PageHeader title={m['publications.title']()} subtitle={m['publications.subtitle']()} />

      {/* Publications List Section */}
      <section className="py-24 bg-slate-50">
        <Container>
          <PublicationList publications={publications} locale={locale} memberMap={memberMap} />
        </Container>
      </section>
    </div>
  )
}
