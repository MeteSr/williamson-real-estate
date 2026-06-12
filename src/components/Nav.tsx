'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Sell', 'Buy', 'Neighborhoods', 'HomeGentic', 'Resources', 'About']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <Image src="/williamson_realestate_logo.png" alt="Williamson Real Estate" width={32} height={48} className="h-8 w-auto" />
          <div className="leading-tight">
            <div className={`text-sm font-800 tracking-tight ${scrolled ? 'text-navy' : 'text-white'}`}>WILLIAMSON</div>
            <div className={`text-[10px] font-500 tracking-widest uppercase ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>Real Estate</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`text-sm font-medium transition-colors hover:text-teal ${
                scrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+12392480900"
            className={`text-sm font-medium flex items-center gap-1.5 ${scrolled ? 'text-gray-700' : 'text-white'}`}
          >
            <PhoneIcon />
            (239) 248-0900
          </a>
          <a href="#contact" className="btn btn-sm btn-cta">
            Get Home Value
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
        >
          <span className={`block w-5 h-0.5 mb-1 transition-colors ${scrolled ? 'bg-navy' : 'bg-white'}`} />
          <span className={`block w-5 h-0.5 mb-1 transition-colors ${scrolled ? 'bg-navy' : 'bg-white'}`} />
          <span className={`block w-5 h-0.5 transition-colors ${scrolled ? 'bg-navy' : 'bg-white'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3"
          >
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-gray-700 font-medium py-1" onClick={() => setOpen(false)}>
                {l}
              </a>
            ))}
            <a href="#contact" className="btn btn-cta w-full mt-2" onClick={() => setOpen(false)}>
              Get Home Value
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.12 6.12l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.22z"/>
    </svg>
  )
}
