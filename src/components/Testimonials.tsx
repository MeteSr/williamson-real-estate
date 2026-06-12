'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    quote: 'Williamson Real Estate sold our home in 12 days and saved us over $9,000 in commission. The HomeGentic Property Record gave buyers total confidence.',
    name: 'Susan M.',
    role: 'Pelican Bay Homeowner',
    saved: '$9,000+',
  },
  {
    quote: 'I was skeptical about the lower commission, but the service was exceptional. Professional photos, constant communication, and we got above asking price.',
    name: 'Robert & Linda K.',
    role: 'Pelican Bay Sellers',
    saved: '$11,500',
  },
  {
    quote: 'The HomeGentic record made our due-diligence period incredibly smooth. Buyers had every question answered before they even asked.',
    name: 'James T.',
    role: 'Pelican Bay Homeowner',
    saved: '$8,750',
  },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)

  return (
    <section className="bg-cream py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-3">Homeowner Stories</p>
          <h2 className="text-4xl font-extrabold text-navy">What Homeowners Are Saying</h2>
        </div>

        {/* Desktop: all cards */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 shadow-card"
            >
              <Stars />
              <p className="text-gray-700 text-sm leading-relaxed my-4">"{t.quote}"</p>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                <div>
                  <p className="font-bold text-navy text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Saved</p>
                  <p className="text-teal font-extrabold text-lg">{t.saved}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="sm:hidden">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-7 shadow-card rounded-2xl"
              >
                <Stars />
                <p className="text-gray-700 text-sm leading-relaxed my-4">"{testimonials[idx].quote}"</p>
                <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                  <div>
                    <p className="font-bold text-navy text-sm">{testimonials[idx].name}</p>
                    <p className="text-gray-400 text-xs">{testimonials[idx].role}</p>
                  </div>
                  <p className="text-teal font-extrabold text-lg">{testimonials[idx].saved}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === idx ? 'bg-teal' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="#F59E0B">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}
