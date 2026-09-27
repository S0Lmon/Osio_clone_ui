import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, useGLTF } from '@react-three/drei'
import { MapPin, Crosshair, Layers } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Mock disease locations
const diseaseMarkers = [
  { id: 1, lat: 12.458, lng: 108.275, type: 'rust', severity: 'HIGH', area: 'Vùng A' },
  { id: 2, lat: 12.462, lng: 108.280, type: 'leaf_spot', severity: 'MEDIUM', area: 'Vùng B' },
  { id: 3, lat: 12.455, lng: 108.270, type: 'rust', severity: 'LOW', area: 'Vùng C' },
  { id: 4, lat: 12.460, lng: 108.285, type: 'anthracnose', severity: 'HIGH', area: 'Vùng D' },
]

// Drone 3D Model (placeholder - can be replaced with .glb)
function DroneModel({ position, isScanning }) {
  const droneRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (droneRef.current) {
      // Floating animation
      droneRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.15

      // Scanning rotation
      if (isScanning) {
        droneRef.current.rotation.y += 0.08
      }
    }
  })

  return (
    <group
      ref={droneRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.6, 0.12, 0.4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Arms */}
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.6, 0.06, 0.06]} />
        <meshStandardMaterial color="#16213e" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.6, 0.06, 0.06]} />
        <meshStandardMaterial color="#16213e" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Rotors with glow */}
      {[
        [0.7, 0.06, 0.35],
        [-0.7, 0.06, 0.35],
        [0.7, 0.06, -0.35],
        [-0.7, 0.06, -0.35],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.18, 0.18, 0.015, 32]} />
          <meshStandardMaterial
            color={isScanning ? "#00D4FF" : "#00FF88"}
            emissive={isScanning ? "#00D4FF" : "#00FF88"}
            emissiveIntensity={isScanning ? 0.8 : 0.4}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Camera/Sensor */}
      <mesh position={[0, -0.08, 0.25]}>
        <cylinderGeometry args={[0.08, 0.12, 0.08, 16]} />
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF6B35"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* LED lights */}
      <pointLight position={[0, 0.15, 0]} color="#00FF88" intensity={isScanning ? 3 : 1.5} distance={4} />
      <pointLight position={[0, -0.15, 0.25]} color="#FF6B35" intensity={1} distance={2} />
    </group>
  )
}

// Scan effect ring
function ScanEffect({ active }) {
  const ringRef = useRef()

  useFrame((state) => {
    if (ringRef.current && active) {
      ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.2)
    }
  })

  if (!active) return null

  return (
    <mesh ref={ringRef} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2, 2.2, 64]} />
      <meshBasicMaterial color="#00D4FF" transparent opacity={0.4} side={2} />
    </mesh>
  )
}

// Disease marker on map
function DiseaseMarker({ marker, onClick }) {
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 1000)
    return () => clearInterval(interval)
  }, [])

  const getColor = () => {
    if (marker.type === 'rust') return '#FF6B35'
    if (marker.type === 'leaf_spot') return '#FF3366'
    return '#FFCC00'
  }

  const getPosition = () => {
    // Map lat/lng to 3D coordinates (simplified)
    const x = (marker.lng - 108.27) * 50
    const z = (marker.lat - 12.45) * 50
    return [x, -1, z]
  }

  return (
    <group position={getPosition()}>
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={getColor()}
          emissive={getColor()}
          emissiveIntensity={pulse ? 1 : 0.3}
        />
      </mesh>
      {pulse && (
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color={getColor()} transparent opacity={0.3} />
        </mesh>
      )}
      <Html position={[0, 0.5, 0]} center>
        <div
          onClick={() => onClick(marker)}
          className="px-2 py-1 rounded text-xs font-mono cursor-pointer"
          style={{ backgroundColor: getColor(), color: '#000' }}
        >
          {marker.severity}
        </div>
      </Html>
    </group>
  )
}

