'use client'

import { useEffect, useState } from 'react'
import { HeaderItem } from './HeaderItem'
import * as m from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { Button } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'

import { SearchModal } from '@/components/search/SearchModal'

/**
 * Header component that displays the navigation bar with logo, navigation links,
 * language switcher, and contact button.
 *
 * @returns The rendered header component with sticky positioning
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const locale = getLocale()
  const otherLocale = locale === 'fr' ? 'en' : 'fr'
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
          scrolled ? 'shadow-sm border-b border-slate-100' : ''
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link className="hover:opacity-80 transition-opacity" href={`/${locale}`}>
                <Image
                  src="/logo_lrima_header.png"
                  alt="LRIMA Logo"
                  width={160}
                  height={48}
                  className="object-contain h-12 w-auto"
                />
              </Link>
            </div>

            <nav className="hidden lg:block">
              <ul className="flex gap-2 items-center">
                <HeaderItem label={m['nav.news']()} href="/nouvelles" />
                <HeaderItem label={m['nav.publications']()} href="/publications" />
                <HeaderItem label={m['nav.members']()} href="/members" />
              </ul>
            </nav>

            <div className="flex items-center gap-5">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-3 rounded-xl transition-colors hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                aria-label={m['common.search']()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>

              <Link
                href={`/${otherLocale}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors font-medium text-base hover:bg-slate-100 text-slate-600 hover:text-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                {otherLocale.toUpperCase()}
              </Link>
              <Button
                href={`/${locale}/contact`}
                variant="primary"
                size="lg"
                className="hidden md:flex shadow-none hover:shadow-lg text-base px-6"
              >
                {m['nav.contact']()}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} locale={locale} />
    </>
  )
}
