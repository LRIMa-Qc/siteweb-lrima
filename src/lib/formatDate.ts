/**
 * Formats a date object into a localized string.
 *
 * @param date - The date to format
 * @param locale - The locale to use ('fr' or 'en')
 * @returns Formatted date string (e.g., "25 janvier 2024" or "January 25, 2024")
 */
export function formatDate(date: Date | string, locale: string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
