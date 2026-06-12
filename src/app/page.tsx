import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WhyWilliamson from '@/components/WhyWilliamson'
import HomeGentic from '@/components/HomeGentic'
import Testimonials from '@/components/Testimonials'
import RecentSales from '@/components/RecentSales'
import MarketSnapshot from '@/components/MarketSnapshot'
import Contact from '@/components/Contact'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import MobileBar from '@/components/MobileBar'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhyWilliamson />
        <HomeGentic />
        <Testimonials />
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16">
            <RecentSales />
            <MarketSnapshot />
          </div>
        </div>
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
