import { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import './FoodSection.css'

// ── Placeholder — user will supply the real URL later ──
const FOOD_WEBSITE_URL = 'https://bereketfoods.com'

export default function FoodSection() {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
    const cardRef = useRef()

    const handleClick = () => {
        if (FOOD_WEBSITE_URL !== '#') {
            window.open(FOOD_WEBSITE_URL, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <section id="food" ref={ref} className={`divisions-section ${inView ? 'visible' : ''}`}>
            <div className="container">
                <div className="divisions-wrapper">

                    {/* ── Food Division Card ── */}
                    <div
                        ref={cardRef}
                        className="division-card food-division"
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
                        aria-label="Visit Bereket Foods & Nutrition website"
                    >
                        {/* Animated background glow */}
                        <div className="division-card-glow" />

                        {/* Content */}
                        <div className="division-card-body">
                            <div className="division-tag">Division I</div>

                            <div className="division-icon-wrap">
                                <span className="division-icon">🌾</span>
                            </div>

                            <h2 className="division-name">Bereket Foods</h2>
                            <p className="division-tagline">Food &amp; Nutrition</p>

                            <p className="division-desc">
                                From premium grains and spices to fortified breakfast cereals —
                                supplying world-class nutritional products to markets across 20+ countries
                                with manufacturing excellence and global distribution.
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
