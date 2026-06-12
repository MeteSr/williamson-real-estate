'use client'
import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal via-teal/80 to-coral" />
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-4">Ready to Get Started?</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready To See What Your Home Is Worth?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Join hundreds of Pelican Bay homeowners who've trusted Williamson Real Estate for a smarter, more profitable sale.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="bg-white text-teal-dark font-bold px-8 py-4 rounded-full text-sm hover:bg-white/90 transition-colors shadow-lg"
            >
              Get Home Value
            </a>
            <a
              href="#contact"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-full text-sm hover:bg-white/10 transition-colors"
            >
              Schedule Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
