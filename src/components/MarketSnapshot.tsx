'use client'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Median Sale Price', value: '$280K' },
  { label: 'Avg Days on Market', value: '78' },
  { label: 'Homes Sold', value: '7' },
  { label: 'Sale-to-List Ratio', value: '95.5%' },
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
              <p className="text-gray-400 text-sm mt-1">Update for May 2026</p>
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
              </motion.div>
            ))}
          </div>

          <div className="bg-navy rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-bold text-lg">Ready to see what your home is worth?</p>
              <p className="text-white/60 text-sm mt-0.5">Get a free, no-obligation home valuation.</p>
            </div>
            <a href="#contact" className="btn btn-sm btn-primary shrink-0 border border-white">Get My Home Value</a>
          </div>

        </div>
      </div>
    </section>
  )
}
