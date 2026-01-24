import * as m from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { SITE_CONFIG, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'

/**
 * Footer component that displays the site branding, navigation links, contact information,
 * and social media links. Includes the LRIMA logo and copyright information.
 *
 * @returns The rendered footer component
 */
export function Footer() {
  const locale = getLocale()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Image
                src="/logo_lrima.png"
                alt="LRIMA Logo"
                width={160}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-slate-500 leading-relaxed text-lg max-w-md">
              {m['common.labName']({}, { locale })}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-slate-400 uppercase tracking-wider">
              {m['footer.navigation']({}, { locale })}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 text-base"
                >
                  {m['nav.home']({}, { locale })}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/nouvelles`}
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 text-base"
                >
                  {m['nav.news']({}, { locale })}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/publications`}
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 text-base"
                >
                  {m['nav.publications']({}, { locale })}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/members`}
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-300 text-base"
                >
                  {m['nav.members']({}, { locale })}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-slate-400 uppercase tracking-wider">
              {m['nav.contact']({}, { locale })}
            </h4>
            <ul className="space-y-3 text-slate-600 text-base">
              <li className="leading-relaxed">
                {CONTACT_INFO.address.line1}
                <br />
                {CONTACT_INFO.address.line2}
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`}
                  className="hover:text-slate-900 transition-colors duration-300"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-sm">
            © {currentYear} {SITE_CONFIG.name}. {m['footer.rights']({}, { locale })}
          </p>
          <div className="flex gap-4">
            <a
              href={SOCIAL_LINKS.linkedin}
              className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center hover:bg-[#0A66C2] hover:scale-110 transition-all duration-300 text-slate-600 hover:text-white"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.github}
              className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center hover:bg-[#333] hover:scale-110 transition-all duration-300 text-slate-600 hover:text-white"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
