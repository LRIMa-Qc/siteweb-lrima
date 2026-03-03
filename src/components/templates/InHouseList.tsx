import { Member } from '@/types'
import * as m from '@/paraglide/messages'
import { InHouseCard } from './InHouseCard'

interface InHouseListProps {
  members: Member[]
  variant?: 'grid' | 'list'
  locale?: string
}

export const InHouseList: React.FC<InHouseListProps> = ({
  members,
  variant = 'grid',
  locale = 'fr',
}) => {
  return (
    <div>
      {members.length > 0 && (
        <div
          className={
            variant === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-6'
          }
        >
          {members.map((member) => (
            <InHouseCard key={member.id} member={member} locale={locale} />
          ))}
        </div>
      )}

      {members.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-lg">
          {m['members.noMembers']({}, { locale: locale as any })}
        </div>
      )}
    </div>
  )
}
