import React, { cache } from 'react'
import * as m from '@/paraglide/messages'
import { assertIsLocale, baseLocale, getLocale, overwriteGetLocale } from '@/paraglide/runtime'

export const revalidate = 300 // Revalidate every 5 minutes as a fallback
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Inter, Outfit } from 'next/font/google'

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

  return (
    <html lang={getLocale()}>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans flex flex-col min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
