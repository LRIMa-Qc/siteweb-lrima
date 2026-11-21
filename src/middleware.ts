import { NextRequest, NextResponse } from 'next/server'

const SUPPORTED_LOCALES = ['en', 'fr']
const DEFAULT_LOCALE = 'fr'

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') // This catches favicon.ico, images, etc.
  ) {
    return NextResponse.next()
  }

  // Redirect root to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url))
  }

  // Extract potential locale from pathname
  const segments = pathname.split('/')
  const potentialLocale = segments[1]

  // If the first segment is not a supported locale, redirect to default locale
  if (potentialLocale && !SUPPORTED_LOCALES.includes(potentialLocale)) {
    // Prepend default locale to the path
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     * - admin (Payload admin)
     * - static files with extensions (e.g. .svg, .png, .jpg, .jpeg, .gif, .webp, .ico, etc.)
     */
    '/((?!_next/static|_next/image|api|admin|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml)$).*)',
  ],
}

