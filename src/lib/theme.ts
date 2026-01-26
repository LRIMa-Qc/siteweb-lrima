/**
 * Common theme styles for components that support light/dark modes.
 * Centralizes color classes to ensure consistency across the application.
 */

interface ThemeStyles {
  titleColor: string
  descColor: string
  textColor: string
  metaColor: string
  iconColor: string
  borderColor: string
  buttonBorder: string
  buttonHoverBorder: string
  linkTextColor: string
  linkHoverColor: string
}

export const THEME_STYLES = {
  light: {
    titleColor: 'text-slate-900',
    descColor: 'text-slate-600',
    textColor: 'text-slate-600',
    metaColor: 'text-slate-400',
    iconColor: 'text-slate-500',
    borderColor: 'border-slate-100',
    buttonBorder: 'border-slate-200',
    buttonHoverBorder: 'group-hover:border-primary-600',
    linkTextColor: 'text-slate-900',
    linkHoverColor: 'group-hover:text-primary-600',
    typeColor: 'text-primary-600',
  },
  dark: {
    titleColor: 'text-white',
    descColor: 'text-white/50',
    textColor: 'text-white/40',
    metaColor: 'text-white/30',
    iconColor: 'text-white/50',
    borderColor: 'border-white/10',
    buttonBorder: 'border-white/20',
    buttonHoverBorder: 'group-hover:border-primary-400',
    linkTextColor: 'text-white',
    linkHoverColor: 'group-hover:text-primary-400',
    typeColor: 'text-primary-400',
  },
} as const

export type Theme = keyof typeof THEME_STYLES

/**
 * Hook or helper to get theme styles.
 * currently just a wrapper, but allows for future logic (e.g. system preference).
 */
export function getThemeStyles(theme: Theme = 'light') {
  return THEME_STYLES[theme]
}
