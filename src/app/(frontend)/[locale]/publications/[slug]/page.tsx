import { notFound } from 'next/navigation'
import { Container, Button } from '@/components/ui'
import { getPublicationBySlug } from '@/lib/payload'
import Link from 'next/link'
import * as m from '@/paraglide/messages'

interface PublicationDetailPageProps {
  params: Promise<{ slug: string; locale: string }>
}

export default async function PublicationDetailPage({ params }: PublicationDetailPageProps) {
  const { slug, locale } = await params
  const publication = await getPublicationBySlug(slug, locale)

  if (!publication) notFound()

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.4]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>

        <Container>
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl font-bold text-xl shadow-lg shadow-primary-500/20">
                {publication.year}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
              {publication.title}
            </h1>
            <p className="text-xl text-slate-600 font-medium">{publication.authors.join(', ')}</p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="glass-card p-8 rounded-3xl bg-white border-l-4 border-l-primary-500">
              {publication.journal && (
                <p className="mb-3 text-slate-700">
                  <strong className="text-slate-900">{m['publicationDetail.journal']()}</strong>{' '}
                  {publication.journal}
                  {publication.volume &&
                    `, ${m['publicationDetail.volume']()} ${publication.volume}`}
                  {publication.issue && `, ${m['publicationDetail.issue']()} ${publication.issue}`}
                </p>
              )}
              {publication.venue && (
                <p className="mb-3 text-slate-700">
                  <strong className="text-slate-900">{m['publicationDetail.venue']()}</strong>{' '}
                  {publication.venue}
                </p>
              )}
              {publication.pages && (
                <p className="mb-3 text-slate-700">
                  <strong className="text-slate-900">{m['publicationDetail.pages']()}</strong>{' '}
                  {publication.pages}
                </p>
              )}
              <p className="text-slate-700">
                <strong className="text-slate-900">{m['publicationDetail.published']()}</strong>{' '}
                {formatDate(publication.publishedDate)}
              </p>
            </div>

            {publication.abstract && (
              <div className="glass-card p-8 rounded-3xl bg-white">
                <h2 className="font-display text-2xl font-bold mb-4 text-slate-900">
                  {m['publicationDetail.abstract']()}
                </h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed">{publication.abstract}</p>
                </div>
              </div>
            )}

            {publication.keywords && publication.keywords.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-4 text-slate-900">
                  {m['publicationDetail.keywords']()}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {publication.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded-full border border-slate-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {publication.citation && (
              <div className="glass-card p-8 rounded-3xl bg-white">
                <h2 className="font-display text-2xl font-bold mb-4 text-slate-900">
                  {m['publicationDetail.citation']()}
                </h2>
                <pre className="font-mono text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-xl">
                  {publication.citation}
                </pre>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              {publication.doi && (
                <a
                  href={`https://doi.org/${publication.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" className="rounded-full">
                    {m['publicationDetail.viewDoi']()}
                  </Button>
                </a>
              )}
              {publication.url && (
                <a href={publication.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-full">
                    {m['publicationDetail.viewPublication']()}
                  </Button>
                </a>
              )}
              {publication.pdfUrl && (
                <a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="rounded-full">
                    {m['publicationDetail.downloadPdf']()}
                  </Button>
                </a>
              )}
            </div>

            <div className="mt-12">
              <Link href={`/${locale}/publications`}>
                <Button variant="ghost" size="lg" className="text-slate-500 hover:text-slate-900">
                  ← {m['publicationDetail.backToPublications']()}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
