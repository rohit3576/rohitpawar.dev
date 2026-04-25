import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function FloatingOrbs({ count = 24, speed = 1, opacity = 0.28, depthOffset = 0 }) {
  const groupRef = useRef();

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = i * 1.618;
        return {
          id: i,
          position: [
            Math.sin(seed) * 6,
            Math.cos(seed * 1.2) * 4,
            Math.sin(seed * 1.7) * 5 + depthOffset,
          ],
          scale: 0.08 + ((i % 6) * 0.018),
        };
      }),
    [count, depthOffset]
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05 * speed;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1 * speed;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p) => (
        <mesh key={p.id} position={p.position} scale={p.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#9cc9ff"
            transparent
            opacity={opacity}
            roughness={0.22}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent({ scrollProgress = 0, isMobile, isDesktop }) {
  const particleCount = isMobile ? 6 : isDesktop ? 22 : 14;
  const cameraRef = useRef();
  const haloRef = useRef();
  const ambientRef = useRef();
  const spotRef = useRef();

  useFrame((state) => {
    const [mx, my] = state.pointer;

    const targetX = (isDesktop ? mx * 0.26 : 0) + scrollProgress * 0.14;
    const targetY = (isDesktop ? my * 0.12 : 0) + scrollProgress * -0.2;
    const targetZ = isMobile ? 7.1 - scrollProgress * 0.55 : 6.2 - scrollProgress * 0.95;

    cameraRef.current.position.x = THREE.MathUtils.lerp(
      cameraRef.current.position.x,
      targetX,
      0.05
    );

    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      targetY,
      0.05
    );

    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      targetZ,
      0.05
    );

    cameraRef.current.lookAt(0, 0.05, 0);

    if (haloRef.current) {
      haloRef.current.material.opacity = THREE.MathUtils.lerp(haloRef.current.material.opacity, 0.18 + scrollProgress * 0.25, 0.06);
      haloRef.current.rotation.z += 0.0015;
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, isMobile ? 0.42 : 0.52 + scrollProgress * 0.34, 0.06);
    }

    if (spotRef.current) {
      spotRef.current.intensity = THREE.MathUtils.lerp(spotRef.current.intensity, 0.85 + scrollProgress * 0.65, 0.06);
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={isMobile ? [0, 0.04, 7.1] : [0, 0.06, 6.2]}
        fov={isMobile ? 47 : 38}
      />

      <ambientLight ref={ambientRef} intensity={0.4} color="#e2ecff" />
      <directionalLight position={[2, 3, 4]} intensity={0.45} color="#cfdfff" />
      <spotLight ref={spotRef} position={[0, 4.2, 3.5]} intensity={0.7} angle={0.4} penumbra={0.95} color="#f8fbff" />
      <pointLight position={[0, -1.5, 2]} intensity={0.35} color="#7eb6ff" />

      <mesh ref={haloRef} position={[0, 0.1, -1.65]}>
        <ringGeometry args={[2.45, 3.15, 72]} />
        <meshBasicMaterial color="#8dbbff" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>

      <FloatingOrbs count={particleCount} speed={0.5} opacity={0.14} depthOffset={-2.8} />
      <FloatingOrbs count={particleCount} speed={0.75} opacity={0.2} depthOffset={0} />
      {!isMobile && <FloatingOrbs count={particleCount - 3} speed={1} opacity={0.3} depthOffset={2.4} />}

      {!isMobile && <Environment preset="city" />}
    </>
  );
}

/* ---------------- ROOT CANVAS ---------------- */
function ThreeScene({
  scrollProgress = 0,
  isMobile = false,
  isDesktop = true,
}) {
  return (
    <Canvas
      dpr={isMobile ? [1, 1.2] : [1, 1.6]}
      gl={{ antialias: !isMobile, alpha: true }}
      camera={{ position: [0, 0, 7] }}
    >
      <Suspense fallback={null}>
        <SceneContent
          scrollProgress={scrollProgress}
          isMobile={isMobile}
          isDesktop={isDesktop}
        />
      </Suspense>
    </Canvas>
  );
}

export default ThreeScene;