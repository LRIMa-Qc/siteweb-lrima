// Types for LRIMA website entities

export interface Member {
  id: string
  name: string
  title: string
  role: string
  email?: string
  phone?: string
  bio: any // Lexical rich text structure
  imageUrl?: string
  researchInterests?: string[]
  publications?: string[]
  website?: string
  linkedIn?: string

  github?: string
  googleScholar?: string
  status: 'active' | 'alumni' | 'collaborator'
  joinDate: Date
  slug: string
}

export interface Publication {
  id: string
  title: string
  authors: string[]
  abstract: string
  year: number
  venue?: string
  journal?: string
  volume?: string
  issue?: string
  pages?: string
  doi?: string
  url?: string
  pdfUrl?: string
  keywords?: string[]
  citation?: string
  publishedDate: Date
  slug: string
}

export interface News {
  id: string
  title: string
  summary: string
  content: any // Lexical rich text structure
  imageUrl?: string
  author?: string
  category?: string
  tags?: string[]
  publishedDate: Date
  updatedDate?: Date
  featured?: boolean
  slug: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  organization?: string
}

// Utility type for paginated lists
export interface PaginatedList<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Filter types removed as requested
