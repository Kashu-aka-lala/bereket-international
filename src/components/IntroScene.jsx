import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import rawLogo from '../assets/logo.jpg'
import { getTransparentLogo } from '../utils/imageProcessor'
import './IntroScene.css'

export default function IntroScene({ onComplete }) {
    const containerRef = useRef(null)
    const logoRef = useRef(null)
    const text1Ref = useRef(null)
    const text2Ref = useRef(null)
    const lineRef = useRef(null)
    const [logo, setLogo] = useState(rawLogo)

    useEffect(() => {
        // Remove white background seamlessly
        getTransparentLogo(rawLogo).then(setLogo).catch(console.error)
    }, [])

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Fade out the whole container and notify App to unmount
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.inOut',
                    onComplete
                })
            }
        })

        // Initial setup
        gsap.set([logoRef.current, text1Ref.current, text2Ref.current], {
            y: 30,
            opacity: 0
        })
        gsap.set(logoRef.current, { rotationY: 45, rotationX: 20 })
        gsap.set(lineRef.current, { scaleX: 0 })

        // Animation sequence
        tl.to(logoRef.current, {
            y: 0,
            opacity: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.2
        })
            .to(text1Ref.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, "-=0.8")
            .to(lineRef.current, {
                scaleX: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, "-=0.4")
            .to(text2Ref.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            }, "-=0.4")

            // Hold on screen before fading out
            .to({}, { duration: 1.8 })

    }, [onComplete])

    return (
        <div ref={containerRef} className="intro-container">
            <div className="intro-content">
                <img ref={logoRef} src={logo} alt="Bereket Logo" className="intro-logo intro-logo-3d" />
                <h1 ref={text1Ref} className="intro-title">
                    Bereket <span>Internationals</span>
                </h1>
                <div ref={lineRef} className="intro-divider"></div>
                <p ref={text2Ref} className="intro-subtitle">Global Quality. Trusted Worldwide.</p>
            </div>
        </div>
    )
}
