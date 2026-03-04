import { Link } from 'react-router-dom'
import prod1 from '../assets/jaaa.png'
import prod2 from '../assets/jhat.png'
import prod3 from '../assets/kuv.png'
import prod4 from '../assets/lif.png'
import prod5 from '../assets/mg.png'
import prod6 from '../assets/niwa.png'
import riverdaleLogo from '../assets/riverdale.png'
import './HomeProductsShowcase.css'

const PRODUCT_IMAGES = [
    { name: 'Product 1', src: prod1, defaultScale: 1.3, hoverScale: 1.5, to: "/products" },
    { name: 'Product 2', src: prod2, defaultScale: 1.6, hoverScale: 1.8, to: "/products" },
    { name: 'Product 3', src: prod3, defaultScale: 1.1, hoverScale: 1.3, to: "/products" }, // Kuvvet
    { name: 'Product 4', src: prod4, defaultScale: 1.4, hoverScale: 1.6, to: "/products" },
    { name: 'Product 5', src: prod5, defaultScale: 2.2, hoverScale: 2.4, to: "/products" }, // Major Grains
    { name: 'Product 6', src: prod6, defaultScale: 2.3, hoverScale: 2.5, to: "/products" }, // Niwala
    { name: 'Riverdale', src: riverdaleLogo, defaultScale: 1.5, hoverScale: 1.7, to: "/products" },
]

export default function HomeProductsShowcase() {
    return (
        <section className="hps-section">
            <div className="hps-inner">
                <div className="hps-header">
                    <span className="hps-eyebrow">OUR PRODUCTS</span>
                    <h2 className="hps-title">Bereket Foods</h2>
                </div>

                <div className="hps-logo-grid">
                    {PRODUCT_IMAGES.map((img, idx) => (
                        <Link
                            to={img.to}
                            key={img.name}
                            className="hps-product-box"
                            style={{
                                animationDelay: `${idx * 0.15}s`,
                                '--anim-delay': `${idx * 0.3}s`,
                                '--img-scale': img.defaultScale,
                                '--img-scale-hover': img.hoverScale
                            }}
                        >
                            <img src={img.src} alt={img.name} className="hps-product-box-img" />
                        </Link>
                    ))}
                </div>

                <Link to="/products" className="hps-cta">View Full Catalogue →</Link>
            </div>
        </section>
    )
}
