'use client'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Average Sale Price', value: '$1.98M', change: '+4.4% vs Apr 2024', up: true },
  { label: 'Average Days on Market', value: '28', change: '-5 days vs Apr 2024', up: true },
  { label: 'New Listings', value: '42', change: '+1.2% vs Apr 2024', up: true },
  { label: 'List-to-Sale Ratio', value: '96%', change: '+2% vs Apr 2024', up: true },
]

export default function MarketSnapshot() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-3xl px-8 py-14 lg:px-16 lg:py-16">

          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-2">Market Data</p>
              <h2 className="text-3xl font-extrabold text-navy">Pelican Bay Market Snapshot</h2>
              <p className="text-gray-400 text-sm mt-1">Update for May 2025</p>
            </div>
            <a href="#contact" className="text-teal text-sm font-semibold hover:underline hidden sm:block">View Full Report →</a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-card"
              >
                <p className="text-gray-400 text-xs mb-2">{s.label}</p>
                <p className="text-3xl font-extrabold text-navy mb-1">{s.value}</p>
                <p className={`text-xs font-medium ${s.up ? 'text-teal' : 'text-coral'}`}>{s.change}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-navy rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-bold text-lg">Ready to see what your home is worth?</p>
              <p className="text-white/60 text-sm mt-0.5">Get a free, no-obligation home valuation.</p>
            </div>
            <a href="#contact" className="btn btn-sm btn-primary shrink-0">Get My Home Value</a>
          </div>

        </div>
      </div>
    </section>
  )
}
