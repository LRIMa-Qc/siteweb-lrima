import { getPayload } from 'payload'
import config from '@/payload.config'
import { LivePreviewPage } from '@/components/preview/LivePreviewPage'

interface PreviewPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PreviewPage(props: PreviewPageProps) {
  const { locale } = await props.params

  const payload = await getPayload({ config })

  // Fetch homepage data
  const homepageData = await payload.findGlobal({
    slug: 'homepage',
    locale: locale as 'en' | 'fr',
    draft: true, // Include draft data
  })

  return <LivePreviewPage initialData={homepageData} locale={locale} />
}
