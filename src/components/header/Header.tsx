'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { HeaderItem } from './HeaderItem'
import * as m from '@/paraglide/messages'
import { Button } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'

import { SearchModal } from '@/components/search/SearchModal'
import { SearchIcon, GlobeIcon } from '@/components/ui'

/**
 * Header component that displays the navigation bar with logo, navigation links,
 * language switcher, and contact button.
 *
 * @returns The rendered header component with sticky positioning
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Get locale from URL path (e.g., /fr/... or /en/...)
  const locale = pathname.startsWith('/en') ? 'en' : 'fr'
  const otherLocale = locale === 'fr' ? 'en' : 'fr'

  // Build the path for language switch (replace locale prefix)
  const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, '') || '/'
  const switchLocalePath = `/${otherLocale}${pathWithoutLocale}`
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
                <HeaderItem
                  label={m['nav.news']({}, { locale: locale as any })}
                  href="/nouvelles"
                  locale={locale}
                />
                <HeaderItem
                  label={m['nav.publications']({}, { locale: locale as any })}
                  href="/publications"
                  locale={locale}
                />
                <HeaderItem
                  label={m['nav.members']({}, { locale: locale as any })}
                  href="/membres"
                  locale={locale}
                />
              </ul>
            </nav>

            <div className="flex items-center gap-5">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-3 rounded-xl transition-colors hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                aria-label={m['common.search']({}, { locale: locale as any })}
              >
                <SearchIcon className="w-[22px] h-[22px]" />
              </button>

              <Link
                href={switchLocalePath}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors font-medium text-base hover:bg-slate-100 text-slate-600 hover:text-slate-900"
              >
                <GlobeIcon className="w-[18px] h-[18px]" />
                {otherLocale.toUpperCase()}
              </Link>
              <Button
                href={`/${locale}/contact`}
                variant="primary"
                size="lg"
                className="hidden md:flex shadow-none hover:shadow-lg text-base px-6"
              >
                {m['nav.contact']({}, { locale: locale as any })}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} locale={locale} />
    </>
  )
}
