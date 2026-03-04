import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import imgExport from '../assets/major-grains.jpg'
import imgDrap from '../assets/jhat-hazam.jpg'
import imgShip from '../assets/export-ship.jpg'
import './WhyChooseUs.css'

const STATS = [
    { num: 200, suffix: '+', label: 'Happy Clients', icon: '🤝', tagline: 'National and international 200+ clients', color: '#5B8DEF' },
    { num: 7, suffix: '', label: 'Product Brands', icon: '🏷️', tagline: 'Distinct Bereket food brands exported', color: '#9B59B6' },
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
                    <p className="why-subtitle" style={{ maxWidth: '800px', margin: '1rem auto 2rem' }}>
                        At Bereket Internationals, we don't just export products; we build powerful food and wellness brands that resonate across borders.
                        As a premier international manufacturer and distributor, our portfolio is crafted to meet the highest global standards.
                        Whether it is our staple dietary grains or our advanced fortified nutritional lines, we guarantee excellence, transparency, and a commitment to enriching communities worldwide.
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

                {/* Alternating Cards */}
                <div className="why-alt-container">
                    {/* Card 1: Global Export */}
                    <div className={`why-alt-card ${inView ? 'visible' : ''}`}>
                        <div className="why-alt-content glass-card">
                            <span className="why-alt-icon">🚢</span>
                            <h3 className="why-alt-title">Exporting Health Globally</h3>
                            <p className="why-alt-desc">
                                We don't just supply ingredients; we supply health. By combining our DRAP-approved formulas with nutritionally fortified processing, Bereket Internationals exports high-value, safe, and effective products that set new standards in international markets. With a robust logistics network, we ensure these premium products reach global destinations fresh, compliant, and ready for consumers.
                            </p>
                        </div>
                        <div className="why-alt-image">
                            <img src={imgShip} alt="Global Export Logistics" />
                        </div>
                    </div>

                    {/* Card 2: Fortified */}
                    <div className={`why-alt-card reverse ${inView ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
                        <div className="why-alt-content glass-card">
                            <span className="why-alt-icon">🔬</span>
                            <h3 className="why-alt-title">Nutritionally Fortified</h3>
                            <p className="why-alt-desc">
                                At Bereket Internationals, we believe in delivering more than just basic calories. Our portfolio products are fortified with essential vitamins and minerals, upgrading everyday meals into powerful nutritional choices. Whether we are exporting to neighboring regions or across oceans, our standard is to guarantee excellence and enhance global well-being, one serving at a time.
                            </p>
                        </div>
                        <div className="why-alt-image">
                            <img src={imgExport} alt="Nutritionally Fortified Products" />
                        </div>
                    </div>

                    {/* Card 3: DRAP + Digestive Image */}
                    <div className={`why-alt-card ${inView ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
                        <div className="why-alt-content glass-card">
                            <span className="why-alt-icon">🛡️</span>
                            <h3 className="why-alt-title">DRAP Approved Excellence</h3>
                            <p className="why-alt-desc">
                                Trust is our core ingredient. Our specialized digestive and wellness lines have earned rigorous certification from the Drug Regulatory Authority of Pakistan (DRAP). This means when you choose Bereket, you are choosing products that have been scientifically validated for safety, purity, and clinical-backed effectiveness globally.
                            </p>
                        </div>
                        <div className="why-alt-image">
                            <img src={imgDrap} alt="DRAP Approved Digestive Product" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
