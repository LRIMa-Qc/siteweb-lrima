import Link from 'next/link'
import Image from 'next/image'
import { Member } from '@/types'

interface MemberCardProps {
  member: Member
  locale?: string
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, locale = 'fr' }) => {
  const href = `/${locale}/members/${member.slug}`

  return (
    <Link href={href} className="block h-full group">
      <div className="h-full glass-card bg-white p-6 rounded-3xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary-500/10 group-hover:border-primary-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full mb-6 flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-300 relative">
            {member.imageUrl ? (
              <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
            ) : (
              <span className="text-4xl font-bold text-white">{member.name.charAt(0)}</span>
            )}
          </div>
          <h3 className="font-display font-bold text-xl mb-2 text-slate-900 group-hover:text-primary-600 transition-colors">
            {member.name}
          </h3>
          <p className="text-sm text-slate-600 mb-1 font-medium">{member.title}</p>
          <p className="text-sm text-slate-500">{member.role}</p>
        </div>
      </div>
    </Link>
  )
}
