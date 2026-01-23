import { cn } from '@/lib/cn'
import React from 'react'

import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  href?: string
}

/**
 * Button component with various variants and sizes.
 *
 * @param children - The content of the button.
 * @param variant - The visual style of the button.
 * @param size - The size of the button.
 * @param fullWidth - Whether the button should take the full width of its container.
 * @param className - Additional class names.
 * @param props - Additional props passed to the button element.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  type = 'button',
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-400 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
    outline:
      'border-2 border-slate-200 text-slate-900 hover:bg-slate-50 focus:ring-slate-400 hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus:ring-slate-400 active:scale-95',
  }

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm gap-2',
    md: 'px-7 py-3.5 text-base gap-2',
    lg: 'px-9 py-4 text-lg gap-3',
  }

  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className,
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
