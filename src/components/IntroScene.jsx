import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './IntroScene.css'

export default function IntroScene({ onComplete }) {
    const mountRef = useRef(null)
    const progressRef = useRef(0)

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 120

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 1)
        mount.appendChild(renderer.domElement)

        // ── Particle system ──
        const PARTICLE_COUNT = 3000
        const positions = new Float32Array(PARTICLE_COUNT * 3)
        const targets = new Float32Array(PARTICLE_COUNT * 3)
        const colors = new Float32Array(PARTICLE_COUNT * 3)
        const sizes = new Float32Array(PARTICLE_COUNT)

        // Build letter outlines "BI" in 3D space
        const letterPoints = []
        const buildLetter = (offX, offY, shape) => {
            shape.forEach(([x, y]) => {
                for (let t = 0; t < 6; t++) {
                    letterPoints.push([x * 18 + offX, y * 18 + offY, (Math.random() - 0.5) * 2])
                }
            })
        }

        // "B" points
        buildLetter(-55, 0, [
            [0, 2], [0, 1], [0, 0], [0, -1], [0, -2],
            [0.5, 1.8], [1, 1.5], [1, 1], [0.5, 0.5],
            [0.5, -0.2], [1, -0.8], [1, -1.5], [0.5, -1.8],
            [0.2, 0.2], [0.2, -0.2],
        ])

        // "I" points
        buildLetter(-10, 0, [
            [0, 2], [0, 1], [0, 0], [0, -1], [0, -2],
            [-0.5, 2], [0.5, 2], [-0.5, -2], [0.5, -2],
        ])

        // Randomize initial particle positions
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 400
            positions[i * 3 + 1] = (Math.random() - 0.5) * 400
            positions[i * 3 + 2] = (Math.random() - 0.5) * 400
            sizes[i] = Math.random() * 2 + 0.5

            const target = letterPoints[i % letterPoints.length]
            targets[i * 3] = target ? target[0] : 0
            targets[i * 3 + 1] = target ? target[1] : 0
            targets[i * 3 + 2] = target ? target[2] : 0

            // Blue shades matching the logo gradient
            const shade = 0.7 + Math.random() * 0.3
            // Mix between deep royal blue (#1E3799) and sky blue (#5B8DEF)
            const t = Math.random()
            colors[i * 3] = shade * (0.12 + t * 0.24)     // R: 0.12→0.36
            colors[i * 3 + 1] = shade * (0.22 + t * 0.32) // G: 0.22→0.55
            colors[i * 3 + 2] = shade * (0.6 + t * 0.34)  // B: 0.60→0.94
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

        const material = new THREE.PointsMaterial({
            size: 1.8,
            vertexColors: true,
            transparent: true,
            opacity: 1,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        })

        const points = new THREE.Points(geometry, material)
        scene.add(points)

        // ── Ring glow ──
        const ringGeometry = new THREE.TorusGeometry(60, 0.4, 16, 100)
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x2756C8,
            transparent: true,
            opacity: 0,
            wireframe: false,
        })
        const ring = new THREE.Mesh(ringGeometry, ringMaterial)
        ring.rotation.x = Math.PI / 2
        scene.add(ring)

        // ── Ambient light ──
        scene.add(new THREE.AmbientLight(0x2756C8, 0.5))

        // ── State ──
        let phase = 0 // 0=gather, 1=hold, 2=shine, 3=fade
        let phaseTimer = 0
        const clock = new THREE.Clock()
        let rafId

        // ── Overlay elements ──
        const overlay = document.createElement('div')
        overlay.style.cssText = `
      position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;
      justify-content:center;pointer-events:none;z-index:10;opacity:0;transition:opacity 1s ease;
    `
        overlay.innerHTML = `
      <p style="font-family:'Outfit',sans-serif;font-size:0.8rem;letter-spacing:0.3em;color:#5B8DEF;text-transform:uppercase;margin-bottom:1rem;">Est. 2014</p>
      <h1 style="font-family:'Playfair Display',serif;font-size:clamp(2rem,5vw,4rem);color:#fff;text-align:center;line-height:1.1;text-shadow:0 0 40px rgba(39,86,200,0.8);">
        Bereket<br><span style="color:#5B8DEF;">Internationals</span>
      </h1>
      <p style="font-family:'Outfit',sans-serif;font-size:1rem;letter-spacing:0.15em;color:rgba(255,255,255,0.6);margin-top:1rem;">Global Quality. Trusted Worldwide.</p>
    `
        mount.appendChild(overlay)

        // ── Animate ──
        const animate = () => {
            rafId = requestAnimationFrame(animate)
            const delta = clock.getDelta()
            phaseTimer += delta
            const pos = geometry.attributes.position.array

            if (phase === 0) {
                // Gather particles toward targets
                const speed = Math.min(phaseTimer / 2.5, 1)
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    pos[i * 3] += (targets[i * 3] - pos[i * 3]) * speed * 0.04
                    pos[i * 3 + 1] += (targets[i * 3 + 1] - pos[i * 3 + 1]) * speed * 0.04
                    pos[i * 3 + 2] += (targets[i * 3 + 2] - pos[i * 3 + 2]) * speed * 0.04
                }
                geometry.attributes.position.needsUpdate = true
                points.rotation.y += 0.002

                if (phaseTimer > 2.8) {
                    phase = 1
                    phaseTimer = 0
                    overlay.style.opacity = '1'
                }
            } else if (phase === 1) {
                // Hold + subtle pulse
                points.rotation.y += 0.001
                ring.material.opacity = Math.sin(phaseTimer * 2) * 0.3 + 0.1
                if (phaseTimer > 2) {
                    phase = 2
                    phaseTimer = 0
                }
            } else if (phase === 2) {
                // Shine burst
                const t = phaseTimer / 0.8
                ring.material.opacity = Math.max(0, 1 - t)
                material.opacity = Math.max(0, 1 - t * 1.5)
                overlay.style.opacity = String(Math.max(0, 1 - t))
                points.rotation.y += 0.004
                if (phaseTimer > 1) {
                    phase = 3
                    phaseTimer = 0
                }
            } else if (phase === 3) {
                cancelAnimationFrame(rafId)
                onComplete()
                return
            }

            renderer.render(scene, camera)
        }

        animate()

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('resize', handleResize)
            geometry.dispose()
            material.dispose()
            renderer.dispose()
            if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
            if (mount.contains(overlay)) mount.removeChild(overlay)
        }
    }, [onComplete])

    return <div ref={mountRef} className="intro-scene" />
}
