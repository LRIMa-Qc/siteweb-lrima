import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
  imageSizes: [
    {
      name: 'free_crop_version',
      width: 1200,
      // This unlocks the aspect ratio in the Image Editor for this specific size.
    },
  ],
  }
}
