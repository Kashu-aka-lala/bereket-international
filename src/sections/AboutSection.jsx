import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AboutSection.css'

gsap.registerPlugin(ScrollTrigger)

const TRADE_ROUTES = [
    { x1: 300, y1: 150, x2: 520, y2: 200 },
    { x1: 520, y1: 200, x2: 680, y2: 160 },
    { x1: 300, y1: 150, x2: 180, y2: 200 },
    { x1: 180, y1: 200, x2: 100, y2: 230 },
    { x1: 520, y1: 200, x2: 600, y2: 280 },
    { x1: 300, y1: 150, x2: 340, y2: 270 },
    { x1: 340, y1: 270, x2: 430, y2: 310 },
    { x1: 430, y1: 310, x2: 520, y2: 290 },
]

const CITIES = [
    { x: 300, y: 150, label: 'Addis Ababa', primary: true },
    { x: 520, y: 200, label: 'Dubai' },
    { x: 680, y: 160, label: 'Mumbai' },
    { x: 180, y: 200, label: 'London' },
    { x: 100, y: 230, label: 'New York' },
    { x: 600, y: 280, label: 'Singapore' },
    { x: 340, y: 270, label: 'Nairobi' },
    { x: 430, y: 310, label: 'Johannesburg' },
]

export default function AboutSection() {
    const linesRef = useRef([])
    const { ref: sectionRef, inView } = useInView({ threshold: 0.2, triggerOnce: true })
    const cardRef = useRef()
    const mapRef = useRef()

    useEffect(() => {
        if (!inView) return

        // Animate the card from the left
        gsap.fromTo(cardRef.current,
            { opacity: 0, x: -60 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
        )

        // Animate the map from the right
        gsap.fromTo(mapRef.current,
            { opacity: 0, x: 60 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
        )

        // Animate each trade route line
        linesRef.current.forEach((line, i) => {
            if (!line) return
            const length = line.getTotalLength?.() || 200
            gsap.fromTo(line,
                { strokeDasharray: length, strokeDashoffset: length, opacity: 0 },
                {
                    strokeDashoffset: 0,
                    opacity: 1,
                    duration: 1.5,
                    delay: i * 0.15 + 0.5,
                    ease: 'power2.out',
                }
            )
        })
    }, [inView])

    return (
        <section id="about" ref={sectionRef} className="about-section">
            <div className="about-bg-glow" />
            <div className="container about-inner">

                {/* Left: Glass card */}
                <div ref={cardRef} className="about-card glass-card">
                    <span className="section-label">Our Story</span>
                    <h2 className="section-title">
                        Built on Trust,<br />
                        <span>Grown Globally</span>
                    </h2>
                    <div className="gold-divider" style={{ margin: '0 0 1.5rem' }} />
                    <p className="about-text">
                        Bereket Internationals is a premium global food and trading company dedicated to bringing the finest agricultural products from Ethiopia and around the world to partners in over 20 countries.
                    </p>
                    <p className="about-text" style={{ marginTop: '1rem' }}>
                        With a decade of experience in international trade, we bridge the gap between producers and markets — ensuring quality, consistency, and trust at every step of the supply chain.
                    </p>
                    <p className="about-text" style={{ marginTop: '1rem' }}>
                        Our extensive portfolio ranges from manufacturing staple food products, high-quality nutrition, and wellness lines, to supplying essential commodities globally. By integrating modern food technology with sustainable sourcing, we are committed to enriching the lives of communities across the world.
                    </p>

                    <div className="about-pillars">
                        {[
                            { icon: '🌾', title: 'Premium Quality', desc: 'Stringent quality control at every stage' },
                            { icon: '🌍', title: 'Global Reach', desc: 'Distribution network across 5 continents' },
                            { icon: '🤝', title: 'Trusted Partners', desc: '500+ long-term business relationships' },
                        ].map(({ icon, title, desc }) => (
                            <div key={title} className="about-pillar">
                                <span className="pillar-icon">{icon}</span>
                                <div>
                                    <h4 className="pillar-title">{title}</h4>
                                    <p className="pillar-desc">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: World map SVG */}
                <div ref={mapRef} className="about-map-wrapper glass">
                    <p className="map-label">Global Trade Network</p>
                    <svg viewBox="0 0 780 400" className="world-map-svg" xmlns="http://www.w3.org/2000/svg">
                        {/* Simplified continent blobs */}
                        <ellipse cx="150" cy="200" rx="90" ry="65" fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                        <ellipse cx="310" cy="170" rx="60" ry="50" fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                        <ellipse cx="350" cy="265" rx="75" ry="55" fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                        <ellipse cx="560" cy="175" rx="90" ry="60" fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                        <ellipse cx="650" cy="260" rx="60" ry="45" fill="rgba(212,175,55,0.06)" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5" />
                        <ellipse cx="710" cy="185" rx="40" ry="60" fill="rgba(212,175,55,0.04)" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" />

                        {/* Trade routes */}
                        {TRADE_ROUTES.map((route, i) => (
                            <line
                                key={i}
                                ref={el => linesRef.current[i] = el}
                                x1={route.x1} y1={route.y1}
                                x2={route.x2} y2={route.y2}
                                stroke="url(#routeGrad)"
                                strokeWidth="1.5"
                                strokeOpacity="0"
                                strokeLinecap="round"
                            />
                        ))}

                        {/* City dots */}
                        {CITIES.map(({ x, y, label, primary }) => (
                            <g key={label}>
                                <circle cx={x} cy={y} r={primary ? 5 : 3} fill={primary ? '#D4AF37' : '#2ECC71'} opacity={0.9} />
                                <circle cx={x} cy={y} r={primary ? 12 : 7} fill="transparent"
                                    stroke={primary ? 'rgba(212,175,55,0.4)' : 'rgba(46,204,113,0.3)'} strokeWidth="1" />
                                <text x={x + (primary ? 8 : 6)} y={y - 6} fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="Outfit,sans-serif">
                                    {label}
                                </text>
                            </g>
                        ))}

                        <defs>
                            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                                <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#2ECC71" stopOpacity="0.5" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

            </div>
        </section>
    )
}
