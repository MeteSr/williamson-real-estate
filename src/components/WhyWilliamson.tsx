'use client'
import { motion } from 'framer-motion'

const cards = [
  {
    icon: '📸',
    title: 'Full-Service Marketing',
    desc: 'Professional photos, video, staging guidance, and targeted digital exposure to attract premium buyers.',
    color: 'bg-teal/10 text-teal',
  },
  {
    icon: '💰',
    title: 'Unbeatable Savings',
    desc: 'Lower commission means bigger results. More in your pocket—without compromising service.',
    color: 'bg-coral/20 text-coral',
  },
  {
    icon: '🏠',
    title: 'HomeGentic Advantage',
    desc: 'Blockchain-verified history, maintenance tracking, and AI-powered insights that build buyer confidence.',
    color: 'bg-cream text-brand',
  },
  {
    icon: '📍',
    title: 'Local Expertise',
    desc: 'Pelican Bay specialists with deep market knowledge, HOA experience, and community relationships.',
    color: 'bg-navy/10 text-navy',
  },
]

export default function WhyWilliamson() {
  return (
    <section id="sell" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-3">Why Choose Us</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight">
            More Than a Listing.{' '}
            <span className="text-teal">A Smarter Way To Sell.</span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            We combine expert real estate services with HomeGentic technology to give your property a competitive advantage.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 ${c.color}`}>
                {c.icon}
              </div>
              <h3 className="font-bold text-navy text-lg mb-2">{c.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-colors">
            Why It Matters →
          </a>
        </div>
      </div>
    </section>
  )
}
