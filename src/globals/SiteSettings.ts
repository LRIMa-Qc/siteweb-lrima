import type { GlobalConfig } from 'payload'

/**
 * Site Settings Global
 *
 * Editable site-wide content: logos, contact info, social links, and metadata.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: {
    en: 'Site Settings',
    fr: 'Paramètres du site',
  },
  access: {
    read: () => true,
  },
  admin: {
    livePreview: {
      url: 'http://localhost:3000/fr/preview',
    },
  },
  fields: [
    // =========================================================================
    // Logos
    // =========================================================================
    {
      name: 'logos',
      type: 'group',
      label: { en: 'Logos', fr: 'Logos' },
      fields: [
        {
          name: 'headerLogo',
          type: 'upload',
          relationTo: 'media',
          label: { en: 'Header Logo', fr: "Logo de l'en-tête" },
        },
        {
          name: 'footerLogo',
          type: 'upload',
          relationTo: 'media',
          label: { en: 'Footer Logo', fr: 'Logo du pied de page' },
        },
      ],
    },

    // =========================================================================
    // Site Metadata
    // =========================================================================
    {
      name: 'metadata',
      type: 'group',
      label: { en: 'Site Metadata', fr: 'Métadonnées du site' },
      fields: [
        {
          name: 'siteName',
          type: 'text',
          label: { en: 'Site Name', fr: 'Nom du site' },
        },
        {
          name: 'siteDescription',
          type: 'textarea',
          localized: true,
          label: { en: 'Site Description', fr: 'Description du site' },
        },
      ],
    },

    // =========================================================================
    // Contact Information
    // =========================================================================
    {
      name: 'contact',
      type: 'group',
      label: { en: 'Contact Information', fr: 'Coordonnées' },
      fields: [
        {
          name: 'email',
          type: 'email',
          label: { en: 'Email', fr: 'Courriel' },
        },
        {
          name: 'phone',
          type: 'text',
          label: { en: 'Phone', fr: 'Téléphone' },
        },
        {
          name: 'addressLine1',
          type: 'text',
          label: { en: 'Address Line 1', fr: 'Adresse ligne 1' },
        },
        {
          name: 'addressLine2',
          type: 'text',
          label: { en: 'Address Line 2', fr: 'Adresse ligne 2' },
        },
        {
          name: 'addressLine3',
          type: 'text',
          label: { en: 'Address Line 3', fr: 'Adresse ligne 3' },
        },
        {
          name: 'mapEmbedUrl',
          type: 'text',
          label: { en: 'Google Maps Embed URL', fr: "URL d'intégration Google Maps" },
          admin: {
            description: {
              en: 'Paste the full iframe src URL from Google Maps embed.',
              fr: "Collez l'URL src complète de l'iframe Google Maps.",
            },
          },
        },
      ],
    },

    // =========================================================================
    // Social Links
    // =========================================================================
    {
      name: 'social',
      type: 'group',
      label: { en: 'Social Links', fr: 'Liens sociaux' },
      fields: [
        {
          name: 'linkedin',
          type: 'text',
          label: { en: 'LinkedIn URL', fr: 'URL LinkedIn' },
        },
        {
          name: 'github',
          type: 'text',
          label: { en: 'GitHub URL', fr: 'URL GitHub' },
        },
      ],
    },
  ],
}
