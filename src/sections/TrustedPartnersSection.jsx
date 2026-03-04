import { useEffect, useRef, useState } from 'react'
import './TrustedPartnersSection.css'

// Import all alliance logos
import binHashim from '../assets/alliances/bin hashim.png'
import binSafeer from '../assets/alliances/bin safeer.jfif'
import chasePlus from '../assets/alliances/chase plus.png'
import cloudTenants from '../assets/alliances/cloud_tenants.png'
import daraz from '../assets/alliances/daraz.png'
import dawoodMart from '../assets/alliances/dawood mart.png'
import esajee from '../assets/alliances/esajee.jfif'
import greenvalley from '../assets/alliances/geenvalley.jfif'
import hatim from '../assets/alliances/hatim.jfif'
import hbk from '../assets/alliances/hbk.png'
import homePlus from '../assets/alliances/home plus.png'
import ideal from '../assets/alliances/ideal.jfif'
import jalalsons from '../assets/alliances/jalalsons.webp'
import jebChaho from '../assets/alliances/jeb chaho.png'
import magnet from '../assets/alliances/magnet.png'
import mds from '../assets/alliances/mds.png'
import memon from '../assets/alliances/memon.jfif'
import moon from '../assets/alliances/moon.png'
import nazarJan from '../assets/alliances/nazar jan.avif'
import needs from '../assets/alliances/needs.jfif'
import pandaMart from '../assets/alliances/panda mart.jfif'
import pharmagen from '../assets/alliances/pharmagen.png'
import rahimStores from '../assets/alliances/rahim stores.jfif'
import rajaSahab from '../assets/alliances/raja sahab.png'
import saudaSalaf from '../assets/alliances/sauda salaf.jfif'
import savers from '../assets/alliances/savers.png'
import shaheen from '../assets/alliances/shaheen.png'
import spar from '../assets/alliances/spar.png'
import talian from '../assets/alliances/talian.png'
import umer from '../assets/alliances/umer.jfif'
import zamanAndSons from '../assets/alliances/zaman and sons.jfif'

const partners = [
    { name: 'Bin Hashim', logo: binHashim },
    { name: 'Bin Safeer', logo: binSafeer },
    { name: 'Chase Plus', logo: chasePlus },
    { name: 'Cloud Tenants', logo: cloudTenants },
    { name: 'Daraz Mall', logo: daraz },
    { name: 'Dawood Mart', logo: dawoodMart },
    { name: 'Esajee', logo: esajee },
    { name: 'Greenvalley', logo: greenvalley },
    { name: 'Hatim', logo: hatim },
    { name: 'HBK', logo: hbk },
    { name: 'Home Plus', logo: homePlus },
    { name: 'Ideal', logo: ideal },
    { name: 'Jalalsons', logo: jalalsons },
    { name: 'Jeb Chaho', logo: jebChaho },
    { name: 'Magnet', logo: magnet },
    { name: 'MDS', logo: mds },
    { name: 'Memon', logo: memon },
    { name: 'Moon', logo: moon },
    { name: 'Nazar Jan', logo: nazarJan },
    { name: 'Needs', logo: needs },
    { name: 'Panda Mart', logo: pandaMart },
    { name: 'Pharmagen Limited', logo: pharmagen },
    { name: 'Rahim Stores', logo: rahimStores },
    { name: 'Raja Sahab', logo: rajaSahab },
    { name: 'Sauda Salaf', logo: saudaSalaf },
    { name: 'Savers', logo: savers },
    { name: 'Shaheen', logo: shaheen },
    { name: 'Spar', logo: spar },
    { name: 'Talian', logo: talian },
    { name: 'Umer', logo: umer },
    { name: 'Zaman & Sons', logo: zamanAndSons },
]

// Particle config
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: (Math.random() * 6 + 6).toFixed(1),
    delay: (Math.random() * 6).toFixed(1),
}))

