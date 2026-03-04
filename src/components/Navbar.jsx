import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import './Navbar.css'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [divisionsOpen, setDivisionsOpen] = useState(false)
    const divisionsRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close dropdown + mobile menu on route change
    useEffect(() => {
        setMenuOpen(false)
        setDivisionsOpen(false)
        window.scrollTo(0, 0)
    }, [location.pathname])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClick = (e) => {
            if (divisionsRef.current && !divisionsRef.current.contains(e.target)) {
                setDivisionsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const isActive = (path) => location.pathname === path ? 'active-link' : ''

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-inner">
                {/* Logo */}
                <Link to="/" className="nav-logo">
                    <img src={logo} alt="Bereket International" className="nav-logo-img" />
                    <div className="nav-logo-text">
                        <span className="nav-logo-name">Bereket</span>
                        <span className="nav-logo-sub">International</span>
                    </div>
                </Link>

                {/* Nav links */}
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li>
                        <Link to="/" className={isActive('/')}>Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className={isActive('/about')}>About</Link>
                    </li>
                    <li>
                        <Link to="/products" className={isActive('/products')}>Products</Link>
                    </li>

                    {/* ── Our Divisions dropdown ── */}
                    <li ref={divisionsRef} className="nav-dropdown-parent">
                        <button
                            className={`nav-dropdown-trigger ${divisionsOpen ? 'active' : ''} ${isActive('/divisions')}`}
                            onClick={() => setDivisionsOpen(o => !o)}
                            aria-expanded={divisionsOpen}
                        >
                            Our Divisions
                            <span className={`nav-chevron ${divisionsOpen ? 'open' : ''}`}>▾</span>
                        </button>

                        <div className={`nav-dropdown ${divisionsOpen ? 'open' : ''}`}>
                            <button
                                className="nav-dropdown-item"
                                onClick={() => { navigate('/divisions#food'); setDivisionsOpen(false) }}
                            >
                                <span className="nav-dropdown-item-icon">🌾</span>
                                <div>
                                    <span className="nav-dropdown-item-title">Bereket Foods</span>
                                    <span className="nav-dropdown-item-sub">Food &amp; Nutrition</span>
                                </div>
                            </button>
                            <button
                                className="nav-dropdown-item"
                                onClick={() => { navigate('/divisions#beauty'); setDivisionsOpen(false) }}
                            >
                                <span className="nav-dropdown-item-icon">✨</span>
                                <div>
                                    <span className="nav-dropdown-item-title">Bereket Naturals</span>
                                    <span className="nav-dropdown-item-sub">Beauty &amp; Cosmetics</span>
                                </div>
                            </button>
                        </div>
                    </li>

                    <li>
                        <Link to="/why-us" className={isActive('/why-us')}>Why Us</Link>
                    </li>
                    <li>
                        <Link to="/trusted-partners" className={isActive('/trusted-partners')}>Trusted Partners</Link>
                    </li>
                    <li>
                        <Link to="/contact" className={isActive('/contact')}>Contact</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="nav-cta">Get in Touch</Link>
                    </li>
                </ul>

                <button
                    className={`hamburger ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Menu"
                >
                    <span /><span /><span />
                </button>
            </div>
        </nav>
    )
}
