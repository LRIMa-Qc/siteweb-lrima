import { NextResponse } from 'next/server'
import { getNews, getMembers, getPublications } from '@/lib/payload'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = searchParams.get('locale') || 'fr'

  try {
    const [news, members, publications] = await Promise.all([
      getNews({ limit: 1000, locale }), // Increase limit to ensure we get searchable content
      getMembers({ status: 'active', locale }), // Only active members
      getPublications({ limit: 1000, locale }),
    ])

    return NextResponse.json({
      news,
      members,
      publications,
    })
  } catch (error) {
    console.error('Search API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch search data' }, { status: 500 })
  }
}
