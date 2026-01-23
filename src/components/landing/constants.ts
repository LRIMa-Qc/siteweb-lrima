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
  { src: '/hero_image.JPG', alt: 'LRIMa Laboratory' },
  { src: '/robot-gif.gif', alt: 'Robotics research' },
  { src: '/logo_lrima.png', alt: 'LRIMa Logo' },
  { src: '/hero_image.JPG', alt: 'Research activity' },
  { src: '/robot-gif.gif', alt: 'Tech development' },
  { src: '/logo_lrima.png', alt: 'Innovation focus' },
  { src: '/hero_image.JPG', alt: 'Team collaboration' },
  { src: '/robot-gif.gif', alt: 'Advanced modeling' },
] as const

// ============================================================================
// Target Audiences
// ============================================================================

/**
 * Target audience items for the "Pour/For" section.
 * Each item has French and English translations.
 */
export const TARGET_AUDIENCES = [
  { fr: 'Étudiants en informatique', en: 'Computer science students' },
  { fr: 'Chercheurs passionnés', en: 'Passionate researchers' },
  { fr: 'Partenaires industriels', en: 'Industrial partners' },
  { fr: 'Professeurs', en: 'Professors' },
  { fr: 'Startups technologiques', en: 'Tech startups' },
  { fr: 'Organismes subventionnaires', en: 'Funding agencies' },
  { fr: 'Collaborateurs académiques', en: 'Academic collaborators' },
  { fr: 'Futurs chercheurs', en: 'Future researchers' },
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
