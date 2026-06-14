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
  const [price, setPrice]       = useState(1250000)
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
          <p className="text-teal text-sm font-semibold tracking-widest uppercase mb-4">
            Pelican Bay Real Estate Specialists
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-[1.08] mb-6">
            Sell Your Pelican Bay Home{' '}
            <span className="text-teal">For Less.</span>
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
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
            See How Much You Can Save
          </p>
          <p className="text-gray-600 text-sm mb-6">Our lower commission helps you keep thousands more.</p>

          {/* Price slider */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">Estimated Sale Price</label>
              <span className="text-lg font-bold text-navy">{fmt(price)}</span>
            </div>
            <input
              type="range"
              min={250000}
              max={3000000}
              step={25000}
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="w-full accent-teal h-2 rounded-full cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$250K</span><span>$3M</span>
            </div>
          </div>

          {/* Comparison rows */}
          <div className="space-y-3 mb-5">
            <CalcRow label="Traditional Commission (3%)" value={fmt(traditional)} muted />
            <CalcRow label="Williamson Real Estate (1.25%)" value={fmt(price * WILLIAMSON)} accent />
            {buyToggle && (
              <CalcRow label="Buy with Us Discount" value={`−$${BUY_DISCOUNT.toLocaleString()}`} discount />
            )}
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between items-center bg-teal/10 rounded-xl px-4 py-3">
                <span className="text-sm font-bold text-navy">You Save</span>
                <span className="text-2xl font-extrabold text-teal">{fmt(savings)}</span>
              </div>
            </div>
          </div>

          {/* Buy-with-us toggle */}
          <label className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3 mb-5 cursor-pointer select-none">
            <div className="relative mt-0.5 shrink-0">
              <input
                type="checkbox"
                checked={buyToggle}
                onChange={e => setBuyToggle(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-9 h-5 rounded-full transition-colors duration-200 ${buyToggle ? 'bg-teal' : 'bg-gray-300'}`} />
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${buyToggle ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <div>
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

function CalcRow({ label, value, muted, accent, discount }: { label: string; value: string; muted?: boolean; accent?: boolean; discount?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-sm ${muted ? 'text-gray-500' : 'text-gray-700 font-medium'}`}>{label}</span>
      <span className={`font-semibold ${accent ? 'text-teal' : discount ? 'text-teal' : 'text-gray-700'}`}>{value}</span>
    </div>
  )
}
