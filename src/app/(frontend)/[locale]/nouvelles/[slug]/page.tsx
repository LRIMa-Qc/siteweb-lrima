import { notFound } from 'next/navigation'
import * as m from '@/paraglide/messages'
import { Container, Button } from '@/components/ui'
import { getNewsBySlug } from '@/lib/payload'
import Link from 'next/link'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { formatDate } from '@/lib/formatDate'

interface NewsDetailPageProps {
  params: Promise<{ slug: string; locale: string }>
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug, locale } = await params
  const news = await getNewsBySlug(slug, locale)

  if (!news) notFound()

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.4]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>

        <Container>
          <div className="relative z-10 max-w-4xl mx-auto">
            {news.category && (
              <span className="inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold mb-6 border border-primary-100">
                {news.category}
              </span>
            )}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
              {news.title}
            </h1>
            <div className="flex items-center gap-4 text-base text-slate-600">
              {news.author && (
                <span className="font-medium">
                  {m['newsDetail.by']()} {news.author}
                </span>
              )}
              {news.author && <span>•</span>}
              <time dateTime={news.publishedDate.toISOString()} className="font-medium">
                {formatDate(news.publishedDate, locale)}
              </time>
            </div>
          </div>
        </Container>
      </section>

      {news.imageUrl && (
        <section className="pb-16">
          <Container>
            <div className="max-w-5xl mx-auto">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl shadow-slate-200">
                <Image src={news.imageUrl} alt={news.title} fill className="object-cover" />
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 bg-slate-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            {news.summary && (
              <div className="text-2xl mb-12 text-slate-700 leading-relaxed font-medium">
                {news.summary}
              </div>
            )}
            <div className="glass-card p-8 md:p-12 rounded-3xl bg-white">
              <div className="prose prose-lg prose-slate max-w-none">
                {news.content && <RichText data={news.content} />}
              </div>
            </div>
            {news.tags && news.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-3">
                {news.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded-full border border-slate-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-12">
              <Link href={`/${locale}/nouvelles`}>
                <Button variant="ghost" size="lg" className="text-slate-500 hover:text-slate-900">
                  ← {m['news.allNews']()}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
