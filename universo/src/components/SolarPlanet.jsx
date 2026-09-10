import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function mulberry32(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function createPlanetTexture(colors, seed, clouds = 0.18) {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  const rand = mulberry32(seed)

  const base = ctx.createLinearGradient(0, 0, 0, 512)
  base.addColorStop(0, colors[colors.length - 1])
  base.addColorStop(0.5, colors[Math.floor(colors.length / 2)])
  base.addColorStop(1, colors[0])
  ctx.fillStyle = base
  ctx.fillRect(0, 0, 1024, 512)

  const striped = [...colors].reverse()
  for (let i = 0; i < 9; i++) {
    ctx.globalAlpha = 0.1 + rand() * 0.22
    ctx.fillStyle = striped[i % striped.length]
    ctx.beginPath()
    ctx.ellipse(512, rand() * 512, 620, 18 + rand() * 64, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  for (let i = 0; i < 300; i++) {
    ctx.globalAlpha = 0.05 + rand() * 0.13
    ctx.fillStyle = colors[Math.floor(rand() * colors.length)]
    ctx.beginPath()
    ctx.ellipse(rand() * 1024, rand() * 512, 6 + rand() * 90, 4 + rand() * 44, rand() * Math.PI, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.globalAlpha = 1
  const data = ctx.getImageData(0, 0, 1024, 512)
  const px = data.data
  for (let i = 0; i < px.length; i += 4) {
    if (rand() < 0.16) {
      const lum = (rand() - 0.5) * 48
      px[i] = Math.min(255, Math.max(0, px[i] + lum))
      px[i + 1] = Math.min(255, Math.max(0, px[i + 1] + lum))
      px[i + 2] = Math.min(255, Math.max(0, px[i + 2] + lum))
    }
  }
  ctx.putImageData(data, 0, 0)

  if (clouds > 0) {
    for (let i = 0; i < 60; i++) {
      const y = rand() * 512
      const x = rand() * 1024
      const s = 40 + rand() * 160
      const g = ctx.createRadialGradient(x, y, 0, x, y, s)
      g.addColorStop(0, `rgba(255,255,255,${(0.25 + rand() * 0.4) * clouds})`)
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.ellipse(x, y, s, s * 0.34, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

const atmosphereVertex = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const atmosphereFragment = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
    gl_FragColor = vec4(0.38, 0.62, 1.0, 1.0) * intensity;
  }
`

export default function SolarPlanet({
  radius = 1.5,
  colors,
  seed = 7,
  clouds = 0.16,
  rotationSpeed = 0.12,
  tilt = [0, 0, 0],
}) {
  const mesh = useRef(null)
  const cloudMesh = useRef(null)

  const texture = useMemo(() => createPlanetTexture(colors, seed, 0), [colors, seed])
  const cloudTexture = useMemo(
    () => (clouds > 0 ? createPlanetTexture(colors, seed + 99, clouds) : null),
    [colors, seed, clouds],
  )

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * rotationSpeed
    if (cloudMesh.current) cloudMesh.current.rotation.y += delta * rotationSpeed * 0.72
  })

  return (
    <group rotation={tilt}>
      <mesh ref={mesh}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={0.85} metalness={0.04} />
      </mesh>

      {clouds > 0 && (
        <mesh ref={cloudMesh}>
          <sphereGeometry args={[radius * 1.015, 64, 64]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            opacity={0.7}
            depthWrite={false}
            roughness={1}
          />
        </mesh>
      )}

      <mesh scale={1.14}>
        <sphereGeometry args={[radius, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}