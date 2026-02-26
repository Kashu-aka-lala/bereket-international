import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Stars, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HeroSection.css'

gsap.registerPlugin(ScrollTrigger)

// ────────── 3D Globe ──────────
function Globe() {
    const meshRef = useRef()
    const glowRef = useRef()

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        meshRef.current.rotation.y = t * 0.08
        meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.1
        glowRef.current.rotation.y = -t * 0.04
    })

    return (
        <group position={[2.5, 0.5, -8]}>
            {/* Core wireframe globe */}
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[4.5, 8]} />
                <meshStandardMaterial
                    color="#D4AF37"
                    wireframe
                    transparent
                    opacity={0.25}
                    emissive="#D4AF37"
                    emissiveIntensity={0.4}
                />
            </mesh>
            {/* Inner solid globe */}
            <mesh scale={0.96}>
                <icosahedronGeometry args={[4.5, 3]} />
                <MeshDistortMaterial
                    color="#0a1628"
                    transparent
                    opacity={0.65}
                    distort={0.12}
                    speed={1.5}
                    roughness={0}
                    metalness={0.8}
                />
            </mesh>
            {/* Outer glow ring */}
            <mesh ref={glowRef}>
                <torusGeometry args={[5.6, 0.08, 8, 120]} />
                <meshBasicMaterial color="#D4AF37" transparent opacity={0.4} />
            </mesh>
            <mesh rotation={[Math.PI * 0.35, 0, 0]}>
                <torusGeometry args={[5.8, 0.05, 8, 120]} />
                <meshBasicMaterial color="#2ECC71" transparent opacity={0.25} />
            </mesh>
            {/* Glow sprite */}
            <pointLight color="#D4AF37" intensity={1.5} distance={20} />
        </group>
    )
}

// ────────── Floating Product ──────────
function FloatingProduct({ position, geometry, color, delay = 0, scale = 1 }) {
    const meshRef = useRef()

    useFrame(({ clock, mouse }) => {
        const t = clock.getElapsedTime() + delay
        meshRef.current.position.y = position[1] + Math.sin(t * 0.7) * 0.6
        meshRef.current.position.x = position[0] + Math.sin(t * 0.3) * 0.2 + mouse.x * 0.5
        meshRef.current.position.z = position[2] + Math.cos(t * 0.3) * 0.15
        meshRef.current.rotation.y = t * 0.3
        meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.2
    })

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <mesh ref={meshRef} position={position} scale={scale} castShadow>
                {geometry}
                <meshStandardMaterial
                    color={color}
                    metalness={0.6}
                    roughness={0.3}
                    emissive={color}
                    emissiveIntensity={0.15}
                />
            </mesh>
        </Float>
    )
}

// ────────── Particle Field ──────────
function ParticleField() {
    const pointsRef = useRef()
    const COUNT = 1500

    const positions = new Float32Array(COUNT * 3)
    const speeds = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 60
        positions[i * 3 + 1] = (Math.random() - 0.5) * 40
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 15
        speeds[i] = Math.random() * 0.3 + 0.05
    }

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        const pos = pointsRef.current.geometry.attributes.position.array
        for (let i = 0; i < COUNT; i++) {
            pos[i * 3 + 1] += speeds[i] * 0.008
            if (pos[i * 3 + 1] > 20) pos[i * 3 + 1] = -20
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true
        pointsRef.current.rotation.y = t * 0.01
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.06}
                color="#D4AF37"
                transparent
                opacity={0.5}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

// ────────── Camera Rig ──────────
function CameraRig() {
    const { camera } = useThree()
    const mouse = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouse = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
            mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
        }
        window.addEventListener('mousemove', handleMouse)
        return () => window.removeEventListener('mousemove', handleMouse)
    }, [])

    useFrame(() => {
        camera.position.x += (mouse.current.x * 1.5 - camera.position.x) * 0.04
        camera.position.y += (mouse.current.y * 0.8 - camera.position.y) * 0.04
        camera.lookAt(0, 0, 0)
    })

    return null
}

