'use client'

import { useState, FormEvent } from 'react'
import { Button, LoaderIcon } from '@/components/ui'
import * as m from '@/paraglide/messages'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', organization: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const isSubmitting = status === 'submitting'

  return (
    <div className="glass-card p-8 md:p-10 rounded-3xl bg-white shadow-sm border border-slate-100">
      {status === 'success' ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg text-slate-700 font-medium">{m['contact.form.success']()}</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 text-primary-600 hover:text-primary-700 font-medium"
          >
            {m['contact.form.submit']()} →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                {m['contact.form.name']()}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={m['contact.form.name']()}
                required
                disabled={isSubmitting}
                className="w-full disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                {m['contact.form.email']()}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={m['contact.form.email']()}
                required
                disabled={isSubmitting}
                className="w-full disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="organization" className="block text-sm font-semibold text-slate-700 mb-2">
              {m['contact.form.organization']()}
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder={m['contact.form.organization']()}
              disabled={isSubmitting}
              className="w-full disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
              {m['contact.form.subject']()}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder={m['contact.form.subject']()}
              required
              disabled={isSubmitting}
              className="w-full disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
              {m['contact.form.message']()}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder={m['contact.form.message']()}
              required
              disabled={isSubmitting}
              className="w-full disabled:opacity-50"
            />
          </div>

          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {m['contact.form.error']()}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isSubmitting}
            className="rounded-xl shadow-lg shadow-primary-500/10"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <LoaderIcon className="w-5 h-5 animate-spin" />
                {m['contact.form.sending']()}
              </span>
            ) : (
              m['contact.form.submit']()
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
