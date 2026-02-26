import { useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import './ContactSection.css'

export default function ContactSection() {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
    const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const canvasRef = useRef()

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
        if (!form.message.trim()) e.message = 'Message is required'
        return e
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        setLoading(true)
        setTimeout(() => { setLoading(false); setSubmitted(true) }, 1800)
    }

    const handleChange = (field) => (e) => {
        setForm(f => ({ ...f, [field]: e.target.value }))
        setErrors(er => ({ ...er, [field]: '' }))
    }

    return (
        <section id="contact" ref={ref} className={`contact-section ${inView ? 'visible' : ''}`}>
            {/* Particle background */}
            <div className="contact-particles">
                {Array.from({ length: 40 }).map((_, i) => (
                    <div
                        key={i}
                        className="contact-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            animationDuration: `${Math.random() * 8 + 5}s`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random() * 0.4 + 0.1,
                        }}
                    />
                ))}
            </div>

            <div className="contact-bg-glow" />
            <div className="container contact-inner">

                {/* Left info */}
                <div className="contact-info">
                    <span className="section-label">Get in Touch</span>
                    <h2 className="section-title">
                        Let's Build<br />
                        <span>Together</span>
                    </h2>
                    <div className="gold-divider" style={{ margin: '0 0 1.5rem' }} />
                    <p className="contact-desc">
                        Ready to source premium food products? Connect with our trade team for pricing, samples, and export logistics — we respond within 24 hours.
                    </p>

                    <div className="contact-details">
                        {[
                            { icon: '📍', label: 'Headquarters', val: 'Addis Ababa, Ethiopia' },
                            { icon: '📧', label: 'Email', val: 'trade@bereketintl.com' },
                            { icon: '📞', label: 'Phone', val: '+251 911 000 000' },
                            { icon: '⏰', label: 'Business Hours', val: 'Mon–Fri, 8am–6pm EAT' },
                        ].map(({ icon, label, val }) => (
                            <div key={label} className="contact-detail">
                                <span className="contact-icon">{icon}</span>
                                <div>
                                    <p className="contact-detail-label">{label}</p>
                                    <p className="contact-detail-val">{val}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right form */}
                <div className="contact-form-wrapper glass-card">
                    {submitted ? (
                        <div className="form-success">
                            <div className="success-icon">✓</div>
                            <h3>Message Sent!</h3>
                            <p>Our trade team will reach out within 24 hours.</p>
                            <button className="btn-secondary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', message: '' }) }}>
                                Send Another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <h3 className="form-title">Request a Quote</h3>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Your Name *</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={handleChange('name')}
                                        className={errors.name ? 'error' : ''}
                                    />
                                    {errors.name && <span className="form-error">{errors.name}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Email Address *</label>
                                    <input
                                        type="email"
                                        placeholder="john@company.com"
                                        value={form.email}
                                        onChange={handleChange('email')}
                                        className={errors.email ? 'error' : ''}
                                    />
                                    {errors.email && <span className="form-error">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Company Name</label>
                                <input
                                    type="text"
                                    placeholder="Your Company Ltd."
                                    value={form.company}
                                    onChange={handleChange('company')}
                                />
                            </div>

                            <div className="form-group">
                                <label>Message *</label>
                                <textarea
                                    rows={5}
                                    placeholder="Tell us about your requirement — product type, quantity, destination country..."
                                    value={form.message}
                                    onChange={handleChange('message')}
                                    className={errors.message ? 'error' : ''}
                                />
                                {errors.message && <span className="form-error">{errors.message}</span>}
                            </div>

                            <button type="submit" className="btn-primary form-submit" disabled={loading}>
                                <span>{loading ? '⏳ Sending…' : '✦'}</span>
                                <span>{loading ? '' : 'Send Inquiry'}</span>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}
