import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / (3600 * 24))
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  const parts = []
  if (d > 0) parts.push(`${d}d`)
  if (h > 0) parts.push(`${h}h`)
  if (m > 0) parts.push(`${m}m`)
  if (s > 0 || parts.length === 0) parts.push(`${s}s`)

  return parts.join(' ')
}

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

  const uptimeSeconds = process.uptime()
  const formattedUptime = formatUptime(uptimeSeconds)

  const responsePayload = {
    status: isHealthy ? 'pass' : 'fail',
    uptime: formattedUptime,
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
