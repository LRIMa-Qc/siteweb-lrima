'use client'

import { Member } from '@/types'
import { MemberCard } from './MemberCard'
import * as m from '@/paraglide/messages'

interface MemberListProps {
  members: Member[]
  variant?: 'grid' | 'list'
  locale?: string
}

export const MemberList: React.FC<MemberListProps> = ({
  members,
  variant = 'grid',
  locale = 'fr',
}) => {
  // Group members by status
  const activeMembers = members.filter((m) => m.status === 'active')
  const alumniMembers = members.filter((m) => m.status === 'alumni')
  const collaboratorMembers = members.filter((m) => m.status === 'collaborator')

  const renderMemberGroup = (title: string, members: Member[]) => {
    if (members.length === 0) return null

    return (
      <div className="mb-16">
        <h2 className="font-display text-3xl font-bold mb-8 text-slate-900">{title}</h2>
        <div
          className={
            variant === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-6'
          }
        >
          {members.map((member) => (
            <MemberCard key={member.id} member={member} locale={locale} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {renderMemberGroup(m['members.active']({}, { locale: locale as any }), activeMembers)}
      {renderMemberGroup(
        m['members.collaborators']({}, { locale: locale as any }),
        collaboratorMembers,
      )}
      {renderMemberGroup(m['members.alumni']({}, { locale: locale as any }), alumniMembers)}

      {members.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-lg">
          {m['members.noMembers']({}, { locale: locale as any })}
        </div>
      )}
    </div>
  )
}
