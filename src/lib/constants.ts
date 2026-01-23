/**
 * Site-wide constants and configuration
 */

export const SITE_CONFIG = {
  name: 'LRIMA',
  description:
    'Laboratoire de Recherche Informatique Maisonneuve - Advancing Research in Intelligence and Modeling',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: 'LRIMA',
  locale: {
    default: 'en',
    supported: ['en', 'fr'],
  },
} as const

export const SOCIAL_LINKS = {
  twitter: '#',
  linkedin: '#',
  github: '#',
} as const

export const CONTACT_INFO = {
  email: 'lrima@cmaisonneuve.qc.ca',
  phone: '+1 (514) 254-7131',
  address: {
    line1: 'Collège de Maisonneuve',
    line2: '3800, rue Sherbrooke Est',
    line3: 'Montréal (Québec)',
    line4: 'H1X 2A2',
    line5: 'Canada',
  },
} as const
