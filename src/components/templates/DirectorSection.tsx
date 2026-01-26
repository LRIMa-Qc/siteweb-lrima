import Link from 'next/link'
import Image from 'next/image'
import { Member } from '@/types'
import { Section, ArrowIcon } from '@/components/ui'
import * as m from '@/paraglide/messages'

interface DirectorSectionProps {
  director: Member
  locale: string
}

export const DirectorSection: React.FC<DirectorSectionProps> = ({ director, locale }) => {
  const imageUrl = director.imageUrl || '/placeholder-user.jpg'

  return (
    <Section spacing="lg" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Content Side */}
        <div className="flex flex-col items-start text-left">
          <div className="mb-8">
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight leading-[1.1] text-slate-900 mb-6">
              {director.name}
            </h2>
          </div>

          <div className="prose prose-xl prose-slate max-w-2xl leading-relaxed text-slate-600 mb-10">
            <p className="text-lg lg:text-xl">
              {m['members.director.intro']({ name: director.name })}
            </p>
          </div>

          <Link
            href={`/${locale}/membres/${director.slug}`}
            className="group flex items-center gap-4"
          >
            <span className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
              {m['members.director.viewProfile']()}
            </span>
            <div className="w-14 h-14 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 transition-all">
              <ArrowIcon className="w-6 h-6 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all text-slate-400" />
            </div>
          </Link>
        </div>

        {/* Image Side */}
        <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={director.name}
            fill
            className="object-cover transition-all duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </Section>
  )
}
