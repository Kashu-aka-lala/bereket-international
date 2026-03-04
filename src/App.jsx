import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import IntroScene from './components/IntroScene'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import DivisionsPage from './pages/DivisionsPage'
import WhyUsPage from './pages/WhyUsPage'
import ContactPage from './pages/ContactPage'
import TrustedPartnersPage from './pages/TrustedPartnersPage'
import ProductsPage from './pages/ProductsPage'

import './App.css'

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {!introComplete && <IntroScene onComplete={() => setIntroComplete(true)} />}
      {introComplete && (
        <div className="main-site">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/divisions" element={<DivisionsPage />} />
            <Route path="/why-us" element={<WhyUsPage />} />
            <Route path="/trusted-partners" element={<TrustedPartnersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  )
}
