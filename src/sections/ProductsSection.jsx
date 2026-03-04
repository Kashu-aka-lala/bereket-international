import { useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import './ProductsSection.css'

const PRODUCTS = [
    {
        id: 'rice',
        emoji: '🌾',
        name: 'Premium Rice',
        tagline: 'Long Grain • Basmati • Jasmine',
        shortDesc: 'Premium sourced rice varieties for superior taste and nutrition.',
        fullDesc: 'Discover our premium rice collection featuring world-class Long Grain, aromatic Basmati, and fragrant Jasmine rice. Sourced sustainably from elite global paddies, our rice ensures superior cooking performance, fluffy texture, and exceptional nutritional value. Perfect for bulk export, wholesale distribution, and elite culinary applications. Non-GMO and export-certified for global food trade excellence.',
        color: '#D4AF37',
        glow: 'rgba(212,175,55,0.3)',
        delay: 0,
    },
    {
        id: 'wheat',
        emoji: '🌿',
        name: 'Wheat & Flour',
        tagline: 'Refined • Whole Wheat • Semolina',
        shortDesc: 'Exacting standards of milled wheat for bakeries and manufacturers.',
        fullDesc: 'Elevate your baking and manufacturing with our top-tier wheat and flour products. From high-protein refined bread flour to nutrient-dense whole wheat and premium durum semolina, we supply bulk quantities engineered for consistency. Trusted by international bakeries, pasta manufacturers, and food service giants worldwide. Reliable supply chain, export-ready, and ISO compliant.',
        color: '#C8A96E',
        glow: 'rgba(200,169,110,0.3)',
        delay: 0.1,
    },
    {
        id: 'oil',
        emoji: '🫙',
        name: 'Cooking Oil',
        tagline: 'Sunflower • Soybean • Palm',
        shortDesc: 'Crystal-clear, refined cooking oils packed for extended freshness.',
        fullDesc: 'Secure your supply of high-grade, crystal-clear bulk cooking oils. We export premium refined Sunflower Oil, versatile Soybean Oil, and high-stability Palm Oil. Processed under strict hygienic conditions to ensure an extended shelf life, optimal smoke points, and pure taste. Ideal for commercial frying, food processing, and retail bottling operations globally. Halal and HACCP certified.',
        color: '#E8A020',
        glow: 'rgba(232,160,32,0.3)',
        delay: 0.2,
    },
    {
        id: 'spices',
        emoji: '🌶️',
        name: 'Premium Spices',
        tagline: 'Turmeric • Cumin • Berbere',
        shortDesc: 'Authentic global spices dried and packed at peak flavor.',
        fullDesc: 'Experience the vibrant essence of authentic Ethiopian and global spice blends. Our pure Turmeric, aromatic Cumin, and fiery traditional Berbere are harvested, sun-dried, and packed at peak flavor. Free from artificial fillers or colors, our bulk spice exports bring rich, natural aromas to food manufacturers, spice distributors, and culinary brands across international borders.',
        color: '#E05C2A',
        glow: 'rgba(224,92,42,0.3)',
        delay: 0.3,
    },
    {
        id: 'pulses',
        emoji: '🫘',
        name: 'Pulses & Legumes',
        tagline: 'Lentils • Chickpeas • Beans',
        shortDesc: 'High-protein, naturally nutritious pulses sorted for consistency.',
        fullDesc: 'Fuel global demand with our premium, high-protein pulses and legumes. We supply top-quality Red and Green Lentils, whole Chickpeas, and versatile Beans. Each batch is meticulously hand-sorted and machine-cleaned to guarantee purity, uniform cooking times, and consistent quality. A staple for plant-based food innovators, canning facilities, and wholesale commodity traders.',
        color: '#2ECC71',
        glow: 'rgba(46,204,113,0.3)',
        delay: 0.4,
    },
]

function ProductCard({ product, onClick }) {
    const [hovered, setHovered] = useState(false)
    const cardRef = useRef()

    return (
        <div
            ref={cardRef}
            onClick={() => onClick(product)}
            className={`product-card ${hovered ? 'hovered' : ''}`}
            style={{
                '--card-color': product.color,
                '--card-glow': product.glow,
                animationDelay: `${product.delay}s`,
            }}
            onMouseEnter={() => setHovered(true)}
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
            <p className="product-desc">{product.shortDesc}</p>
            <div className="product-footer">
                <span className="product-link">Read More →</span>
                <span className="product-badge">Export Ready</span>
            </div>
        </div>
    )
}

export default function ProductsSection() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
    const [selectedProduct, setSelectedProduct] = useState(null)

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
                        <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
                    ))}
                </div>

                {selectedProduct && (
                    <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
                        <div className="product-modal" onClick={(e) => e.stopPropagation()}>
                            <button className="product-modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
                            <div className="product-modal-icon-wrap" style={{ '--modal-color': selectedProduct.color, '--modal-glow': selectedProduct.glow }}>
                                <span className="product-modal-emoji">{selectedProduct.emoji}</span>
                                <div className="product-modal-glow" />
                            </div>
                            <h3 className="product-modal-name">{selectedProduct.name}</h3>
                            <p className="product-modal-tagline">{selectedProduct.tagline}</p>
                            <div className="product-modal-divider" />
                            <p className="product-modal-fulldesc">{selectedProduct.fullDesc}</p>
                            <span className="product-badge modal-badge">Export Ready</span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
