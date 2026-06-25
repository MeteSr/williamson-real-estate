import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WhyWilliamson from '@/components/WhyWilliamson'
import MarketSnapshot from '@/components/MarketSnapshot'
import Testimonials from '@/components/Testimonials'
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
        <MarketSnapshot />
        <Testimonials />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
