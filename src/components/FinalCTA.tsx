'use client'
import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl px-8 py-16 lg:px-20 lg:py-20 text-center"
          style={{ background: '#BF5700' }}
        >
          {/* Subtle dot texture */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '36px 36px' }}
          />

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
              Ready To See What<br className="hidden sm:block" /> Your Home Is Worth?
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
              Join hundreds of Pelican Bay homeowners who've trusted Williamson Real Estate for a smarter, more profitable sale.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#contact" className="btn btn-white">Get Home Value</a>
              <a href="#contact" className="btn btn-ghost">Schedule Consultation</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
