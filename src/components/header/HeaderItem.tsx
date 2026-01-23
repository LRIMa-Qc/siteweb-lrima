import Link from 'next/link'
import { getLocale } from '@/paraglide/runtime'

export interface IHeaderItem {
  label: string
  href: string
}

export function HeaderItem(props: IHeaderItem) {
  const locale = getLocale()
  return (
    <li>
      <Link
        hrefLang={locale}
        href={`/${locale}${props.href}`}
        className="text-base font-medium transition-colors duration-300 px-5 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      >
        {props.label}
      </Link>
    </li>
  )
}
