import FoodSection from '../sections/FoodSection'
import BeautySection from '../sections/BeautySection'
import '../App.css'

export default function DivisionsPage() {
    return (
        <div id="divisions" className="divisions-hub">
            <div className="container">
                <div className="divisions-hub-header">
                    <span className="section-label">Our Divisions</span>
                    <h2 className="section-title">
                        Two Worlds, <span>One Mission</span>
                    </h2>
                    <div className="blue-divider" />
                    <p className="divisions-hub-sub">
                        Bereket International operates two distinct divisions — each with its own brand,
                        products, and dedicated website. Click a division below to explore.
                    </p>
                </div>
            </div>
            <FoodSection />
            <BeautySection />
        </div>
    )
}
