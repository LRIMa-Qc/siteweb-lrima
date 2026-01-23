/**
 * Landing Page Components
 *
 * This module exports all section components used in the landing page.
 * Each section is a self-contained component with its own styles and logic.
 */

// Section Components
export { HeroSection } from './HeroSection'
export { NewsSection } from './NewsSection'
export { PublicationsSection } from './PublicationsSection'
export { AudienceSection } from './AudienceSection'
export { GallerySection } from './GallerySection'
export { CTASection } from './CTASection'
export { HorizontalScrollSection } from './HorizontalScrollSection'

// Constants and Utilities
export {
  GALLERY_IMAGES,
  TARGET_AUDIENCES,
  getLocalizedAudiences,
  NEWS_LIMIT,
  PUBLICATIONS_LIMIT,
} from './constants'
