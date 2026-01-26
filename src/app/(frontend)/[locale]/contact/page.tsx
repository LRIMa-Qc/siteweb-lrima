import * as m from '@/paraglide/messages'
import { Container, Button, PageHeader, MapPinIcon, PhoneIcon, MailIcon } from '@/components/ui'
import { CONTACT_INFO } from '@/lib/constants'

// Contact form component
function ContactForm() {
  return (
    <div className="glass-card p-8 md:p-10 rounded-3xl bg-white shadow-sm border border-slate-100">
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
              {m['contact.form.name']()}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={m['contact.form.name']()}
              className="w-full"
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
              placeholder={m['contact.form.email']()}
              className="w-full"
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
            placeholder={m['contact.form.organization']()}
            className="w-full"
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
            placeholder={m['contact.form.subject']()}
            className="w-full"
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
            placeholder={m['contact.form.message']()}
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          className="rounded-xl shadow-lg shadow-primary-500/10"
        >
          {m['contact.form.submit']()}
        </Button>
      </form>
    </div>
  )
}

// Contact info component
function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="space-y-6">
          {/* Address */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
              <MapPinIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-600 leading-relaxed">
                3800 Sherbrooke St E<br />
                Montreal, Quebec H1X 2A2
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
              <PhoneIcon className="w-6 h-6" />
            </div>
            <div>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\D/g, '')}`}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
              <MailIcon className="w-6 h-6" />
            </div>
            <div>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps embed */}
      <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.0661547474!2d-73.5538!3d45.5452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91bb0e1c9f3ed%3A0x7d5c6b0a6f8d8d8d!2s3800%20Rue%20Sherbrooke%20E%2C%20Montr%C3%A9al%2C%20QC%20H1X%202A2!5e0!3m2!1sfr!2sca!4v1700000000000!5m2!1sfr!2sca"
          width="100%"
          height="320"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="LRIMa Location"
          className="w-full"
        />
      </div>
    </div>
  )
}

export default async function ContactPage() {
  return (
    <div className="contact-page bg-white min-h-screen">
      {/* Header Section */}
      <PageHeader title={m['contact.title']()} subtitle={m['contact.subtitle']()} />

      {/* Contact Form and Info Section */}
      <section className="py-24 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-3xl font-bold mb-8 text-slate-900">
                {m['contact.form.title']()}
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-bold mb-8 text-slate-900">
                {m['contact.info.title']()}
              </h2>
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
