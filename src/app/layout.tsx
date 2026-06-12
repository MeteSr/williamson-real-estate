import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Williamson Real Estate — Pelican Bay Real Estate Experts',
  description: 'Full-service marketing, expert negotiation, and unbeatable savings. Your Pelican Bay real estate specialists.',
  metadataBase: new URL('https://www.sellingpelicanbay.com'),
  openGraph: {
    title: 'Williamson Real Estate — Pelican Bay Real Estate Experts',
    description: 'Full-service marketing, expert negotiation, and unbeatable savings.',
    url: 'https://www.sellingpelicanbay.com',
    siteName: 'Williamson Real Estate',
    images: [{ url: '/pelican_bay_sign.jpg' }],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
