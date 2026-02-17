import type { GlobalConfig } from 'payload'

/**
 * Homepage Global
 *
 * Editable content for the landing page sections:
 * Hero, About, Stats, Quote, Audiences, Gallery, Horizontal Scroll Images, and CTA.
 */
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: {
    en: 'Homepage',
    fr: "Page d'accueil",
  },
  access: {
    read: () => true,
  },
  admin: {
    livePreview: {
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/fr/preview`,
    },
  },
  fields: [
    // =========================================================================
    // Hero Section
    // =========================================================================
    {
      name: 'hero',
      type: 'group',
      label: { en: 'Hero Section', fr: 'Section héro' },
      fields: [
        {
          name: 'labName',
          type: 'text',
          localized: true,
          label: { en: 'Laboratory Name', fr: 'Nom du laboratoire' },
        },
        {
          name: 'tagline',
          type: 'text',
          localized: true,
          label: { en: 'Tagline', fr: 'Slogan' },
        },
        {
          name: 'ctaResearchLabel',
          type: 'text',
          localized: true,
          label: { en: 'Research Button Label', fr: 'Libellé du bouton recherche' },
        },
        {
          name: 'ctaContactLabel',
          type: 'text',
          localized: true,
          label: { en: 'Contact Button Label', fr: 'Libellé du bouton contact' },
        },
      ],
    },

    // =========================================================================
    // About / Horizontal Scroll Section
    // =========================================================================
    {
      name: 'about',
      type: 'group',
      label: { en: 'About Section', fr: 'Section à propos' },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          label: { en: 'Title', fr: 'Titre' },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          label: { en: 'Description', fr: 'Description' },
        },
      ],
    },

    // =========================================================================
    // Horizontal Scroll Images
    // =========================================================================
    {
      name: 'horizontalImages',
      type: 'group',
      label: { en: 'Horizontal Scroll Images', fr: 'Images du défilement horizontal' },
      fields: [
        {
          name: 'image1',
          type: 'upload',
          relationTo: 'media',
          label: { en: 'Image 1', fr: 'Image 1' },
        },
        {
          name: 'image2',
          type: 'upload',
          relationTo: 'media',
          label: { en: 'Image 2', fr: 'Image 2' },
        },
        {
          name: 'image3',
          type: 'upload',
          relationTo: 'media',
          label: { en: 'Image 3', fr: 'Image 3' },
        },
      ],
    },

    // =========================================================================
    // Stats Section
    // =========================================================================
    {
      name: 'stats',
      type: 'group',
      label: { en: 'Stats Section', fr: 'Section statistiques' },
      fields: [
        {
          name: 'items',
          type: 'array',
          label: { en: 'Stat Items', fr: 'Statistiques' },
          minRows: 1,
          maxRows: 6,
          fields: [
            {
              name: 'number',
              type: 'text',
              required: true,
              label: { en: 'Number', fr: 'Nombre' },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
              label: { en: 'Label', fr: 'Libellé' },
            },
          ],
        },
      ],
    },

    // =========================================================================
    // Quote
    // =========================================================================
    {
      name: 'quote',
      type: 'group',
      label: { en: 'Quote', fr: 'Citation' },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          localized: true,
          label: { en: 'Quote Text', fr: 'Texte de la citation' },
        },
        {
          name: 'source',
          type: 'text',
          localized: true,
          label: { en: 'Quote Source', fr: 'Source de la citation' },
        },
      ],
    },

    // =========================================================================
    // Audience Section
    // =========================================================================
    {
      name: 'audiences',
      type: 'array',
      label: { en: 'Target Audiences', fr: 'Publics cibles' },
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          localized: true,
          label: { en: 'Audience Text', fr: 'Texte du public' },
        },
      ],
    },

    // =========================================================================
    // Gallery Section
    // =========================================================================
    {
      name: 'gallery',
      type: 'group',
      label: { en: 'Gallery Section', fr: 'Section galerie' },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          label: { en: 'Gallery Title', fr: 'Titre de la galerie' },
        },
        {
          name: 'images',
          type: 'array',
          label: { en: 'Gallery Images', fr: 'Images de la galerie' },
          minRows: 1,
          maxRows: 20,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: { en: 'Image', fr: 'Image' },
            },
          ],
        },
      ],
    },

    // =========================================================================
    // CTA Section
    // =========================================================================
    {
      name: 'cta',
      type: 'group',
      label: { en: 'CTA Section', fr: "Section appel à l'action" },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          label: { en: 'Title', fr: 'Titre' },
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
          label: { en: 'Subtitle', fr: 'Sous-titre' },
        },
        {
          name: 'contactLabel',
          type: 'text',
          localized: true,
          label: { en: 'Contact Button Label', fr: 'Libellé du bouton contact' },
        },
        {
          name: 'joinLabel',
          type: 'text',
          localized: true,
          label: { en: 'Join Button Label', fr: 'Libellé du bouton rejoindre' },
        },
        {
          name: 'robotImage',
          type: 'upload',
          relationTo: 'media',
          label: { en: 'Robot Image/GIF', fr: 'Image/GIF du robot' },
        },
      ],
    },
  ],
}
