import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SITE_URL: !!process.env.NEXT_PUBLIC_SITE_URL,
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: !!process.env.RESEND_FROM_EMAIL,
    BLOB_READ_WRITE_TOKEN: !!process.env.BLOB_READ_WRITE_TOKEN,
    DATABASE_URI: !!process.env.DATABASE_URI,
    MONGODB_URI: !!process.env.MONGODB_URI,
    PAYLOAD_SECRET: !!process.env.PAYLOAD_SECRET,
  }

  const isHealthy = Object.values(envVars).every((isSet) => isSet)

  const details = Object.entries(envVars).reduce(
    (acc, [key, value]) => {
      acc[key] = value ? 'pass' : 'fail'
      return acc
    },
    {} as Record<string, string>,
  )

  const responsePayload = {
    status: isHealthy ? 'pass' : 'fail',
    details: {
      environmentVariables: details,
    },
  }

  return NextResponse.json(responsePayload, {
    status: isHealthy ? 200 : 503,
    headers: {
      'Content-Type': 'application/health+json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
