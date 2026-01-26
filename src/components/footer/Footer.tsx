import * as m from '@/paraglide/messages'
import { getLocale } from '@/paraglide/runtime'
import { SITE_CONFIG, CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'
import { LinkedInIcon, GitHubIcon } from '@/components/ui'

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
                  href={`/${locale}/membres`}
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
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <a
              href={SOCIAL_LINKS.github}
              className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center hover:bg-[#333] hover:scale-110 transition-all duration-300 text-slate-600 hover:text-white"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
