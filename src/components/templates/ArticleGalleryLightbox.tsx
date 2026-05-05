'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ArticleGalleryLightboxProps {
  images: string[]
  title: string
}

export function ArticleGalleryLightbox({ images, title }: ArticleGalleryLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [imageDimensions, setImageDimensions] = useState<Record<number, { width: number; height: number }>>({})

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (activeIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [activeIndex])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) return

      if (event.key === 'Escape') {
        setActiveIndex(null)
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => {
          if (prev === null) return prev
          return (prev + 1) % images.length
        })
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => {
          if (prev === null) return prev
          return (prev - 1 + images.length) % images.length
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, images.length])

  return (
    <>
      <section className="mt-10">
        <div className="flex flex-wrap gap-4">
          {images.map((imageSrc, index) => {
            const aspect = imageDimensions[index]
              ? imageDimensions[index].width / imageDimensions[index].height
              : 1
            return (
            <button
              key={`${imageSrc}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              style={{ flexGrow: aspect, flexBasis: `${aspect * 224}px` }}
              aria-label={`Open image ${index + 1}`}
            >
              <Image
                src={imageSrc}
                alt={`${title} - image ${index + 1}`}
                width={0}
                height={0}
                className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
                onLoad={(e) => {
                  const img = e.currentTarget
                  setImageDimensions((prev) => ({
                    ...prev,
                    [index]: { width: img.naturalWidth, height: img.naturalHeight },
                  }))
                }}
              />
            </button>
            )
          })}
        </div>
      </section>

      {isMounted &&
        activeIndex !== null &&
        createPortal(
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute inset-0 h-full w-full bg-slate-950/95"
              aria-label="Close image preview"
            />

            <div className="relative z-10 h-[60vh] w-[60vw] max-h-[60vh] max-w-[60vw] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/60 sm:h-[60vh] sm:w-[60vw]">
              <div className="relative h-full w-full">
                <Image
                  src={images[activeIndex]}
                  alt={`${title} - image ${activeIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 90vw, 60vw"
                  priority
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-6 top-6 z-20 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
              aria-label="Close image preview"
            >
              Close
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
                  className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
                  aria-label="Previous image"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                  className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
                  aria-label="Next image"
                >
                  Next
                </button>
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  )
}
