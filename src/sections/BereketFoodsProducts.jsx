import { useEffect, useRef, useState } from 'react'
import jarfulImg from '../assets/jarful.jpg'
import niwalaImg from '../assets/niwala.jpg'
import majorGrainsImg from '../assets/major-grains.jpg'
import porridgeImg from '../assets/porridge.jpg'
import kuvvetImg from '../assets/kuvvet.jpg'
import jhatHazamImg from '../assets/jhat-hazam.jpg'
import liffestImg from '../assets/liffest.jpg'
import './BereketFoodsProducts.css'

// ── Product data — Bereket Foods export catalogue ──────────────────────────
// Images are sourced from the public web (Bereket Foods product families)
// Replace any src with your own hosted images as needed.

const ALL_PRODUCTS = [
    {
        id: 'major-grains',
        name: 'Bereket Major Grains',
        tagline: 'Staple Grains · Bulk Export · Premium Quality',
        category: 'Grains',
        badge: 'Bulk Export',
        emoji: '🌾',
        img: majorGrainsImg,
        specs: ['25kg', '50kg', '1 Ton'],
        exportTag: 'Export Ready',
        desc: 'Bereket Major Grains is your trusted bulk grain supplier for premium-grade wheat, maize, barley, and sorghum. Sustainably sourced and cleaned to ISO commodity standards, our export-ready staple grains meet the needs of large-scale food manufacturers, flour millers, and wholesale importers. Non-GMO verified and HACCP-certified — the ideal clean-label grain sourcing partner for B2B buyers.',
    },
    {
        id: 'kuvvet',
        name: 'Bereket Kuvvet',
        tagline: 'Breakfast Cereal · Choco · Fruit Varieties',
        category: 'Nutrition',
        badge: 'Power Blend',
        emoji: '💪',
        img: kuvvetImg,
        specs: ['500g', '1kg', '2kg'],
        exportTag: 'Export Ready',
        desc: 'Bereket Kuvvet delivers a delicious breakfast cereal range loved by kids and families. Available in trending chocolate and fruit flavour varieties, Kuvvet cereals are whole-grain fortified, nutrient-dense, and made with clean-label ingredients. Perfect for retail shelves, supermarket chains, and private-label wholesale buyers seeking high-demand morning nutrition products.',
    },
    {
        id: 'kuvvet-porridge',
        name: 'Bereket Kuvvet Porridge',
        tagline: 'Warm & Nourishing · Instant Prep · Kids & Family',
        category: 'Nutrition',
        badge: 'Wholesome',
        emoji: '🥣',
        img: porridgeImg,
        specs: ['400g', '800g', '1.6kg'],
        exportTag: 'Export Ready',
        desc: 'Bereket Kuvvet Porridge is a trending instant multigrain porridge crafted for modern health-conscious consumers. Fortified with iron, calcium, zinc, and essential vitamins, it offers a warm, nutrient-dense meal in minutes. Ideal for wellness-focused retail, school nutrition programmes, and B2B wholesale distributors seeking plant-based, clean-label breakfast solutions.',
    },
    {
        id: 'jhat-hazam',
        name: 'Bereket JhatHazam',
        tagline: 'Nutritional Blend · Natural Ingredients · Family Pack',
        category: 'Nutrition',
        badge: 'Premium',
        emoji: '🍚',
        img: jhatHazamImg,
        specs: ['1kg', '5kg', '10kg', '50kg'],
        exportTag: 'Export Ready',
        desc: 'Bereket JhatHazam is a next-generation flavoured digestive tablet crafted for modern gut-health consumers. Infused with natural digestive enzymes, probiotics, and soothing botanical extracts, JhatHazam delivers fast-acting digestive relief in a delicious, chewable format. Available in trending flavours, it targets the booming digestive wellness market — a clean-label, functional food supplement ideal for pharmacy retail, health stores, and B2B private-label wholesale buyers.',
    },
    {
        id: 'jarful',
        name: 'Bereket Jarful',
        tagline: 'Artisan Spreads · Fruit Jams · Nut Butters',
        category: 'Spreads',
        badge: 'Artisan Range',
        emoji: '🍯',
        img: jarfulImg,
        specs: ['250g', '500g', '1kg'],
        exportTag: 'Export Ready',
        desc: 'Bereket Jarful is a premium artisan spreads range crafted for specialty food retailers and gourmet importers. From cold-extracted fruit jams and raw nut butters to tahini and plant-based preserves, every jar is produced in export-certified, HACCP-compliant facilities. A best-selling clean-label product line for organic food stores, upscale supermarkets, and private-label buyers worldwide.',
    },
    {
        id: 'niwala',
        name: 'Bereket Niwala',
        tagline: 'Basmati Rice · Easy Digest · Light & Aromatic',
        category: 'Rice',
        badge: 'Family Choice',
        emoji: '🫙',
        img: niwalaImg,
        specs: ['500g', '1kg', '2kg'],
        exportTag: 'Export Ready',
        desc: 'Bereket Niwala is an aged aromatic basmati rice — prized for its long grains, light texture, and distinctive fragrance. Sourced from the finest paddy fields and processed under strict export-grade quality controls for moisture, whiteness, and grain length. Non-GMO, HACCP-certified, and available for bulk wholesale supply and private-label packaging for retail chains globally.',
    },
    {
        id: 'liffest',
        name: 'Bereket Liffest',
        tagline: 'Lifestyle Snacks · Crispy · On-the-Go Packs',
        category: 'Snacks',
        badge: 'New Range',
        emoji: '🍿',
        img: liffestImg,
        specs: ['50g', '100g', '250g'],
        exportTag: 'Export Ready',
        desc: 'Bereket Liffest is a high-growth lifestyle snack range — crispy, portion-controlled, and designed for today\'s on-the-go consumer. Trending across convenience retail, airline catering, and hospitality channels, Liffest snacks are produced with clean-label ingredients and hygienic export-certified packaging. A standout private-label opportunity for B2B buyers in the booming global snack foods market.',
    },
]


