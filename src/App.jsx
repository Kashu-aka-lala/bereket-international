import { useState } from 'react'
import IntroScene from './components/IntroScene'
import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ProductsSection from './sections/ProductsSection'
import WhyChooseUs from './sections/WhyChooseUs'
import ContactSection from './sections/ContactSection'
import Footer from './components/Footer'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {!introComplete && <IntroScene onComplete={() => setIntroComplete(true)} />}
      {introComplete && (
        <div className="main-site">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ProductsSection />
          <WhyChooseUs />
          <ContactSection />
          <Footer />
        </div>
      )}
    </>
  )
}
