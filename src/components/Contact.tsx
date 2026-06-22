'use client'
import { useState } from 'react'

const EMAIL_WORKER_URL = 'https://homegentic-email-relay.homegentic.workers.dev/send'
const PREFILL_MSG = 'Based on the savings calculator, I see that I can save up to 58% on the listing fee by listing with Williamson Real Estate. Please contact me so that we can go over the details.'

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function isValidPhone(v: string) {
  const digits = v.replace(/\D/g, '')
  return digits.length === 10 || (digits.length === 11 && digits[0] === '1')
}

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length < 4)  return digits
  if (digits.length < 7)  return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

type Field = 'name' | 'phone' | 'email'

export default function Contact() {
  const [name, setName]       = useState('')
  const [phone, setPhone]     = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors]   = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus]   = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function validate() {
    const e: Partial<Record<Field, string>> = {}
    if (!name.trim())         e.name  = 'Name is required'
    if (!phone.trim())        e.phone = 'Phone is required'
    else if (!isValidPhone(phone)) e.phone = 'Enter a valid 10-digit phone number'
    if (!email.trim())        e.email = 'Email is required'
    else if (!isValidEmail(email)) e.email = 'Enter a valid email address'
    return e
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return

    setStatus('sending')
    const msgPayload = message.trim() || null

    try {
      const res = await fetch(EMAIL_WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, address: '', message: msgPayload, source: 'contact' }),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setName(''); setPhone(''); setEmail(''); setMessage('')
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
        {/* Copy */}
        <div>
          <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-4xl font-extrabold text-navy mb-4">Let's Talk About Your Home</h2>
          <p className="text-gray-500 text-lg mb-8">Fill out the form and we'll be in touch within one business day.</p>

          <div className="space-y-4 text-gray-600 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-teal/10 rounded-full flex items-center justify-center text-teal shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.12 6.12l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.22z"/></svg>
              </div>
              <span className="font-medium">(386) 852-7207</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-teal/10 rounded-full flex items-center justify-center text-teal shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <span className="font-medium">info@sellingpelicanbay.com</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-teal/10 rounded-full flex items-center justify-center text-teal shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <span className="font-medium">813 Pelican Bay Drive, Daytona Beach, FL 32119</span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: 'Local Market Experts' },
              { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, label: 'Licensed Realtors' },
              { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: 'HomeGentic Verified' },
              { icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, label: 'Transparent Commission' },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-teal">{b.icon}</span>
                <span className="text-sm font-medium text-navy">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-7 sm:p-8" noValidate>
          {/* Honeypot */}
          <input name="website" type="text" tabIndex={-1} aria-hidden="true" className="hidden" />

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <Field label="Full Name *" error={errors.name}>
              <input value={name} onChange={e => setName(e.target.value)} type="text" autoComplete="name" className={input(!!errors.name)} placeholder="Jane Smith" />
            </Field>
            <Field label="Phone *" error={errors.phone}>
              <input value={phone} onChange={e => setPhone(formatPhone(e.target.value))} type="tel" autoComplete="tel" className={input(!!errors.phone)} placeholder="(386) 555-0100" />
            </Field>
          </div>
          <Field label="Email *" error={errors.email} className="mb-4">
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete="email" className={input(!!errors.email)} placeholder="jane@example.com" />
          </Field>
          <Field label="Message (optional)" className="mb-6">
            <textarea
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={PREFILL_MSG}
              className={`${input(false)} resize-none`}
            />
          </Field>

          {status === 'sent' && (
            <div className="mb-4 bg-teal/10 border border-teal/30 text-teal text-sm font-medium rounded-xl px-4 py-3 flex items-center gap-2">
              ✓ Message received! We'll be in touch within one business day.
            </div>
          )}
          {status === 'error' && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              Something went wrong — please try again or call us directly.
            </div>
          )}

          <button type="submit" disabled={status === 'sending'} className="btn btn-cta w-full">
            {status === 'sending' ? 'Sending…' : 'Contact Us Today'}
          </button>
          <p className="text-center text-gray-400 text-xs mt-3">No spam, ever. We'll respond within one business day.</p>
        </form>
      </div>
    </section>
  )
}

function input(hasError: boolean) {
  return `w-full px-4 py-3 bg-white border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/40 transition ${
    hasError ? 'border-red-400' : 'border-gray-200'
  }`
}

function Field({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
