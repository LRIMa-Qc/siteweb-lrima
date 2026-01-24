import type { CollectionConfig } from 'payload'
import { formatSlug } from '@/lib/formatSlug'
import { revalidateCollection } from '@/lib/revalidate'

export const Members: CollectionConfig = {
  slug: 'members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'status', 'joinDate'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateCollection('members', doc.slug, '/members')
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateCollection('members', doc.slug, '/members')
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
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
        beforeValidate: [formatSlug('name')],
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'email',
      type: 'email',
      required: false,
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'researchInterests',
      type: 'array',
      fields: [
        {
          name: 'interest',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'website',
      type: 'text',
      required: false,
    },
    {
      name: 'linkedIn',
      type: 'text',
      required: false,
    },
    {
      name: 'googleScholar',
      type: 'text',
      required: false,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Alumni', value: 'alumni' },
        { label: 'Collaborator', value: 'collaborator' },
      ],
      defaultValue: 'active',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'joinDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
