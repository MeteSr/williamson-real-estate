import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Williamson Real Estate — Pelican Bay Real Estate Experts',
  description: 'Sell your Pelican Bay, Daytona Beach home for less. Full-service marketing, expert negotiation, and a 1.25% listing fee. Get a free home valuation today.',
  metadataBase: new URL('https://www.sellingpelicanbay.com'),
  openGraph: {
    title: 'Williamson Real Estate — Pelican Bay Real Estate Experts',
    description: 'Sell your Pelican Bay, Daytona Beach home for less. Full-service marketing, expert negotiation, and a 1.25% listing fee.',
    url: 'https://www.sellingpelicanbay.com',
    siteName: 'Williamson Real Estate',
    images: [{ url: '/pelican_bay_sign.jpg', width: 1200, height: 630, alt: 'Williamson Real Estate — Pelican Bay, Daytona Beach' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Williamson Real Estate — Pelican Bay Real Estate Experts',
    description: 'Sell your Pelican Bay, Daytona Beach home for less. Full-service marketing and a 1.25% listing fee.',
    images: ['/pelican_bay_sign.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Williamson Real Estate',
  url: 'https://www.sellingpelicanbay.com',
  telephone: '+13868527207',
  email: 'info@sellingpelicanbay.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '813 Pelican Bay Drive',
    addressLocality: 'Daytona Beach',
    addressRegion: 'FL',
    postalCode: '32119',
    addressCountry: 'US',
  },
  areaServed: { '@type': 'Place', name: 'Pelican Bay, Daytona Beach, FL' },
  description: 'Full-service real estate brokerage specializing in Pelican Bay, Daytona Beach. Listing fee of 1.25% vs. the traditional 3%.',
  employee: {
    '@type': 'Person',
    name: 'Demetrius L. Williamson, Sr.',
    jobTitle: 'Managing Broker',
    telephone: '+13868527207',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