const CATEGORIES = ['All', ...Array.from(new Set(ALL_PRODUCTS.map(p => p.category)))]

export default function BereketFoodsProducts() {
    const [activeFilter, setActiveFilter] = useState('All')
    const [selected, setSelected] = useState(null)
    const cardRefs = useRef([])

    const filtered = activeFilter === 'All'
        ? ALL_PRODUCTS
        : ALL_PRODUCTS.filter(p => p.category === activeFilter)

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = selected ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [selected])

    // Close on Escape key
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') setSelected(null) }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [])

    useEffect(() => {
        cardRefs.current = cardRefs.current.slice(0, filtered.length)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.07 }
        )

        cardRefs.current.forEach((el) => {
            if (el) {
                el.classList.remove('visible')
                observer.observe(el)
            }
        })

        return () => observer.disconnect()
    }, [activeFilter])

    return (
        <section className="bfp-section">
            {/* ── Hero ─────────────────────────────── */}
            <div className="bfp-hero">
                <div className="bfp-hero-glow" />
                <div className="bfp-hero-content">
                    <p className="bfp-eyebrow">
                        <span className="bfp-eyebrow-dot" />
                        Bereket Foods · Export Catalogue
                        <span className="bfp-eyebrow-dot" />
                    </p>
                    <h1 className="bfp-hero-title">Our Products</h1>
                    <p className="bfp-hero-sub">
                        Premium-grade food products manufactured to international standards —
                        trusted by distributors, retail chains, and food manufacturers worldwide.
                    </p>
                    <div className="bfp-hero-line" />
                </div>
            </div>

            {/* ── Category Filter ───────────────────── */}
            <div className="bfp-filter-bar">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        className={`bfp-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                        onClick={() => setActiveFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ── Products Grid ────────────────────── */}
            <div className="bfp-grid-wrap">
                <div className="bfp-grid">
                    {filtered.map((product, i) => (
                        <div
                            key={product.id}
                            className="bfp-card"
                            ref={(el) => (cardRefs.current[i] = el)}
                            style={{ transitionDelay: `${(i % 4) * 80}ms` }}
                            onClick={() => setSelected(product)}
                            title="Click to view details"
                        >
                            <div className="bfp-card-inner">
                                {/* Image */}
                                <div className="bfp-img-wrap">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="bfp-product-img"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                            e.target.parentNode.innerHTML = `<div class='bfp-emoji-wrap'>${product.emoji}</div>`
                                        }}
                                    />
                                    <span className="bfp-img-badge">{product.badge}</span>
                                    <span className="bfp-img-category">{product.category}</span>
                                    <span className="bfp-card-zoom-hint">🔍 View Details</span>
                                </div>

                                {/* Body */}
                                <div className="bfp-card-body">
                                    <h3 className="bfp-card-name">{product.name}</h3>
                                    <p className="bfp-card-tagline">{product.tagline}</p>
                                    <p className="bfp-card-desc">{product.desc}</p>

                                    {/* Footer */}
                                    <div className="bfp-card-footer">
                                        <span className="bfp-export-tag">{product.exportTag}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── CTA ─────────────────────────────── */}
            <div className="bfp-cta">
                <h2 className="bfp-cta-title">Ready to Source with Us?</h2>
                <p className="bfp-cta-sub">
                    Contact our export team for pricing, bulk shipment options, and product specifications.
                </p>
                <a href="/contact" className="bfp-cta-btn">Request a Quote</a>
            </div>

            {/* ── Product Modal ─────────────────────── */}
            {selected && (
                <div className="bfp-modal-overlay" onClick={() => setSelected(null)}>
                    <div className="bfp-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="bfp-modal-close" onClick={() => setSelected(null)} aria-label="Close">✕</button>

                        <div className="bfp-modal-img-wrap">
                            <img
                                src={selected.img}
                                alt={selected.name}
                                className="bfp-modal-img"
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                    e.target.parentNode.innerHTML = `<div class='bfp-modal-emoji'>${selected.emoji}</div>`
                                }}
                            />
                            <span className="bfp-modal-badge">{selected.badge}</span>
                        </div>

                        <div className="bfp-modal-body">
                            <span className="bfp-modal-category">{selected.category}</span>
                            <h2 className="bfp-modal-name">{selected.name}</h2>
                            <p className="bfp-modal-tagline">{selected.tagline}</p>
                            <div className="bfp-modal-divider" />
                            <p className="bfp-modal-desc">{selected.desc}</p>
                            <span className="bfp-modal-export">{selected.exportTag}</span>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}


