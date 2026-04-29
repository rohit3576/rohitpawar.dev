import { Float, MeshDistortMaterial, Environment, Lightformer } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { memo, useRef } from 'react';
import type { Mesh } from 'three';

const CoreObject = memo(() => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.18;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.28;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.9}>
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1.75, 5]} />
        <MeshDistortMaterial
          color="#c8ff7a"
          roughness={0.28}
          metalness={0.72}
          distort={0.22}
          speed={1.3}
          envMapIntensity={1.1}
        />
      </mesh>
      <mesh rotation={[0.7, 0.15, 0.2]}>
        <torusGeometry args={[2.25, 0.012, 12, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.36} />
      </mesh>
      <mesh rotation={[-0.42, 0.8, 0.28]}>
        <torusGeometry args={[2.7, 0.01, 12, 160]} />
        <meshBasicMaterial color="#6af4ff" transparent opacity={0.28} />
      </mesh>
    </Float>
  );
});

CoreObject.displayName = 'CoreObject';

export const HeroScene = () => (
  <Canvas
    className="hero-canvas"
    dpr={[1, 1.6]}
    camera={{ position: [0, 0, 6], fov: 42 }}
    gl={{ antialias: true, powerPreference: 'high-performance' }}
  >
    <color attach="background" args={['#08090b']} />
    <ambientLight intensity={0.45} />
    <directionalLight position={[4, 4, 4]} intensity={2.4} />
    <pointLight position={[-3, -2, 3]} intensity={3.2} color="#79f2ff" />
    <Environment resolution={128}>
      <Lightformer position={[0, 5, -4]} scale={[10, 5, 1]} intensity={2.2} color="#ffffff" />
      <Lightformer position={[-5, -2, 3]} scale={[4, 4, 1]} intensity={1.8} color="#85f8ff" />
      <Lightformer position={[5, 0, 4]} scale={[5, 3, 1]} intensity={2} color="#c8ff7a" />
    </Environment>
    <CoreObject />
  </Canvas>
);
