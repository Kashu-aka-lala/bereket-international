import { useEffect, useRef, useState } from 'react'
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
                    <span className="logo-b">B</span>
                    <span className="logo-text">ereket<span className="logo-int"> Internationals</span></span>
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
