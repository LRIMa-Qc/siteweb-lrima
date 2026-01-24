import { notFound } from 'next/navigation'
import * as m from '@/paraglide/messages'
import { Container } from '@/components/ui'
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
                  <p className="text-xl mb-2 text-slate-700 font-medium">{member.title}</p>
                  <p className="text-lg text-slate-600 mb-6">{member.role}</p>
                  <div className="space-y-3 mb-6">
                    {member.email && (
                      <p className="flex items-center gap-2 text-slate-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 text-primary-600"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 text-primary-600"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 text-primary-600"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                          <path d="M2 12h20" />
                        </svg>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 text-primary-600"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 text-primary-600"
                        >
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5 text-primary-600"
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
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
