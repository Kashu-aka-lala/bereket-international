import { useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import './ProductsSection.css'

const PRODUCTS = [
    {
        id: 'rice',
        emoji: '🌾',
        name: 'Premium Rice',
        tagline: 'Long Grain • Basmati • Jasmine',
        desc: 'Sourced from the finest rice-growing regions. Our rice varieties are selected for superior taste, nutrition, and cooking performance.',
        color: '#D4AF37',
        glow: 'rgba(212,175,55,0.3)',
        delay: 0,
    },
    {
        id: 'wheat',
        emoji: '🌿',
        name: 'Wheat & Flour',
        tagline: 'Refined • Whole Wheat • Semolina',
        desc: 'Premium wheat products milled to exacting standards. From bread flour to semolina, we supply the quality your customers demand.',
        color: '#C8A96E',
        glow: 'rgba(200,169,110,0.3)',
        delay: 0.1,
    },
    {
        id: 'oil',
        emoji: '🫙',
        name: 'Cooking Oil',
        tagline: 'Sunflower • Soybean • Palm',
        desc: 'Crystal-clear, refined cooking oils with extended shelf life. Packed under hygienic conditions to maintain freshness and purity.',
        color: '#E8A020',
        glow: 'rgba(232,160,32,0.3)',
        delay: 0.2,
    },
    {
        id: 'spices',
        emoji: '🌶️',
        name: 'Premium Spices',
        tagline: 'Turmeric • Cumin • Berbere',
        desc: 'Authentic Ethiopian and global spices, dried and packed at peak flavor. Our spice blends bring the world\'s finest aromas to your table.',
        color: '#E05C2A',
        glow: 'rgba(224,92,42,0.3)',
        delay: 0.3,
    },
    {
        id: 'pulses',
        emoji: '🫘',
        name: 'Pulses & Legumes',
        tagline: 'Lentils • Chickpeas • Beans',
        desc: 'High-protein, naturally nutritious pulses and legumes. Hand-sorted and cleaned to ensure consistent quality in every shipment.',
        color: '#2ECC71',
        glow: 'rgba(46,204,113,0.3)',
        delay: 0.4,
    },
]

function ProductCard({ product }) {
    const [hovered, setHovered] = useState(false)
    const cardRef = useRef()

    return (
        <div
            ref={cardRef}
            className={`product-card ${hovered ? 'hovered' : ''}`}
            style={{
                '--card-color': product.color,
                '--card-glow': product.glow,
                animationDelay: `${product.delay}s`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => {
                if (!cardRef.current) return
                const rect = cardRef.current.getBoundingClientRect()
                const x = (e.clientX - rect.left) / rect.width - 0.5
                const y = (e.clientY - rect.top) / rect.height - 0.5
                cardRef.current.style.transform = `
          perspective(800px)
          rotateX(${-y * 12}deg)
          rotateY(${x * 12}deg)
          translateY(-8px) scale(1.02)
        `
            }}
            onMouseLeave={() => {
                setHovered(false)
                if (cardRef.current) cardRef.current.style.transform = ''
            }}
        >
            <div className="product-glow-ring" />
            <div className="product-icon-wrapper">
                <span className="product-emoji">{product.emoji}</span>
                <div className="product-icon-glow" />
            </div>
            <div className="product-shadow-floor" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-tagline">{product.tagline}</p>
            <p className="product-desc">{product.desc}</p>
            <div className="product-footer">
                <span className="product-link">View Details →</span>
                <span className="product-badge">Export Ready</span>
            </div>
        </div>
    )
}

export default function ProductsSection() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section id="products" ref={ref} className={`products-section ${inView ? 'visible' : ''}`}>
            <div className="products-bg" />
            <div className="container">
                <div className="products-header">
                    <span className="section-label">Our Portfolio</span>
                    <h2 className="section-title">
                        World-Class<br />
                        <span>Product Range</span>
                    </h2>
                    <div className="gold-divider" />
                    <p className="products-subtitle">
                        From the fields to your doorstep — premium-grade commodities trusted by importers, retailers, and food manufacturers worldwide.
                    </p>
                </div>

                <div className="products-grid">
                    {PRODUCTS.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
