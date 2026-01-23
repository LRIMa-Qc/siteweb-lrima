import Link from 'next/link'
import { ArrowIcon } from './icons/ArrowIcon'

interface SectionHeaderProps {
  id?: string
  title: string
  description?: string
  linkHref?: string
  linkText?: string
  theme?: 'light' | 'dark'
  className?: string
}

export function SectionHeader({
  id,
  title,
  description,
  linkHref,
  linkText,
  theme = 'light',
  className = '',
}: SectionHeaderProps) {
  const isDark = theme === 'dark'

  // Theme styles
  const titleColor = isDark ? 'text-white' : 'text-slate-900'
  const descColor = isDark ? 'text-white/50' : 'text-slate-600'

  // Link styles
  const linkTextColor = isDark ? 'text-white' : 'text-slate-900'
  const linkHoverColor = isDark ? 'group-hover:text-primary-400' : 'group-hover:text-primary-600'

  // Arrow Button styles
  const buttonBorder = isDark ? 'border-white/20' : 'border-slate-200'
  const buttonHoverBorder = isDark
    ? 'group-hover:border-primary-400'
    : 'group-hover:border-primary-600'
  const iconColor = isDark ? 'text-white/50' : 'text-slate-500'

  return (
    <div className={className}>
      <h2
        id={id}
        className={`font-display text-[clamp(3rem,8vw,7rem)] font-bold tracking-tight leading-none mb-6 ${titleColor}`}
      >
        {title}
      </h2>
      <div className="flex items-center justify-between">
        {description && (
          <p className={`text-xl lg:text-2xl max-w-2xl ${descColor}`}>{description}</p>
        )}

        {linkHref && linkText && (
          <Link href={linkHref} className="group hidden lg:flex items-center gap-3">
            <span
              className={`text-lg font-medium transition-colors ${linkTextColor} ${linkHoverColor}`}
            >
              {linkText}
            </span>
            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center group-hover:bg-primary-600 transition-all ${buttonBorder} ${buttonHoverBorder}`}
            >
              <ArrowIcon
                className={`w-5 h-5 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all ${iconColor}`}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
