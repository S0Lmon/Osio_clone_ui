import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Cảnh 3D — tách riêng và nạp chậm (React.lazy) có chủ đích.
 *
 * three.js chiếm gần như toàn bộ 970 kB bundle. Chế độ mặc định của dashboard là
 * "Lưới mức độ" — nơi thật sự ra quyết định — nên không có lý do gì bắt mọi lần
 * mở trang phải tải three.js. Chỉ khi người dùng bấm sang tab 3D mới tải.
 */
function DroneModel({ isScanning }) {
  const groupRef = useRef();
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.12;
      if (isScanning) groupRef.current.rotation.y += 0.04;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.5, 0.1, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.2} />
      </mesh>
      {[[0.35, 0, 0], [-0.35, 0, 0]].map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.35, 0.04, 0.04]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      ))}
      {[[0, 0, 0.2], [0, 0, -0.2]].map((p, i) => (
        <mesh key={`b${i}`} position={p}>
          <boxGeometry args={[0.04, 0.04, 0.3]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      ))}
      {[[0.5, 0.06, 0.25], [-0.5, 0.06, 0.25], [0.5, 0.06, -0.25], [-0.5, 0.06, -0.25]].map((pos, i) => (
        <mesh key={`r${i}`} position={pos}>
          <cylinderGeometry args={[0.12, 0.12, 0.01, 32]} />
          <meshStandardMaterial
            color={isScanning ? '#00d4ff' : '#4CAF50'}
            emissive={isScanning ? '#00d4ff' : '#4CAF50'}
            emissiveIntensity={isScanning ? 1 : 0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      <pointLight position={[0, 0.15, 0]} color="#4CAF50" intensity={isScanning ? 2.5 : 1.2} distance={4} />
    </group>
  );
}

function ScanRing({ active }) {
  const ringRef = useRef();
  useFrame((state) => {
    if (ringRef.current && active) {
      ringRef.current.rotation.z += 0.025;
      ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 5) * 0.25);
    }
  });
  if (!active) return null;
  return (
    <mesh ref={ringRef} position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.2, 1.5, 64]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Scene({ isScanning }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[-4, 4, -4]} intensity={0.5} color="#00d4ff" />
      <Float speed={1.5}>
        <group position={[0, 0.5, 0]}>
          <DroneModel isScanning={isScanning} />
        </group>
      </Float>
      <group position={[0, -1, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[25, 25]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>
        <gridHelper args={[25, 50, '#4CAF5020', '#1a1a1a']} />
      </group>
      <ScanRing active={isScanning} />
      <OrbitControls enablePan minDistance={3} maxDistance={14} minPolarAngle={Math.PI / 8} maxPolarAngle={Math.PI / 2.2} />
    </>
  );
}

export default function Drone3DView({ isScanning }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [4, 3.5, 6.5], fov: 42 }} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Scene isScanning={isScanning} />
        </Suspense>
      </Canvas>
      <div className="controls-hint">Kéo để xoay • Lăn chuột để phóng</div>
    </div>
  );
}
