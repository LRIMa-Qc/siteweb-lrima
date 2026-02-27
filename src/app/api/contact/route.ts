import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { CONTACT_INFO } from '@/lib/constants'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  organization?: string
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'LRIMa Contact <onboarding@resend.dev>',
      to: [CONTACT_INFO.email],
      replyTo: body.email,
      subject: `[LRIMa Contact] ${body.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        ${body.organization ? `<p><strong>Organization:</strong> ${body.organization}</p>` : ''}
        <p><strong>Subject:</strong> ${body.subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, '<br />')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