// Animated counter hook
function useCounter(target, duration = 1800, trigger) {
    const [value, setValue] = useState(0)
    useEffect(() => {
        if (!trigger) return
        let start = null
        const step = (ts) => {
            if (!start) start = ts
            const progress = Math.min((ts - start) / duration, 1)
            setValue(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [trigger, target, duration])
    return value
}

export default function TrustedPartnersSection() {
    const cardsRef = useRef([])
    const statsRef = useRef(null)
    const [statsVisible, setStatsVisible] = useState(false)

    const count31 = useCounter(31, 1600, statsVisible)
    const count100 = useCounter(100, 1800, statsVisible)
    const count10000 = useCounter(10000, 2000, statsVisible)

    useEffect(() => {
        // Card entrance observer
        const cardObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.08 }
        )
        cardsRef.current.forEach((el) => el && cardObserver.observe(el))

        // Stats counter observer
        const statsObserver = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setStatsVisible(true)
                    statsObserver.disconnect()
                }
            },
            { threshold: 0.3 }
        )
        if (statsRef.current) statsObserver.observe(statsRef.current)

        return () => {
            cardObserver.disconnect()
            statsObserver.disconnect()
        }
    }, [])

    // Duplicate logos for seamless marquee loop
    const marqueeLogos = [...partners, ...partners]

    return (
        <section className="tp-section">
            {/* Hero banner */}
            <div className="tp-hero">
                <div className="tp-hero-glow" />

                {/* Floating particles */}
                <div className="tp-particles">
                    {PARTICLES.map((p) => (
                        <span
                            key={p.id}
                            className="tp-particle"
                            style={{
                                width: p.size,
                                height: p.size,
                                left: `${p.left}%`,
                                top: `${p.top}%`,
                                '--dur': `${p.dur}s`,
                                '--delay': `${p.delay}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="tp-hero-content">
                    <p className="tp-hero-eyebrow">Our Network</p>
                    <h1 className="tp-hero-title">Trusted Partners</h1>
                    <p className="tp-hero-sub">
                        A growing alliance of retail leaders, distributors, and trade channels
                        that bring Bereket products to every corner of the market.
                    </p>
                    <div className="tp-hero-line" />
                </div>
            </div>

            {/* Marquee ticker */}
            <div className="tp-marquee-wrapper">
                <div className="tp-marquee-track">
                    {marqueeLogos.map((p, i) => (
                        <div className="tp-marquee-logo" key={`${p.name}-${i}`} title={p.name}>
                            <img src={p.logo} alt={p.name} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats bar */}
            <div className="tp-stats" ref={statsRef}>
                <div className="tp-stat">
                    <span className="tp-stat-num">{count31}+</span>
                    <span className="tp-stat-label">Alliance Partners</span>
                </div>
                <div className="tp-stat-divider" />
                <div className="tp-stat">
                    <span className="tp-stat-num">{count100}+</span>
                    <span className="tp-stat-label">Cities Covered</span>
                </div>
                <div className="tp-stat-divider" />
                <div className="tp-stat">
                    <span className="tp-stat-num">{(count10000 / 1000).toFixed(0)}K+</span>
                    <span className="tp-stat-label">Retail Touchpoints</span>
                </div>
            </div>

            {/* Partners grid */}
            <div className="tp-grid-wrapper">
                <div className="tp-grid">
                    {partners.map((p, i) => (
                        <div
                            key={p.name}
                            className="tp-card"
                            ref={(el) => (cardsRef.current[i] = el)}
                            style={{ transitionDelay: `${(i % 6) * 70}ms` }}
                        >
                            <div className="tp-card-inner">
                                <div className="tp-logo-wrap">
                                    <img src={p.logo} alt={p.name} className="tp-logo" />
                                </div>
                                <span className="tp-card-name">{p.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="tp-cta">
                <h2 className="tp-cta-title">Become a Partner</h2>
                <p className="tp-cta-sub">
                    Join our alliance of market leaders and grow together with Bereket International.
                </p>
                <a href="/contact" className="tp-cta-btn">Apply for Partnership</a>
            </div>
        </section>
    )
}
