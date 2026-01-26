'use client'

import React, { useEffect, useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as m from '@/paraglide/messages'
import { SearchIcon, CloseIcon, LoaderIcon, UserIcon } from '@/components/ui'
import { Member, News, Publication } from '@/types'

interface SearchData {
  news: News[]
  members: Member[]
  publications: Publication[]
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  locale: string
}

export function SearchModal({ isOpen, onClose, locale }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [data, setData] = useState<SearchData | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch data only once when the modal is first opened
  useEffect(() => {
    if (isOpen && !data && !loading) {
      setLoading(true)
      fetch(`/api/search?locale=${locale}`)
        .then((res) => res.json())
        .then((res) => {
          setData(res)
          setLoading(false)
        })
        .catch((err) => {
          console.error('Failed to fetch search data:', err)
          setLoading(false)
        })
    }
  }, [isOpen, locale, data, loading])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure render is complete
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
      return () => clearTimeout(timer)
    } else {
      setQuery('') // Reset query when closed
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Filter Data based on Query
  const results = useMemo(() => {
    if (!query || !data) return { news: [], members: [], publications: [] }

    const lowerQuery = query.toLowerCase()

    const filterItem = (text?: string) => text && text.toLowerCase().includes(lowerQuery)

    return {
      news: data.news
        .filter((item) => filterItem(item.title) || filterItem(item.summary))
        .slice(0, 5),
      members: data.members
        .filter((item) => filterItem(item.name) || filterItem(item.role))
        .slice(0, 5),
      publications: data.publications
        .filter((item) => filterItem(item.title) || item.authors.some((a) => filterItem(a)))
        .slice(0, 5),
    }
  }, [query, data])

  const hasResults =
    results.news.length > 0 || results.members.length > 0 || results.publications.length > 0

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-4 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header / Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-slate-100 bg-white z-10 sticky top-0">
          <SearchIcon className="w-5 h-5 text-slate-400 ml-2 flex-shrink-0" strokeWidth={2.5} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 px-3 py-2 text-lg text-slate-900 placeholder-slate-400 bg-transparent focus:ring-0 focus:outline-none appearance-none !border-none !ring-0 !outline-none !shadow-none"
            placeholder={m['search.placeholder']()}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors flex-shrink-0"
          >
            <span className="sr-only">{m['common.close']()}</span>
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 scrollbar-thin">
          {loading && !data && (
            <div className="flex items-center justify-center py-20 text-slate-400">
              <LoaderIcon className="w-6 h-6 animate-spin mr-2" />
              {m['common.loading']()}
            </div>
          )}

          {!loading && data && !query && (
            <div className="text-center py-20 text-slate-400 text-sm">
              {m['search.startTyping']()}
            </div>
          )}

          {!loading && query && !hasResults && (
            <div className="text-center py-20 text-slate-500">{m['search.noResults']()}</div>
          )}

          {query && hasResults && (
            <div className="space-y-6 p-2">
              {results.members.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
                    {m['nav.members']()}
                  </h3>
                  <ul className="space-y-1">
                    {results.members.map((member) => (
                      <li key={member.id}>
                        <Link
                          href={`/${locale}/membres/${member.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          {member.imageUrl ? (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-slate-100">
                              <Image
                                src={member.imageUrl}
                                alt={member.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                              <UserIcon className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <div className="text-slate-900 font-medium group-hover:text-blue-600 transition-colors">
                              {member.name}
                            </div>
                            {member.role}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {results.news.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
                    {m['nav.news']()}
                  </h3>
                  <ul>
                    {results.news.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/${locale}/nouvelles/${item.slug}`}
                          onClick={onClose}
                          className="block p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="text-slate-900 font-medium group-hover:text-blue-600 transition-colors line-clamp-1">
                            {item.title}
                          </div>
                          <div className="text-slate-500 text-sm line-clamp-1">{item.summary}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {results.publications.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
                    {m['nav.publications']()}
                  </h3>
                  <ul>
                    {results.publications.map((pub) => (
                      <li key={pub.id}>
                        <Link
                          href={`/${locale}/publications`} // Publications usually listed on index, ideally anchor or detail page if exists
                          onClick={onClose}
                          className="block p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="text-slate-900 font-medium group-hover:text-blue-600 transition-colors line-clamp-1">
                            {pub.title}
                          </div>
                          <div className="text-slate-500 text-sm line-clamp-1">
                            {pub.year} •{' '}
                            {pub.venue || pub.journal || m['publications.types.publication']()}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
          <span>
            {m['search.results']()}:{' '}
            {results.members.length + results.news.length + results.publications.length}
          </span>
          <span className="hidden sm:inline">{m['search.closeEsc']()}</span>
        </div>
      </div>
    </div>
  )
}
