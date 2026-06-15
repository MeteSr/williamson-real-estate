export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-24 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="font-extrabold text-2xl leading-none text-[#BF5700]" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>W</span>
              <div className="leading-tight">
                <div className="text-sm font-extrabold tracking-tight">WILLIAMSON</div>
                <div className="text-[10px] text-white/50 tracking-widest uppercase">Real Estate</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Your Pelican Bay Real Estate Experts. Full-service marketing with unbeatable savings.
            </p>
            <p className="text-white/40 text-xs mt-4">
              Managing Broker: Demetrius L. Williamson, Sr.<br />License: BK3301934
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {['Sell Your Home', 'Buy a Home', 'Savings Calculator', 'HomeGentic', 'Contact Us'].map(l => (
                <li key={l}><a href="#contact" className="text-white/70 hover:text-white text-sm transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href="tel:+13868527207" className="hover:text-white transition-colors">(386) 852-7207</a></li>
              <li><a href="mailto:info@sellingpelicanbay.com" className="hover:text-white transition-colors">info@sellingpelicanbay.com</a></li>
              <li>813 Pelican Bay Drive<br />Daytona Beach, FL 32119</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">© 2026 Williamson Real Estate, LLC. Licensed Real Estate Broker · Florida.</p>
          <div className="flex items-center gap-1.5 text-white/40 text-xs">
            <span>⊙</span>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
