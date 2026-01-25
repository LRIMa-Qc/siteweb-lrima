/**
 * Landing Page Constants
 *
 * Static data and configuration for the landing page.
 * Centralizes all hardcoded values for easy maintenance.
 */

// ============================================================================
// Gallery Images
// ============================================================================

/**
 * Images for the photo gallery section showcasing lab activities.
 */
export const GALLERY_IMAGES = [
  { src: '/gallery-1.JPG', alt: 'Laboratory activities' },
  { src: '/gallery-2.png', alt: 'Laboratory activities' },
  { src: '/gallery-3.jpg', alt: 'Laboratory activities' },
  { src: '/gallery-4.jpg', alt: 'Laboratory activities' },
  { src: '/gallery-5.jpg', alt: 'Laboratory activities' },
  { src: '/gallery-6.jpg', alt: 'Laboratory activities' },
  { src: '/gallery-7.jpg', alt: 'Laboratory activities' },
  { src: '/gallery-8.JPG', alt: 'Laboratory activities' },
] as const

// ============================================================================
// Target Audiences
// ============================================================================

/**
 * Target audience items for the "Pour/For" section.
 * Each item has French and English translations.
 */
export const TARGET_AUDIENCES = [
  { fr: 'Les esprits curieux', en: 'Curious minds' },
  { fr: 'Les entrepreneurs visionnaires', en: 'Visionary entrepreneurs' },
  { fr: 'Les futurs ingénieurs', en: 'Future engineers' },
  { fr: 'Les partenaires audacieux', en: 'Bold partners' },
  { fr: 'La recherche de pointe', en: 'Cutting-edge research' },
  { fr: 'L’excellence académique', en: 'Academic excellence' },
  { fr: 'Les créateurs de solutions', en: 'Solution creators' },
  { fr: 'Les passionnés de techno', en: 'Tech enthusiasts' },
] as const

/**
 * Get localized audience items
 * @param locale - Current locale ('fr' or 'en')
 * @returns Array of audience items with localized text
 */
export function getLocalizedAudiences(locale: string) {
  return TARGET_AUDIENCES.map((item) => ({
    text: locale === 'fr' ? item.fr : item.en,
  }))
}

// ============================================================================
// API Limits
// ============================================================================

/** Number of news items to fetch for the landing page */
export const NEWS_LIMIT = 3

/** Number of publications to fetch for the landing page */
export const PUBLICATIONS_LIMIT = 3
