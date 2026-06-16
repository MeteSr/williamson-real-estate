'use client'
import { motion } from 'framer-motion'

const cards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    title: 'Full-Service Marketing',
    desc: 'Professional photos, video, staging guidance, and targeted digital exposure to attract premium buyers.',
    iconBg: 'bg-teal/10 text-teal',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    title: 'Unbeatable Savings',
    desc: 'Lower commission means bigger results. More in your pocket—without compromising service.',
    iconBg: 'bg-coral/15 text-coral',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'HomeGentic Advantage',
    desc: 'Blockchain-verified history, maintenance tracking, and AI-powered insights that build buyer confidence.',
    iconBg: 'bg-brand/10 text-brand',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Local Expertise',
    desc: 'Pelican Bay specialists with deep market knowledge, HOA experience, and community relationships.',
    iconBg: 'bg-navy/10 text-navy',
  },
]

export default function WhyWilliamson() {
  return (
    <section id="sell" className="bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-3xl px-8 py-14 lg:px-16 lg:py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-3">Why Pelican Bay Owners Choose Us</p>
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
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${c.iconBg}`}>
                {c.icon}
              </div>

              <h3 className="font-bold text-navy text-lg mb-2">{c.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contact" className="btn btn-primary">Get in Touch →</a>
        </div>
        </div>{/* end container */}
      </div>
    </section>
  )
}
