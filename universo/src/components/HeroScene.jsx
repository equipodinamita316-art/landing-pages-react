import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sparkles, Stars } from '@react-three/drei'
import SolarPlanet from './SolarPlanet.jsx'

const EARTH_COLORS = ['#06283D', '#0E7490', '#1D6FB8', '#2E7D32', '#6BAF5B', '#C2B280', '#E8E6DD', '#A8D8FF']
const PLANET_POS = [2.4, -0.25, 0]

function OrbitingMoon({ radius = 2.25, speed = 0.35 }) {
  const pivot = useRef(null)
  useFrame((_, delta) => {
    if (pivot.current) pivot.current.rotation.y += delta * speed
  })
  return (
    <group ref={pivot} position={PLANET_POS}>
      <mesh position={[radius, 0.08, 0]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
      </mesh>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 3, 4]} intensity={2.4} />
      <pointLight position={[-6, -2, -4]} intensity={0.6} color="#5b21b6" />

      <Stars radius={90} depth={50} count={2800} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={70} scale={14} size={2.6} speed={0.4} color="#a5b4fc" opacity={0.5} />

      <group position={PLANET_POS}>
        <SolarPlanet
          radius={1.45}
          colors={EARTH_COLORS}
          seed={7}
          clouds={0.24}
          rotationSpeed={0.1}
          tilt={[0.32, 0, 0]}
        />

        <mesh rotation={[1.45, 0, 0]}>
          <torusGeometry args={[2.2, 0.012, 16, 128]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[1.05, 0.55, 0]}>
          <torusGeometry args={[2.75, 0.008, 16, 128]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
        </mesh>
      </group>

      <OrbitingMoon />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        target={PLANET_POS}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI - Math.PI / 3.2}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
      />
    </Canvas>
  )
}