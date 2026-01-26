import Link from 'next/link'
import { ArrowIcon } from './icons/ArrowIcon'

interface MobileViewAllLinkProps {
  href: string
  text: string
  /** Text color class - defaults to slate for light backgrounds */
  textColor?: string
}

/**
 * Mobile-only "View All" link that appears at the bottom of sections.
 * Hidden on large screens where the link is shown in the section header.
 */
export function MobileViewAllLink({
  href,
  text,
  textColor = 'text-slate-700',
}: MobileViewAllLinkProps) {
  return (
    <Link href={href} className="group flex lg:hidden items-center justify-center gap-3 mt-12">
      <span className={`text-lg font-medium ${textColor}`}>{text}</span>
      <ArrowIcon className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  )
}
