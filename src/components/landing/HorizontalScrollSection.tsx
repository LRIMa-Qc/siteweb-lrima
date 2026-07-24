'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import * as m from '@/paraglide/messages'

interface HorizontalScrollSectionProps {
  locale: string
  title: string
  description: string
  /** CMS-provided images for the horizontal scroll cards */
  horizontalImages?: {
    image1: string
    image1Alt: string
    image2: string
    image2Alt: string
    image3: string
    image3Alt: string
  }
  /** CMS-provided stat items */
  stats?: Array<{ number: string; label: string }>
  /** CMS-provided quote text */
  quoteText?: string
  /** CMS-provided quote source */
  quoteSource?: string
}

export function HorizontalScrollSection({
  locale,
  title,
  description,
  horizontalImages,
  stats,
  quoteText,
  quoteSource,
}: HorizontalScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollableWidth, setScrollableWidth] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const scrollContainer = scrollContainerRef.current

    if (!section || !scrollContainer) return

    // Calculate total scrollable width
    const calculateWidth = () => {
      const totalWidth = scrollContainer.scrollWidth
      const viewportWidth = window.innerWidth
      setScrollableWidth(totalWidth - viewportWidth)
    }

    calculateWidth()
    window.addEventListener('resize', calculateWidth)

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight

      // Section scroll progress (0 when section top hits viewport top, 1 when section bottom leaves)

      const scrollEnd = sectionHeight - viewportHeight
      const currentScroll = -sectionTop

      const progress = Math.max(0, Math.min(1, currentScroll / scrollEnd))

      // Apply horizontal transform
      const translateX = progress * scrollableWidth
      scrollContainer.style.transform = `translate3d(${-translateX}px, 0, 0)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calculateWidth)
    }
  }, [scrollableWidth])

  // Resolve images with fallbacks
  const img1 = horizontalImages?.image1 || '/hori-image-2.jpg'
  const img1Alt =
    horizontalImages?.image1Alt || m['images.researchLab']({}, { locale: locale as any })
  const img2 = horizontalImages?.image2 || '/hori-image-1.jpg'
  const img2Alt =
    horizontalImages?.image2Alt || m['images.teamCollaboration']({}, { locale: locale as any })
  const img3 = horizontalImages?.image3 || '/hori-image-3.jpg'
  const img3Alt =
    horizontalImages?.image3Alt || m['images.innovation']({}, { locale: locale as any })

  // Resolve stats with fallbacks
  const resolvedStats =
    stats && stats.length > 0
      ? stats
      : [
          { number: '30+', label: m['home.stats.publications']({}, { locale: locale as any }) },
          { number: '25+', label: m['home.stats.researchers']({}, { locale: locale as any }) },
          { number: '10+', label: m['home.stats.years']({}, { locale: locale as any }) },
        ]

  // Resolve quote with fallbacks
  const resolvedQuote = quoteText || m['home.quote']({}, { locale: locale as any })
  const resolvedSource = quoteSource || m['home.quoteSource']({}, { locale: locale as any })

  return (
    <section ref={sectionRef} className="relative" style={{ height: `${300}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-white">
        <div
          ref={scrollContainerRef}
          className="flex gap-8 lg:gap-16 pl-6 lg:pl-16 will-change-transform transition-none"
          style={{ width: 'max-content' }}
        >
          {/* Title card */}
          <div className="flex-shrink-0 w-[90vw] lg:w-[50vw] h-[70vh] flex flex-col justify-center">
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold text-slate-700 tracking-tight leading-none mb-8">
              {title}
            </h2>
            <p className="text-xl lg:text-2xl text-slate-400 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          {/* Image 1 */}
          <div className="flex-shrink-0 w-[80vw] lg:w-[40vw] h-[70vh] rounded-3xl overflow-hidden relative">
            <Image src={img1} alt={img1Alt} fill className="object-cover" sizes="(max-width: 1024px) 80vw, 40vw" />
          </div>

          {/* Stats card */}
          <div className="flex-shrink-0 w-[80vw] lg:w-[35vw] h-[70vh] bg-slate-800 rounded-3xl p-12 flex flex-col justify-center">
            <div className="space-y-12">
              {resolvedStats.map((stat, index) => (
                <div key={index}>
                  <span className="font-display text-[clamp(3rem,6vw,5rem)] font-bold text-white">
                    {stat.number}
                  </span>
                  <p className="text-lg text-white/50 mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image 2 */}
          <div className="flex-shrink-0 w-[80vw] lg:w-[45vw] h-[70vh] rounded-3xl overflow-hidden relative">
            <Image src={img2} alt={img2Alt} fill className="object-cover" sizes="(max-width: 1024px) 80vw, 45vw" />
          </div>

          {/* Quote card */}
          <div className="flex-shrink-0 w-[80vw] lg:w-[40vw] h-[70vh] bg-primary-600 rounded-3xl p-12 flex flex-col justify-center">
            <blockquote className="text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-8">
              &ldquo;
              {resolvedQuote}
              &rdquo;
            </blockquote>
            <p className="text-white/70 text-lg">— {resolvedSource}</p>
          </div>

          {/* Image 3 */}
          <div className="flex-shrink-0 w-[80vw] lg:w-[40vw] h-[70vh] rounded-3xl overflow-hidden relative mr-16">
            <Image src={img3} alt={img3Alt} fill className="object-cover" sizes="(max-width: 1024px) 80vw, 40vw" />
          </div>
        </div>
      </div>
    </section>
  )
}
