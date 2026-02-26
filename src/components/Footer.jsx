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
                        <span className="footer-logo-b">B</span>
                        <span className="footer-logo-text">ereket <span className="footer-logo-int">Internationals</span></span>
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
                            ['hero', 'Home'], ['about', 'About'], ['products', 'Products'], ['why-us', 'Why Us'], ['contact', 'Contact']
                        ].map(([id, label]) => (
                            <li key={id}>
                                <button onClick={() => scrollTo(id)}>{label}</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer-links-group">
                    <h4>Products</h4>
                    <ul>
                        {['Premium Rice', 'Wheat & Flour', 'Cooking Oil', 'Spices', 'Pulses & Legumes'].map(p => (
                            <li key={p}><button onClick={() => scrollTo('products')}>{p}</button></li>
                        ))}
                    </ul>
                </div>

                <div className="footer-links-group">
                    <h4>Contact</h4>
                    <ul className="footer-contact-list">
                        <li>📍 Addis Ababa, Ethiopia</li>
                        <li>📧 trade@bereketintl.com</li>
                        <li>📞 +251 911 000 000</li>
                        <li>⏰ Mon–Fri, 8am–6pm EAT</li>
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
