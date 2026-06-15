'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const TRADITIONAL   = 0.03
const WILLIAMSON    = 0.0125
const BUY_DISCOUNT  = 1000

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString()
}

export default function Hero() {
  const [price, setPrice]       = useState(400000)
  const [buyToggle, setBuyToggle] = useState(false)

  const traditional = price * TRADITIONAL
  const williamson  = price * WILLIAMSON - (buyToggle ? BUY_DISCOUNT : 0)
  const savings     = traditional - williamson

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/pelican_bay_ariel.PNG"
          alt="Aerial view of Pelican Bay, Daytona Beach"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/80 via-navy/60 to-teal/30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-white text-sm font-semibold tracking-widest uppercase mb-4">
            Pelican Bay Real Estate Specialists
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.08] mb-6">
            Sell Your Pelican Bay Home{' '}
            <span className="text-coral">For Less.</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
            Full-service marketing, expert negotiation, and unbeatable savings.
            Keep more of your equity where it belongs—with you.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">See My Savings</a>
            <a href="#contact" className="btn btn-ghost">Book a Home Valuation</a>
          </div>
        </motion.div>

        {/* Floating calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
        >
          {/* Card header: icon + headline left, price right */}
          <div className="flex items-start justify-between mb-5 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D2149" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-1">See How Much You Can Save</p>
                <p className="text-gray-800 font-bold text-base leading-snug">Our lower commission helps<br className="hidden sm:block" /> you keep thousands more.</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-gray-400 mb-0.5">Estimated Sale Price</p>
              <span className="text-2xl font-extrabold text-navy">{fmt(price)}</span>
            </div>
          </div>

          {/* Price slider */}
          <div className="mb-6">
            <input
              type="range"
              min={250000}
              max={1000000}
              step={25000}
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="w-full accent-teal h-2 rounded-full cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$250K</span><span>$1M</span>
            </div>
          </div>

          {/* Comparison rows */}
          <div className="mb-5">
            <CalcRow label="Traditional Commission (3%)" value={fmt(traditional)} />
            <CalcRow label="Williamson Real Estate (1.25%)" value={fmt(williamson)} accent />
            <div className="pt-3">
              <div className="flex justify-between items-center bg-teal/10 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal/20 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D2149" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-navy">You Save</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-extrabold text-teal">{fmt(savings)}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
                    <path d="M12 2l1.5 4.5H18l-3.75 2.73 1.43 4.4L12 11.1l-3.68 2.53 1.43-4.4L6 6.5h4.5z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Buy-with-us toggle */}
          <label className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 mb-5 cursor-pointer select-none">
            <div className="relative shrink-0">
              <input
                type="checkbox"
                checked={buyToggle}
                onChange={e => setBuyToggle(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-9 h-5 rounded-full transition-colors duration-200 ${buyToggle ? 'bg-teal' : 'bg-gray-300'}`} />
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${buyToggle ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy leading-tight">Buy with Us — Save an Extra $1,000</p>
              <p className="text-xs text-gray-500 mt-0.5">Use us as your buying agent on your next purchase.</p>
            </div>
          </label>

          <a href="#contact" className="btn btn-cta w-full">Calculate My Savings →</a>
        </motion.div>
      </div>
    </section>
  )
}

function CalcRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
      <div className="flex items-center gap-2.5">
        <span className={`w-3 h-3 rounded-full shrink-0 ${accent ? 'bg-teal' : 'bg-gray-300'}`} />
        <span className={`text-sm ${accent ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>{label}</span>
      </div>
      <span className={`font-semibold ${accent ? 'text-teal' : 'text-gray-700'}`}>{value}</span>
    </div>
  )
}
