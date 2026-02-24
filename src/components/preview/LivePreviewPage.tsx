'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { HeroSection } from '@/components/landing/HeroSection'
import { HorizontalScrollSection } from '@/components/landing/HorizontalScrollSection'
import { AudienceSection } from '@/components/landing/AudienceSection'
import { GallerySection } from '@/components/landing/GallerySection'
import { CTASection } from '@/components/landing/CTASection'
import type { Homepage } from '@/payload-types'

interface LivePreviewPageProps {
  initialData: Homepage
  locale: string
}

export function LivePreviewPage({ initialData, locale }: LivePreviewPageProps) {
  const { data } = useLivePreview<Homepage>({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    depth: 2,
  })

  // Extract data with fallbacks
  const heroData = {
    labName: data?.hero?.labName ?? undefined,
    tagline: data?.hero?.tagline ?? undefined,
    ctaResearchLabel: data?.hero?.ctaResearchLabel ?? undefined,
    ctaContactLabel: data?.hero?.ctaContactLabel ?? undefined,
  }

  const aboutTitle = data?.about?.title ?? ''
  const aboutDescription = data?.about?.description ?? ''

  const horizontalImages = data?.horizontalImages
    ? {
        image1: (data.horizontalImages.image1 as any)?.url || '',
        image1Alt: (data.horizontalImages.image1 as any)?.alt || '',
        image2: (data.horizontalImages.image2 as any)?.url || '',
        image2Alt: (data.horizontalImages.image2 as any)?.alt || '',
        image3: (data.horizontalImages.image3 as any)?.url || '',
        image3Alt: (data.horizontalImages.image3 as any)?.alt || '',
      }
    : undefined

  const stats = data?.stats?.items?.map((item: any) => ({
    number: item.number,
    label: item.label,
  }))

  const quoteText = data?.quote?.text ?? undefined
  const quoteSource = data?.quote?.source ?? undefined

  const audiences =
    data?.audiences?.map((aud: any) => ({
      text: aud.text || '',
    })) || []

  const galleryImages =
    data?.gallery?.images?.map((img: any) => ({
      src: (img.image as any)?.url || '',
      alt: (img.image as any)?.alt || '',
    })) || []

  const galleryTitle = data?.gallery?.title ?? undefined

  const ctaData = {
    title: data?.cta?.title ?? undefined,
    subtitle: data?.cta?.subtitle ?? undefined,
    contactLabel: data?.cta?.contactLabel ?? undefined,
    joinLabel: data?.cta?.joinLabel ?? undefined,
    robotImageUrl: (data?.cta?.robotImage as any)?.url,
  }

  return (
    <div className="home bg-white min-h-screen">
      <HeroSection {...heroData} />
      <HorizontalScrollSection
        locale={locale}
        title={aboutTitle}
        description={aboutDescription}
        horizontalImages={horizontalImages}
        stats={stats}
        quoteText={quoteText}
        quoteSource={quoteSource}
      />
      <AudienceSection locale={locale} audiences={audiences} />
      <GallerySection locale={locale} images={galleryImages} title={galleryTitle} />
      <CTASection locale={locale} {...ctaData} />
    </div>
  )
}
