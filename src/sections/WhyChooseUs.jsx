import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import './WhyChooseUs.css'

const STATS = [
    { num: 200, suffix: '+', label: 'Happy Clients', icon: '🤝', tagline: 'National and international 200+ clients', color: '#5B8DEF' },
    { num: 7, suffix: '', label: 'Product Brands', icon: '🏷️', tagline: 'Distinct Bereket food brands exported', color: '#9B59B6' },
]

const FEATURES = [
    {
        icon: '✈️',
        title: 'Global Logistics',
        desc: 'Door-to-door export management with tracking from warehouse to destination port.',
        color: '#D4AF37',
    },
    {
        icon: '🔬',
        title: 'Nutritionally Fortified',
        desc: 'Our food products are packed with extra vitamins and minerals so you get more health benefits in every bite.',
        color: '#2ECC71',
    },
    {
        icon: '📦',
        title: 'Custom Packaging',
        desc: 'Bespoke private-label packaging and branding options for wholesale buyers.',
        color: '#E8A020',
    },
    {
        icon: '💰',
        title: 'Competitive Pricing',
        desc: 'Direct sourcing partnerships mean better prices without compromising quality.',
        color: '#C8A96E',
    },
    {
        icon: '🛡️',
        title: 'DRAP Approved',
        desc: 'Our digestive and wellness products are certified by the Drug Regulatory Authority of Pakistan (DRAP), meaning they are safe, tested, and genuinely effective.',
        color: '#9B59B6',
    },
    {
        icon: '📞',
        title: '24/7 Support',
        desc: 'Dedicated account managers available around the clock for every client.',
        color: '#D4AF37',
    },
]

function AnimatedCounter({ target, suffix, isVisible }) {
    const ref = useRef()
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!isVisible) return
        const obj = { val: 0 }
        gsap.to(obj, {
            val: target,
            duration: 2.2,
            ease: 'power2.out',
            delay: 0.3,
            onUpdate: () => setValue(Math.round(obj.val)),
        })
    }, [isVisible, target])

    return (
        <span ref={ref} className="stat-counter">
            {value}{suffix}
        </span>
    )
}

export default function WhyChooseUs() {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <section id="why-us" ref={ref} className="why-section">
            <div className="why-bg-glow" />
            <div className="container">
                <div className="why-header">
                    <span className="section-label">Why Partner With Us</span>
                    <h2 className="section-title">
                        The Bereket<br />
                        <span>Advantage</span>
                    </h2>
                    <div className="gold-divider" />
                    <p className="why-subtitle">
                        A decade of excellence in global food trade — here's what sets us apart.
                    </p>
                </div>

                {/* Stats Row */}
                <div className="stats-row">
                    {STATS.map(({ num, suffix, label, icon, tagline, color }, i) => (
                        <div
                            key={label}
                            className={`stat-card glass-card ${inView ? 'visible' : ''}`}
                            style={{ transitionDelay: `${i * 0.15}s`, '--stat-color': color }}
                        >
                            <span className="stat-card-icon">{icon}</span>
                            <AnimatedCounter target={num} suffix={suffix} isVisible={inView} />
                            <span className="stat-card-label">{label}</span>
                            <span className="stat-card-tagline">{tagline}</span>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div className="features-grid">
                    {FEATURES.map(({ icon, title, desc, color }, i) => (
                        <div
                            key={title}
                            className={`feature-card glass ${inView ? 'visible' : ''}`}
                            style={{ '--feat-color': color, transitionDelay: `${0.3 + i * 0.1}s` }}
                        >
                            <span className="feat-icon">{icon}</span>
                            <h4 className="feat-title">{title}</h4>
                            <p className="feat-desc">{desc}</p>
                            <div className="feat-glow" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
