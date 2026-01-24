/**
 * Site-wide constants and configuration
 */

export const SITE_CONFIG = {
  name: 'LRIMa',
  description:
    'Laboratoire de Recherche Informatique Maisonneuve - Pôle d’excellence en recherche appliquée, IA et IoT.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lrima.qc.ca',
  author: 'LRIMa',
  locale: {
    default: 'fr',
    supported: ['en', 'fr'],
  },
} as const

export const SOCIAL_LINKS = {
  linkedin:
    'https://www.linkedin.com/company/lrima-laboratoire-de-recherche-informatique-maisonneuve/',
  github: 'https://github.com/LRIMa-Qc',
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
