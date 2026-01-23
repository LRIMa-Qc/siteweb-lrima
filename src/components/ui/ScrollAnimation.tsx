'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-in' | 'blur-in'
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

export function ScrollAnimation({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Set initial styles
    element.style.opacity = '0'
    element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out, filter ${duration}ms ease-out`
    element.style.transitionDelay = `${delay}ms`

    switch (animation) {
      case 'fade-up':
        element.style.transform = 'translateY(40px)'
        break
      case 'fade-left':
        element.style.transform = 'translateX(40px)'
        break
      case 'fade-right':
        element.style.transform = 'translateX(-40px)'
        break
      case 'scale-in':
        element.style.transform = 'scale(0.95)'
        break
      case 'blur-in':
        element.style.filter = 'blur(10px)'
        break
      case 'fade-in':
      default:
        break
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.style.opacity = '1'
            element.style.transform = 'translateY(0) translateX(0) scale(1)'
            element.style.filter = 'blur(0)'

            if (once) {
              observer.unobserve(element)
            }
          } else if (!once) {
            // Reset if not once
            element.style.opacity = '0'
            switch (animation) {
              case 'fade-up':
                element.style.transform = 'translateY(40px)'
                break
              case 'fade-left':
                element.style.transform = 'translateX(40px)'
                break
              case 'fade-right':
                element.style.transform = 'translateX(-40px)'
                break
              case 'scale-in':
                element.style.transform = 'scale(0.95)'
                break
              case 'blur-in':
                element.style.filter = 'blur(10px)'
                break
            }
          }
        })
      },
      { threshold },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [animation, delay, duration, threshold, once])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

// Stagger animation wrapper for lists
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-in' | 'blur-in'
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 100,
  animation = 'fade-up',
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const items = container.children

    Array.from(items).forEach((item, index) => {
      const el = item as HTMLElement
      el.style.opacity = '0'
      el.style.transition = `opacity 600ms ease-out, transform 600ms ease-out`
      el.style.transitionDelay = `${index * staggerDelay}ms`

      switch (animation) {
        case 'fade-up':
          el.style.transform = 'translateY(30px)'
          break
        case 'fade-left':
          el.style.transform = 'translateX(30px)'
          break
        case 'fade-right':
          el.style.transform = 'translateX(-30px)'
          break
        case 'scale-in':
          el.style.transform = 'scale(0.95)'
          break
      }
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Array.from(items).forEach((item) => {
              const el = item as HTMLElement
              el.style.opacity = '1'
              el.style.transform = 'translateY(0) translateX(0) scale(1)'
            })
            observer.unobserve(container)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [staggerDelay, animation])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
