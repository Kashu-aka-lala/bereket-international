import { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.jpg'
import './Navbar.css'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const navRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    return (
        <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-inner">
                <div className="nav-logo" onClick={() => scrollTo('hero')}>
                    <img src={logo} alt="Bereket International" className="nav-logo-img" />
                    <div className="nav-logo-text">
                        <span className="nav-logo-name">Bereket</span>
                        <span className="nav-logo-sub">International</span>
                    </div>
                </div>

                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {['hero', 'about', 'products', 'why-us', 'contact'].map((id, i) => (
                        <li key={id}>
                            <button onClick={() => scrollTo(id)}>{['Home', 'About', 'Products', 'Why Us', 'Contact'][i]}</button>
                        </li>
                    ))}
                    <li>
                        <button className="nav-cta" onClick={() => scrollTo('contact')}>Get in Touch</button>
                    </li>
                </ul>

                <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
                    <span /><span /><span />
                </button>
            </div>
        </nav>
    )
}
