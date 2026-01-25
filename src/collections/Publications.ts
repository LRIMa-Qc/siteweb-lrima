import type { CollectionConfig } from 'payload'
import { formatSlug } from '@/lib/formatSlug'
import { revalidateCollection } from '@/lib/revalidate'

export const Publications: CollectionConfig = {
  slug: 'publications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'publishedDate'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCollection('publications', doc.slug, '/publications')
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCollection('publications', doc.slug, '/publications')
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    {
      name: 'authors',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'author',
          type: 'text',
        },
      ],
    },
    {
      name: 'abstract',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'venue',
      type: 'text',
      required: false,
    },
    {
      name: 'journal',
      type: 'text',
      required: false,
    },
    {
      name: 'volume',
      type: 'text',
      required: false,
    },
    {
      name: 'issue',
      type: 'text',
      required: false,
    },
    {
      name: 'pages',
      type: 'text',
      required: false,
    },
    {
      name: 'doi',
      type: 'text',
      required: false,
    },
    {
      name: 'url',
      type: 'text',
      required: false,
    },
    {
      name: 'pdfUrl',
      type: 'text',
      required: false,
    },
    {
      name: 'keywords',
      type: 'array',
      fields: [
        {
          name: 'keyword',
          type: 'text',
        },
      ],
    },
    {
      name: 'citation',
      type: 'textarea',
      required: false,
      admin: {
        description: 'BibTeX or formatted citation for this publication',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
