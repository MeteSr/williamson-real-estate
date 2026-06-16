'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    image: '/first_time_homebuyer.png',
    quote: 'As a first time home owner, I was told multiple times how stressful the search, negotiation and buying process can be. With the perfect mixture of patience and knowledge of craft, Demetrius did an amazing job to ensure an easy and stress free experience.',
    name: 'First-Time Homebuyer',
    role: 'Daytona Beach, FL',
  },
  {
    image: '/growing_family.png',
    quote: 'Demetrius helped us steer away from settling and purchasing too quickly. The day we found our home, he was ready to write the offer right away — it was obvious this property was too good to wait. Throughout negotiations he was prompt and gave advice that ultimately led to our offer being accepted over the others.',
    name: 'Growing Family',
    role: 'Daytona Beach, FL',
  },
  {
    image: '/condo_seller.png',
    quote: 'Demetrius worked hard to get the maximum price for the condo he listed for me. He is quick to return calls and kept me up to date on showings. He was flexible on scheduling the closing and willing to bring documents to me when they needed signing.',
    name: 'Condo Seller',
    role: 'Daytona Beach, FL',
  },
]

export default function Testimonials() {
  const [idx, setIdx] = useState(0)

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#BF5700] rounded-3xl px-8 py-14 lg:px-16 lg:py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">What Our Clients Say</h2>
        </div>

        {/* Desktop: 3-up grid */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 shadow-card flex flex-col"
            >
              <Stars />
              <p className="text-gray-700 text-sm leading-relaxed mt-4 flex-1">"{t.quote}"</p>
              <div className="flex items-end justify-between mt-6 gap-4">
                <div>
                  <p className="font-semibold text-navy text-sm">— {t.name}</p>
                  <p className="text-teal text-xs mt-0.5">{t.role}</p>
                </div>
                <Avatar image={t.image}  />
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
                className="bg-white p-7 shadow-card rounded-2xl flex flex-col"
              >
                <Stars />
                <p className="text-gray-700 text-sm leading-relaxed mt-4 flex-1">"{testimonials[idx].quote}"</p>
                <div className="flex items-end justify-between mt-6 gap-4">
                  <div>
                    <p className="font-semibold text-navy text-sm">— {testimonials[idx].name}</p>
                    <p className="text-teal text-xs mt-0.5">{testimonials[idx].role}</p>
                  </div>
                  <Avatar image={testimonials[idx].image} />
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
      </div>
    </section>
  )
}

function Avatar({ image }: { image: string }) {
  return (
    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-gray-100 shadow-sm">
      <img src={image} alt="" className="w-full h-full object-cover" />
    </div>
  )
}

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#F59E0B">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}
