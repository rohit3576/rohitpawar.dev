import { Billboard, Environment, Float, Html, Lightformer, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { memo, useMemo, useRef } from 'react';
import type { Group } from 'three';
import { techStack } from '../../data/portfolio';

const OrbitingStack = memo(() => {
  const groupRef = useRef<Group>(null);
  const points = useMemo(
    () =>
      techStack.map((label, index) => {
        const angle = (index / techStack.length) * Math.PI * 2;
        const radius = index % 2 === 0 ? 2.55 : 1.85;
        const y = ((index % 5) - 2) * 0.42;
        return {
          label,
          position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number],
        };
      }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.78, 32, 32]} />
        <meshStandardMaterial color="#101318" roughness={0.26} metalness={0.7} envMapIntensity={1.2} />
      </mesh>
      <mesh>
        <torusKnotGeometry args={[1.08, 0.01, 128, 8]} />
        <meshBasicMaterial color="#c8ff7a" transparent opacity={0.62} />
      </mesh>
      {points.map((point, index) => (
        <Float key={point.label} speed={1 + index * 0.03} floatIntensity={0.18} rotationIntensity={0.08}>
          <Billboard position={point.position}>
            <Html center transform distanceFactor={7}>
              <span className="tech-pill-3d">{point.label}</span>
            </Html>
          </Billboard>
        </Float>
      ))}
    </group>
  );
});

OrbitingStack.displayName = 'OrbitingStack';

export const TechOrbitScene = () => (
  <Canvas
    className="stack-canvas"
    dpr={[1, 1.45]}
    camera={{ position: [0, 1.2, 6.4], fov: 46 }}
    gl={{ antialias: true, powerPreference: 'high-performance' }}
  >
    <ambientLight intensity={0.55} />
    <directionalLight position={[3, 4, 5]} intensity={1.7} />
    <Environment resolution={128}>
      <Lightformer position={[0, 4, -4]} scale={[8, 4, 1]} intensity={2.4} color="#ffffff" />
      <Lightformer position={[4, -2, 2]} scale={[5, 4, 1]} intensity={1.6} color="#c8ff7a" />
      <Lightformer position={[-5, 0, 3]} scale={[5, 5, 1]} intensity={1.7} color="#6af4ff" />
    </Environment>
    <OrbitingStack />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
  </Canvas>
);