// ────────── Scene ──────────
function HeroScene() {
    return (
        <>
            <CameraRig />
            <Environment preset="night" />
            <Stars radius={80} depth={50} count={3000} factor={3} saturation={0.2} fade speed={0.5} />

            <ambientLight intensity={0.3} color="#1a1a2e" />
            <directionalLight position={[10, 10, 5]} intensity={0.8} color="#D4AF37" />
            <pointLight position={[-10, -5, -5]} intensity={0.5} color="#2ECC71" />
            <pointLight position={[5, 8, 2]} intensity={0.6} color="#D4AF37" />

            <Globe />
            <ParticleField />

            {/* Floating products */}
            <FloatingProduct
                position={[-6.5, 2.5, -3]}
                geometry={<boxGeometry args={[1.2, 2, 0.7]} />}
                color="#c8a951"
                delay={0}
                scale={1}
            />
            <FloatingProduct
                position={[6, -1.5, -4]}
                geometry={<cylinderGeometry args={[0.5, 0.6, 2.5, 12]} />}
                color="#e8c060"
                delay={1.2}
                scale={0.9}
            />
            <FloatingProduct
                position={[-4, -2.5, -6]}
                geometry={<sphereGeometry args={[0.9, 16, 16]} />}
                color="#d4922a"
                delay={2}
                scale={1}
            />
            <FloatingProduct
                position={[4.5, 3, -5]}
                geometry={<boxGeometry args={[0.9, 1.4, 0.9]} />}
                color="#3d9e5f"
                delay={0.7}
                scale={0.85}
            />
            <FloatingProduct
                position={[-7, -0.5, -5]}
                geometry={<cylinderGeometry args={[0.3, 0.5, 1.8, 8]} />}
                color="#b8860b"
                delay={1.8}
                scale={1.1}
            />
            <FloatingProduct
                position={[7, 1.5, -6]}
                geometry={<torusGeometry args={[0.7, 0.3, 12, 30]} />}
                color="#D4AF37"
                delay={0.4}
                scale={0.8}
            />
        </>
    )
}

// ────────── Hero Section ──────────
export default function HeroSection() {
    const sectionRef = useRef()
    const headingRef = useRef()
    const subRef = useRef()
    const btnRef = useRef()

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
            )
            gsap.fromTo(subRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.7 }
            )
            gsap.fromTo(btnRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.1 }
            )

            // Scroll zoom effect on hero content
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                onUpdate: (self) => {
                    const p = self.progress
                    if (headingRef.current) {
                        headingRef.current.style.transform = `translateY(${p * 60}px)`
                        headingRef.current.style.opacity = 1 - p * 1.5
                    }
                    if (subRef.current) {
                        subRef.current.style.transform = `translateY(${p * 40}px)`
                        subRef.current.style.opacity = 1 - p * 1.5
                    }
                    if (btnRef.current) {
                        btnRef.current.style.opacity = 1 - p * 2
                    }
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section id="hero" ref={sectionRef} className="hero-section">
            <div className="hero-canvas-wrapper">
                <Canvas
                    camera={{ position: [0, 0, 14], fov: 65 }}
                    gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
                    dpr={[1, 2]}
                >
                    <HeroScene />
                </Canvas>
            </div>

            <div className="hero-overlay">
                <div className="hero-badge">
                    <span className="badge-dot" />
                    <span>Global Food & Trade Excellence</span>
                </div>

                <h1 ref={headingRef} className="hero-heading">
                    Bereket<br />
                    <span className="gradient-shimmer">Internationals</span>
                </h1>

                <p ref={subRef} className="hero-sub">
                    Global Quality.<br className="mobile-br" /> Trusted Worldwide.
                </p>

                <div ref={btnRef} className="hero-actions">
                    <a href="#products" className="btn-primary" onClick={e => {
                        e.preventDefault()
                        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
                    }}>
                        <span className="btn-icon">✦</span>
                        <span>Explore Our Products</span>
                    </a>
                    <a href="#about" className="btn-secondary" onClick={e => {
                        e.preventDefault()
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                    }}>
                        Our Story ↓
                    </a>
                </div>

                <div className="hero-stats">
                    <div className="hero-stat">
                        <span className="stat-num">20+</span>
                        <span className="stat-label">Countries</span>
                    </div>
                    <div className="hero-divider" />
                    <div className="hero-stat">
                        <span className="stat-num">500+</span>
                        <span className="stat-label">Clients</span>
                    </div>
                    <div className="hero-divider" />
                    <div className="hero-stat">
                        <span className="stat-num">10+</span>
                        <span className="stat-label">Years</span>
                    </div>
                </div>
            </div>

            <div className="hero-scroll-hint">
                <div className="scroll-line" />
                <span>Scroll</span>
            </div>
        </section>
    )
}
