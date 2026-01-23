import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // This catches favicon.ico, images, etc.
  ) {
    return NextResponse.next()
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url))
  }
  return NextResponse.next()
}
