/**
 * Gallery Section Component
 *
 * Auto-scrolling photo gallery with two marquee rows.
 * Features:
 * - Horizontal marquee animations (left and right)
 * - Varied card sizes for visual interest
 * - Hover effects on images
 * - Scroll animations on section entry
 */

import Image from 'next/image'
import { ScrollAnimation } from '@/components/ui'
import * as m from '@/paraglide/messages'

// ============================================================================
// Types
// ============================================================================

interface GalleryImage {
  src: string
  alt: string
}

interface GallerySectionProps {
  /** Current locale for i18n */
  locale: string
  /** Array of gallery images */
  images: readonly GalleryImage[]
}

// ============================================================================
// Constants
// ============================================================================

/** Row 1: Base width with variations */
const ROW1_BASE_WIDTH = 320
const ROW1_WIDTH_VARIATION = 120
const ROW1_HEIGHT = 280

/** Row 2: Base width with variations */
const ROW2_BASE_WIDTH = 280
const ROW2_WIDTH_VARIATION = 100
const ROW2_HEIGHT = 220

// ============================================================================
// Component
// ============================================================================

export function GallerySection({ images }: GallerySectionProps) {
  // Double the images for seamless infinite scroll
  const doubledImages = [...images, ...images]
  const reversedDoubledImages = [...images].reverse().concat([...images].reverse())

  return (
    <section
      className="relative py-32 lg:py-48 bg-slate-50 overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      {/* Section Header */}
      <div className="w-full px-6 lg:px-16 mb-16">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation animation="fade-up">
            <h2
              id="gallery-heading"
              className="font-display text-[clamp(3rem,8vw,7rem)] font-bold text-slate-700 tracking-tight leading-none"
            >
              {m['home.gallery.title']()}
            </h2>
          </ScrollAnimation>
        </div>
      </div>

      {/* Gallery Row 1 - Left Marquee */}
      <ScrollAnimation animation="fade-left" delay={100}>
        <MarqueeRow
          images={doubledImages}
          direction="left"
          baseWidth={ROW1_BASE_WIDTH}
          widthVariation={ROW1_WIDTH_VARIATION}
          height={ROW1_HEIGHT}
          className="mb-6"
        />
      </ScrollAnimation>

      {/* Gallery Row 2 - Right Marquee */}
      <ScrollAnimation animation="fade-right" delay={200}>
        <MarqueeRow
          images={reversedDoubledImages}
          direction="right"
          baseWidth={ROW2_BASE_WIDTH}
          widthVariation={ROW2_WIDTH_VARIATION}
          height={ROW2_HEIGHT}
        />
      </ScrollAnimation>
    </section>
  )
}

// ============================================================================
// Sub-components
// ============================================================================

interface MarqueeRowProps {
  images: readonly GalleryImage[]
  direction: 'left' | 'right'
  baseWidth: number
  widthVariation: number
  height: number
  className?: string
}

function MarqueeRow({
  images,
  direction,
  baseWidth,
  widthVariation,
  height,
  className = '',
}: MarqueeRowProps) {
  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
  const variationMod = direction === 'left' ? 3 : 4

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`flex ${animationClass} gap-6`}>
        {images.map((img, i) => (
          <GalleryCard
            key={`${direction}-${i}`}
            image={img}
            width={baseWidth + (i % variationMod) * widthVariation}
            height={height}
          />
        ))}
      </div>
    </div>
  )
}

interface GalleryCardProps {
  image: GalleryImage
  width: number
  height: number
}

function GalleryCard({ image, width, height }: GalleryCardProps) {
  return (
    <div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden group shadow-lg shadow-slate-200/50"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div
        className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors"
        aria-hidden="true"
      />
    </div>
  )
}
