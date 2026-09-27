import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Grid, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// Placeholder Drone component (will be replaced with .glb when available)
function DroneModel({ isScanning }) {
  const droneRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (droneRef.current) {
      // Gentle hover animation
      droneRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1

      // Rotation during scan
      if (isScanning) {
        droneRef.current.rotation.y += 0.05
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={droneRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {/* Body */}
        <mesh>
          <boxGeometry args={[0.8, 0.15, 0.5]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Arms */}
        <mesh position={[0.6, 0, 0]}>
          <boxGeometry args={[0.8, 0.08, 0.08]} />
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-0.6, 0, 0]}>
          <boxGeometry args={[0.8, 0.08, 0.08]} />
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.4]}>
          <boxGeometry args={[0.08, 0.08, 0.6]} />
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.4]}>
          <boxGeometry args={[0.08, 0.08, 0.6]} />
          <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Rotors (4) */}
        {[
          [0.9, 0.08, 0.45],
          [-0.9, 0.08, 0.45],
          [0.9, 0.08, -0.45],
          [-0.9, 0.08, -0.45],
        ].map((pos, i) => (
          <group key={i} position={pos}>
            <mesh rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.25, 0.25, 0.02, 32]} />
              <meshStandardMaterial
                color="#00FF88"
                emissive="#00FF88"
                emissiveIntensity={0.3}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        ))}

        {/* Camera/Sensor */}
        <mesh position={[0, -0.1, 0.3]}>
          <cylinderGeometry args={[0.1, 0.15, 0.1, 16]} />
          <meshStandardMaterial
            color="#FF6B35"
            emissive="#FF6B35"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* LED lights */}
        <pointLight position={[0, 0.2, 0]} color="#00FF88" intensity={2} distance={3} />
        <pointLight position={[0, -0.2, 0.3]} color="#FF6B35" intensity={1} distance={2} />
      </group>
    </Float>
  )
}

// Scan effect component
function ScanEffect({ active }) {
  const gridRef = useRef()

  useFrame((state) => {
    if (gridRef.current && active) {
      gridRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.5
    }
  })

  if (!active) return null

  return (
    <group>
      <Grid
        ref={gridRef}
        position={[0, -1.5, 0]}
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#00D4FF"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#00FF88"
        fadeDistance={15}
        fadeStrength={1}
        infiniteGrid
      />
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 3, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function DroneCanvas({ isScanning, selectedDrone }) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-forest-black to-forest-dark">
      <Canvas
        camera={{ position: [3, 2, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          color="#ffffff"
        />
        <pointLight position={[-3, 3, -3]} intensity={0.5} color="#00D4FF" />
        <pointLight position={[3, 2, -3]} intensity={0.3} color="#FF6B35" />

        {/* Drone */}
        <DroneModel isScanning={isScanning} />

        {/* Scan Effect */}
        <ScanEffect active={isScanning} />

        {/* Ground plane */}
        <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#0A0F0D" />
        </mesh>

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />

        {/* Environment */}
        <Environment preset="city" />
      </Canvas>

      {/* Drone Info Overlay */}
      <div className="absolute top-4 left-4 glass-panel rounded-lg p-3">
        <div className="text-xs font-orbitron text-tech-cyan">CURRENT DRONE</div>
        <div className="text-sm font-mono text-text-primary">{selectedDrone.name}</div>
        <div className="text-xs text-text-muted mt-1">
          Status: <span className="text-neon-green">{selectedDrone.status}</span>
        </div>
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-4 right-4 glass-panel rounded-lg p-2 text-xs text-text-muted">
        <div>Drag to rotate • Scroll to zoom</div>
      </div>
    </div>
  )
}

export default DroneCanvas