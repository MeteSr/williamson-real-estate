'use client'
import { motion } from 'framer-motion'

const features = [
  { icon: '⛓️', title: 'Blockchain Verified', desc: 'Secure, tamper-proof property history.' },
  { icon: '🔧', title: 'Maintenance Tracking', desc: 'Log services, repairs, and improvements.' },
  { icon: '🤖', title: 'AI Maintenance Assistant', desc: 'Predicts needs and helps you plan ahead.' },
  { icon: '✅', title: 'Verified Contractors', desc: 'Trusted providers with reviewed history.' },
  { icon: '📋', title: 'Property History', desc: 'Complete digital record from day one.' },
  { icon: '📄', title: 'Smart Documentation', desc: 'Auto-organized records buyers can trust.' },
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
              <a
                href="https://homegentic.app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal hover:bg-teal-dark text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
              >
                See How It Works →
              </a>
              <a
                href="#contact"
                className="border border-white/30 hover:border-white text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
              >
                Learn More
              </a>
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
                <div className="text-2xl mb-3">{f.icon}</div>
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
