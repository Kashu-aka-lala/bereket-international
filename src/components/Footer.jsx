import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import './Footer.css'

export default function Footer() {
    const year = 2026

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <footer className="footer">
            <div className="footer-glow" />
            <div className="container footer-inner">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <img src={logo} alt="Bereket International" className="footer-logo-img" />
                        <div className="footer-logo-wordmark">
                            <span className="footer-logo-text">Bereket</span>
                            <span className="footer-logo-int">Internationals</span>
                        </div>
                    </div>
                    <p className="footer-tagline">Global Quality. Trusted Worldwide.</p>
                    <p className="footer-about">
                        Premier global food & commodity trading company, connecting producers and markets across 20+ countries with integrity and excellence.
                    </p>
                    <div className="footer-socials">
                        {['LinkedIn', 'Instagram', 'Twitter', 'YouTube'].map(s => (
                            <a key={s} href="#" className="social-pill" aria-label={s}>{s[0]}</a>
                        ))}
                    </div>
                </div>

                <div className="footer-links-group">
                    <h4>Quick Links</h4>
                    <ul>
                        {[
                            ['/', 'Home'],
                            ['/about', 'About'],
                            ['/products', 'Products'],
                            ['/why-us', 'Why Us'],
                            ['/trusted-partners', 'Trusted Partners'],
                            ['/contact', 'Contact'],
                        ].map(([href, label]) => (
                            <li key={href}>
                                <Link to={href}>{label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>



                <div className="footer-links-group">
                    <h4>Contact</h4>
                    <ul className="footer-contact-list">
                        <li>🏢 3rd Floor, 13-Plaza, Bahria Town Phase 8, Islamabad, Pakistan</li>
                        <li>🌐 Suite 205, 40 Hunt Street, Ajax, ON L1S 3M2, Canada</li>
                        <li>📞 +92 333 564 7799</li>
                        <li>📧 info@bereketfoods.com</li>
                        <li>📧 info@bereketnaturals.com</li>
                        <li>⏰ Mon–Sat, 9am–6pm PKT</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-line" />
                <div className="container footer-bottom-inner">
                    <p>© {year} Bereket Internationals. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
