import * as m from '@/paraglide/messages'
import { Container, PageHeader } from '@/components/ui'
import { InHouseList } from '@/components/templates'

import { getMembers } from '@/lib/payload'

interface InHousePageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function MembersPage({ params }: InHousePageProps) {
    const { locale } = await params
    const members = await getMembers({ locale })

    // Find the in-house researchers by the isHouseResearcher flag
    const houseResearchers = members.filter((m) => m.isHouseResearcher)

    return(
        <div className="members-page bg-white min-h-screen">
            {/* Header Section */}
            <PageHeader title={m['inHouse.title']()} />

            {/* In House Members List Section */}
            <section className="py-24 bg-slate-50">
                <Container>
                    <InHouseList members={houseResearchers} variant="grid" locale={locale} />
                </Container>
            </section>
        </div>
    )
}