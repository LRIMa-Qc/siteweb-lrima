import * as m from '@/paraglide/messages'
import { Container, PageHeader } from '@/components/ui'
import { MemberList } from '@/components/templates'

import { getMembers } from '@/lib/payload'

interface MembersPageProps {
  params: Promise<{
    locale: string
  }>
}

import { DirectorSection } from '@/components/templates'

export default async function MembersPage({ params }: MembersPageProps) {
  const { locale } = await params
  const members = await getMembers({ locale })

  // Find the director by the isDirector flag
  const director = members.find((m) => m.isDirector)

  // Filter out the director from the main list if found
  const displayedMembers = director ? members.filter((m) => m.id !== director.id) : members

  return (
    <div className="members-page bg-white min-h-screen">
      {/* Header Section */}
      <PageHeader title={m['members.title']()} />

      {/* Director Section (if found) */}
      {director && <DirectorSection director={director} locale={locale} />}

      {/* Members List Section */}
      <section className="py-24 bg-slate-50">
        <Container>
          <MemberList members={displayedMembers} variant="grid" locale={locale} />
        </Container>
      </section>
    </div>
  )
}
