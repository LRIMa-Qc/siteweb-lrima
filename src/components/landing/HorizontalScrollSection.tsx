'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import * as m from '@/paraglide/messages'

interface HorizontalScrollSectionProps {
  locale: string
  title: string
  description: string
}

export function HorizontalScrollSection({
  locale,
  title,
  description,
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
            <Image
              src="/gallery-1.JPG"
              alt={m['images.researchLab']({}, { locale: locale as any })}
              fill
              className="object-cover"
            />
          </div>

          {/* Stats card */}
          <div className="flex-shrink-0 w-[80vw] lg:w-[35vw] h-[70vh] bg-slate-800 rounded-3xl p-12 flex flex-col justify-center">
            <div className="space-y-12">
              <div>
                <span className="font-display text-[clamp(3rem,6vw,5rem)] font-bold text-white">
                  50+
                </span>
                <p className="text-lg text-white/50 mt-2">
                  {m['home.stats.publications']({}, { locale: locale as any })}
                </p>
              </div>
              <div>
                <span className="font-display text-[clamp(3rem,6vw,5rem)] font-bold text-white">
                  25+
                </span>
                <p className="text-lg text-white/50 mt-2">
                  {m['home.stats.researchers']({}, { locale: locale as any })}
                </p>
              </div>
              <div>
                <span className="font-display text-[clamp(3rem,6vw,5rem)] font-bold text-white">
                  10+
                </span>
                <p className="text-lg text-white/50 mt-2">
                  {m['home.stats.years']({}, { locale: locale as any })}
                </p>
              </div>
            </div>
          </div>

          {/* Image 2 */}
          <div className="flex-shrink-0 w-[80vw] lg:w-[45vw] h-[70vh] rounded-3xl overflow-hidden relative">
            <Image
              src="/robot-gif.gif"
              alt={m['images.teamCollaboration']({}, { locale: locale as any })}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Quote card */}
          <div className="flex-shrink-0 w-[80vw] lg:w-[40vw] h-[70vh] bg-primary-600 rounded-3xl p-12 flex flex-col justify-center">
            <blockquote className="text-2xl lg:text-3xl text-white font-medium leading-relaxed mb-8">
              &ldquo;
              {m['home.quote']({}, { locale: locale as any })}
              &rdquo;
            </blockquote>
            <p className="text-white/70 text-lg">— LRIMa</p>
          </div>

          {/* Image 3 */}
          <div className="flex-shrink-0 w-[80vw] lg:w-[40vw] h-[70vh] rounded-3xl overflow-hidden relative mr-16">
            <Image
              src="/gallery-1.JPG"
              alt={m['images.innovation']({}, { locale: locale as any })}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
