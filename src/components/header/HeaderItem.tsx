import Link from 'next/link'

export interface IHeaderItem {
  label: string
  href: string
  locale: string
}

export function HeaderItem(props: IHeaderItem) {
  return (
    <li>
      <Link
        hrefLang={props.locale}
        href={`/${props.locale}${props.href}`}
        className="text-base font-medium transition-colors duration-300 px-5 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      >
        {props.label}
      </Link>
    </li>
  )
}
