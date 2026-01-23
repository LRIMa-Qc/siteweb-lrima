import type { FieldHook } from 'payload'

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ operation, value, originalDoc, data }) => {
    if (typeof value === 'string') {
      return value
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .toLowerCase()
    }

    if (operation === 'create') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return fallbackData
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '')
          .toLowerCase()
      }
    }

    return value
  }
