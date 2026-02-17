import React, { cache } from 'react'
import * as m from '@/paraglide/messages'
import { assertIsLocale, baseLocale, getLocale, overwriteGetLocale } from '@/paraglide/runtime'

export const revalidate = 300 // Revalidate every 5 minutes as a fallback
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Inter, Outfit } from 'next/font/google'
import { getSiteSettings } from '@/lib/globals'
import type { Media } from '@/payload-types'

const inter = Inter({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const outfit = Outfit({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  // We can't use m directly here if it's not available in this scope,
  // but we can import it or use a helper.
  // Assuming m is available as imported from '@/paraglide/messages'
  return {
    title: m['metadata.title'](),
    description: m['metadata.description'](),
  }
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }]
}

const ssrLocale = cache(() => ({
  locale: baseLocale,
}))

overwriteGetLocale(() => assertIsLocale(ssrLocale().locale))

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { children } = props

  const { locale } = await props.params

  ssrLocale().locale = locale || baseLocale

  // Fetch site settings from CMS
  const siteSettings = await getSiteSettings(locale)
  const headerLogoUrl = (siteSettings?.logos?.headerLogo as Media | undefined)?.url || undefined
  const footerLogoUrl = (siteSettings?.logos?.footerLogo as Media | undefined)?.url || undefined

  return (
    <html lang={getLocale()}>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans flex flex-col min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900`}
      >
        <Header headerLogoUrl={headerLogoUrl} />
        <main className="flex-1">{children}</main>
        <Footer
          footerLogoUrl={footerLogoUrl}
          contactEmail={siteSettings?.contact?.email || undefined}
          contactPhone={siteSettings?.contact?.phone || undefined}
          addressLine1={siteSettings?.contact?.addressLine1 || undefined}
          addressLine2={siteSettings?.contact?.addressLine2 || undefined}
          linkedinUrl={siteSettings?.social?.linkedin || undefined}
          githubUrl={siteSettings?.social?.github || undefined}
          siteName={siteSettings?.metadata?.siteName || undefined}
        />
      </body>
    </html>
  )
}
