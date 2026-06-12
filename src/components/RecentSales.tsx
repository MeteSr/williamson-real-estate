'use client'
import { motion } from 'framer-motion'

const sales = [
  { address: '5761 Baltusrol Ct', price: '$2,425,000', dom: 9, img: '/pelican_bay_sign.jpg' },
  { address: '6523 Highcroft Dr', price: '$1,875,000', dom: 11, img: '/pelican_bay_ariel.PNG' },
  { address: '7047 Ayrshire Ln',  price: '$3,150,000', dom: 7,  img: '/pelican_bay_sign.jpg' },
]

export default function RecentSales() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-navy">Recent Sales in Pelican Bay</h2>
        <a href="#contact" className="text-teal text-sm font-semibold hover:underline">View All Sales →</a>
      </div>
      <div className="space-y-4">
        {sales.map((s, i) => (
          <motion.div
            key={s.address}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-card hover:shadow-md transition-shadow"
          >
            <div className="relative w-28 shrink-0">
              <img src={s.img} alt={s.address} className="w-full h-full object-cover" />
              <span className="absolute top-2 left-2 bg-teal text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                SOLD
              </span>
            </div>
            <div className="py-4 pr-4 flex flex-col justify-center">
              <p className="font-bold text-navy text-sm">{s.address}</p>
              <p className="text-gray-400 text-xs mb-2">Pelican Bay, Daytona Beach, FL</p>
              <p className="text-2xl font-extrabold text-teal">{s.price}</p>
              <p className="text-gray-400 text-xs mt-1">{s.dom} Days on Market</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
