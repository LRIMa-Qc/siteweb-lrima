import Link from 'next/link'
import { cn } from '@/lib/cn'

interface MemberLinkProps {
  name: string
  slug?: string
  locale: string
  className?: string
}

export function MemberLink({ name, slug, locale, className }: MemberLinkProps) {
  if (slug) {
    return (
      <Link
        href={`/${locale}/membres/${slug}`}
        className={cn(
          'font-medium text-slate-900 hover:text-primary-600 hover:underline transition-colors',
          className,
        )}
      >
        {name}
      </Link>
    )
  }

  return <span className={cn('text-slate-700', className)}>{name}</span>
}