export default function Map3DCanvas({ isScanning, onDiseaseClick }) {
  const [dronePosition, setDronePosition] = useState([0, 1, 0])
  const [viewMode, setViewMode] = useState('3d') // '3d' or 'satellite'
  const [selectedMarker, setSelectedMarker] = useState(null)

  // Simulate drone flying
  useEffect(() => {
    if (!isScanning) {
      const interval = setInterval(() => {
        setDronePosition(prev => [
          Math.sin(Date.now() / 2000) * 3,
          1 + Math.sin(Date.now() / 1500) * 0.3,
          Math.cos(Date.now() / 2000) * 3
        ])
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isScanning])

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker)
    onDiseaseClick?.(marker)
  }

  return (
    <div className="relative w-full h-full bg-forest-black">
      {/* Map Background (simulated) */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 to-blue-900/20" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      {/* 3D Canvas */}
      <Canvas camera={{ position: [5, 4, 8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-3, 5, -3]} intensity={0.5} color="#00D4FF" />
        <pointLight position={[3, 3, -3]} intensity={0.3} color="#FF6B35" />

        {/* Drone */}
        <DroneModel position={dronePosition} isScanning={isScanning} />

        {/* Scan Effect */}
        <ScanEffect active={isScanning} />

        {/* Ground */}
        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#0A0F0D" />
        </mesh>

        {/* Disease Markers */}
        {diseaseMarkers.map(marker => (
          <DiseaseMarker
            key={marker.id}
            marker={marker}
            onClick={handleMarkerClick}
          />
        ))}

        <OrbitControls
          enablePan={true}
          minDistance={3}
          maxDistance={20}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>

      {/* Control Panel */}
      <div className="absolute top-4 left-4 glass-panel rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-4 h-4 text-tech-cyan" />
          <span className="text-xs font-orbitron text-text-muted">CHẾ ĐỘ</span>
        </div>
        <div className="flex gap-2">
          {['3d', 'vệ tinh', 'nhiệt'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                viewMode === mode
                  ? 'bg-neon-green/20 text-neon-green border border-neon-green'
                  : 'bg-forest-dark text-text-muted border border-white/10 hover:border-white/30'
              }`}
            >
              {mode === '3d' ? '3D' : mode === 'vệ tinh' ? '📡' : '🌡️'}
            </button>
          ))}
        </div>
      </div>

      {/* Scan Controls */}
      <div className="absolute bottom-4 left-4 glass-panel rounded-lg p-3">
        <div className="flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-rust-orange" />
          <span className="text-xs font-mono text-text-muted">
            Vị trí: {dronePosition[0].toFixed(2)}, {dronePosition[2].toFixed(2)}
          </span>
        </div>
      </div>

      {/* Disease Count */}
      <div className="absolute top-4 right-4 glass-panel rounded-lg p-3">
        <div className="text-xs font-orbitron text-alert-red mb-2">CẢNH BÁO BỆNH</div>
        <div className="flex gap-3">
          <div className="text-center">
            <div className="text-lg font-orbitron text-rust-orange">2</div>
            <div className="text-xs text-text-muted">Rỉ sắt</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-orbitron text-alert-red">1</div>
            <div className="text-xs text-text-muted">Đốm lá</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-orbitron text-yellow-400">1</div>
            <div className="text-xs text-text-muted">Thán thư</div>
          </div>
        </div>
      </div>

      {/* Selected Marker Info */}
      <AnimatePresence>
        {selectedMarker && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-4 glass-panel rounded-lg p-4 w-64"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-orbitron text-alert-red">{selectedMarker.area}</span>
              <button onClick={() => setSelectedMarker(null)} className="text-text-muted">✕</button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-text-muted">Loại bệnh:</span>
                <span className="text-rust-orange font-mono">{selectedMarker.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Mức độ:</span>
                <span className={selectedMarker.severity === 'HIGH' ? 'text-alert-red' : 'text-yellow-400'}>
                  {selectedMarker.severity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Tọa độ:</span>
                <span className="font-mono text-text-primary">
                  {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View hint */}
      <div className="absolute bottom-4 right-4 text-xs text-text-muted glass-panel rounded px-2 py-1">
        Kéo để xoay • Scroll để zoom
      </div>
    </div>
  )
}