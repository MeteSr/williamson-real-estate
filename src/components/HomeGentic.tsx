'use client'
import { motion } from 'framer-motion'

const features = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="7" height="11"/><rect x="15" y="11" width="7" height="11"/><rect x="8" y="7" width="8" height="7"/><rect x="2" y="14" width="7" height="8"/><rect x="15" y="2" width="7" height="8"/></svg>,
    title: 'Blockchain Verified',
    desc: 'Secure, tamper-proof property history.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    title: 'Maintenance Tracking',
    desc: 'Log services, repairs, and improvements.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>,
    title: 'AI Maintenance Assistant',
    desc: 'Predicts needs and helps you plan ahead.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    title: 'Verified Contractors',
    desc: 'Trusted providers with reviewed history.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    title: 'Property History',
    desc: 'Complete digital record from day one.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    title: 'Smart Documentation',
    desc: 'Auto-organized records buyers can trust.',
  },
]

export default function HomeGentic() {
  return (
    <section id="homegentic" className="bg-navy py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-3">Exclusive to Williamson Clients</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
              Why HomeGentic Changes Everything
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Every property we list comes with a HomeGentic Property Record—verified,
              secure, and built to increase trust and value. Buyers get confidence.
              You get a faster, stronger sale.
            </p>
            <div className="flex gap-4">
              <a href="https://homegentic.app" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                See How It Works →
              </a>
              <a href="#contact" className="btn btn-ghost">Learn More</a>
            </div>
          </motion.div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-5 transition-colors"
              >
                <div className="mb-3 text-teal/80">{f.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
