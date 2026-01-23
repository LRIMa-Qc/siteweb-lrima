// ThreeWavesBackground.tsx
'use client'
import { useEffect, useRef } from 'react'

import type { PerspectiveCamera, Points, Scene, WebGLRenderer } from 'three'

export function ThreeWavesBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let renderer: WebGLRenderer,
      scene: Scene,
      camera: PerspectiveCamera,
      particles: Points,
      animationId: number
    let count = 0
    let mouseX = 0,
      mouseY = 0,
      targetMouseX = 0,
      targetMouseY = 0

    let width = window.innerWidth
    let height = window.innerHeight

    // Dynamically import THREE.js
    import('three').then((THREE) => {
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0xffffff)

      camera = new THREE.PerspectiveCamera(75, width / height, 2, 10000)
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(width, height)
      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement)
      }

      camera.position.x = 750
      camera.lookAt(scene.position)

      const amountX = 45
      const amountY = 200
      const spacer = 20
      const particlesCount = amountX * amountY

      // Wave params
      const waveFrequencyX = 0.15
      const waveFrequencyY = 0.2
      const waveAmplitude = 70
      const waveSpeed = 0.03
      const mouseStrength = 0.5

      const positions = new Float32Array(particlesCount * 3)
      let i = 0
      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          positions[i] = ix * spacer - (amountX * spacer) / 2
          positions[i + 1] = 0
          positions[i + 2] = iy * spacer - (amountY * spacer) / 2
          i += 3
        }
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      const material = new THREE.PointsMaterial({ color: 0x4ea3ff, size: 3 })
      particles = new THREE.Points(geometry, material)
      scene.add(particles)

      // Mouse events
      const handleMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', handleMouseMove)

      // Resize events
      const handleResize = () => {
        width = window.innerWidth
        height = window.innerHeight
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }
      window.addEventListener('resize', handleResize)

      function animate() {
        animationId = requestAnimationFrame(animate)
        render()
      }

      function render() {
        const positions = particles.geometry.attributes.position.array
        mouseX += (targetMouseX - mouseX) * 0.05
        mouseY += (targetMouseY - mouseY) * 0.05
        const maxWave = waveAmplitude * 2 + mouseStrength * 40 * 2
        const yOffset = -height / 2 + maxWave
        let i = 0
        for (let ix = 0; ix < amountX; ix++) {
          for (let iy = 0; iy < amountY; iy++) {
            let wave =
              Math.sin((ix + count) * waveFrequencyX) * waveAmplitude +
              Math.sin((iy + count) * waveFrequencyY) * waveAmplitude
            wave +=
              Math.sin(ix * 0.3 + mouseX * 6) * mouseStrength * 50 +
              Math.sin(iy * 0.3 + mouseY * 6) * mouseStrength * 50
            positions[i + 1] = wave + yOffset
            i += 3
          }
        }
        particles.geometry.attributes.position.needsUpdate = true
        renderer.render(scene, camera)
        count += waveSpeed
      }

      animate()

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
        if (renderer && renderer.domElement && containerRef.current) {
          containerRef.current.removeChild(renderer.domElement)
        }
        cancelAnimationFrame(animationId)
      }
    })
  }, [])

  return <div ref={containerRef} className="absolute inset-0 z-0 w-full h-full" />
}
