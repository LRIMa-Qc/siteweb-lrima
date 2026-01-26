import { notFound } from 'next/navigation'
import * as m from '@/paraglide/messages'
import {
  Container,
  MailIcon,
  PhoneIcon,
  GlobeIcon,
  LinkedInIcon,
  GitHubIcon,
  BookIcon,
} from '@/components/ui'
import { getMemberBySlug } from '@/lib/payload'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface MemberDetailPageProps {
  params: Promise<{ slug: string; locale: string }>
}

export default async function MemberDetailPage({ params }: MemberDetailPageProps) {
  const { slug, locale } = await params
  const member = await getMemberBySlug(slug, locale)

  if (!member) notFound()

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.4]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>

        <Container>
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-3xl bg-white">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {member.imageUrl ? (
                  <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 relative ring-4 ring-white shadow-lg bg-gradient-to-br from-primary-100 to-primary-50">
                    <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-48 h-48 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 ring-4 ring-white shadow-lg">
                    <span className="text-6xl font-bold text-white">{member.name.charAt(0)}</span>
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 text-slate-900">
                    {member.name}
                  </h1>

                  <p className="text-lg text-slate-600 mb-6">{member.role}</p>
                  <div className="space-y-3 mb-6">
                    {member.email && (
                      <p className="flex items-center gap-2 text-slate-600">
                        <MailIcon className="w-5 h-5 text-primary-600" />
                        <a
                          href={`mailto:${member.email}`}
                          className="hover:text-primary-600 transition-colors"
                        >
                          {member.email}
                        </a>
                      </p>
                    )}
                    {member.phone && (
                      <p className="flex items-center gap-2 text-slate-600">
                        <PhoneIcon className="w-5 h-5 text-primary-600" />
                        <a
                          href={`tel:${member.phone}`}
                          className="hover:text-primary-600 transition-colors"
                        >
                          {member.phone}
                        </a>
                      </p>
                    )}
                    {member.website && (
                      <p className="flex items-center gap-2 text-slate-600">
                        <GlobeIcon className="w-5 h-5 text-primary-600" />
                        <a
                          href={member.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary-600 transition-colors"
                        >
                          {m['members.social.website']()}
                        </a>
                      </p>
                    )}
                    {member.linkedIn && (
                      <p className="flex items-center gap-2 text-slate-600">
                        <LinkedInIcon className="w-5 h-5 text-primary-600" />
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary-600 transition-colors"
                        >
                          {m['members.social.linkedIn']()}
                        </a>
                      </p>
                    )}
                    {member.github && (
                      <p className="flex items-center gap-2 text-slate-600">
                        <GitHubIcon className="w-5 h-5 text-primary-600" />
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary-600 transition-colors"
                        >
                          {m['members.social.github']()}
                        </a>
                      </p>
                    )}
                    {member.googleScholar && (
                      <p className="flex items-center gap-2 text-slate-600">
                        <BookIcon className="w-5 h-5 text-primary-600" />
                        <a
                          href={member.googleScholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary-600 transition-colors"
                        >
                          {m['members.social.googleScholar']()}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {member.bio && (
        <section className="py-16 bg-slate-50">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold mb-8 text-slate-900">
                {m['members.bio']()}
              </h2>
              <div className="prose prose-lg prose-slate max-w-none">
                <RichText data={member.bio} />
              </div>
            </div>
          </Container>
        </section>
      )}

      {member.researchInterests && member.researchInterests.length > 0 && (
        <section className="py-16 bg-white">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold mb-8 text-slate-900">
                {m['members.researchInterests']()}
              </h2>
              <div className="flex flex-wrap gap-3">
                {member.researchInterests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  )
}
