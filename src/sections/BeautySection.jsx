import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import './BeautySection.css'

// ── Placeholder — user will supply the real URL later ──
const BEAUTY_WEBSITE_URL = '#'

export default function BeautySection() {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
    const cardRef = useRef()

    const handleClick = () => {
        if (BEAUTY_WEBSITE_URL !== '#') {
            window.open(BEAUTY_WEBSITE_URL, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <section id="beauty" ref={ref} className={`divisions-section beauty-divisions-section ${inView ? 'visible' : ''}`}>
            <div className="container">
                <div className="divisions-wrapper">

                    {/* ── Beauty Division Card ── */}
                    <div
                        ref={cardRef}
                        className="division-card beauty-division"
                        onClick={handleClick}
                        onMouseMove={(e) => {
                            if (!cardRef.current) return
                            const rect = cardRef.current.getBoundingClientRect()
                            const x = (e.clientX - rect.left) / rect.width - 0.5
                            const y = (e.clientY - rect.top) / rect.height - 0.5
                            cardRef.current.style.setProperty('--mx', `${x * 24}px`)
                            cardRef.current.style.setProperty('--my', `${y * 24}px`)
                        }}
                        onMouseLeave={() => {
                            if (!cardRef.current) return
                            cardRef.current.style.setProperty('--mx', '0px')
                            cardRef.current.style.setProperty('--my', '0px')
                        }}
                        role="link"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
                        aria-label="Visit Bereket Naturals & Beauty website"
                    >
                        {/* Animated background glow */}
                        <div className="division-card-glow" />

                        {/* Content */}
                        <div className="division-card-body">
                            <div className="division-tag">Division II</div>

                            <div className="division-icon-wrap">
                                <span className="division-icon">✨</span>
                            </div>

                            <h2 className="division-name">Bereket Naturals</h2>
                            <p className="division-tagline">Beauty &amp; Cosmetics</p>

                            <p className="division-desc">
                                Where Ethiopian botanical heritage meets modern science —
                                a premium range of skincare, haircare, and personal care products
                                crafted for global retail and hospitality markets.
                            </p>

                            <div className="division-cta">
                                <span className="division-cta-text">Visit Website</span>
                                <span className="division-cta-arrow">→</span>
                            </div>
                        </div>

                        {/* Corner accent */}
                        <div className="division-corner-accent" />
                    </div>

                </div>
            </div>
        </section>
    )
}
