import { Component, Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Float, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import * as THREE from "three";

class AvatarSceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function AvatarModel({ isMobile }) {
  const modelRef = useRef();
  const { scene } = useGLTF("/models/avatar.glb");

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = isMobile ? 2.1 : 2.7;
    const scale = targetSize / maxDimension;

    clone.position.sub(center);
    clone.scale.setScalar(scale);
    return clone;
  }, [isMobile, scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.sin(t * 0.55) * 0.2;
      modelRef.current.rotation.x = Math.sin(t * 0.35) * 0.045;
      modelRef.current.position.y = Math.sin(t * 0.9) * 0.06;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={isMobile ? 0.12 : 0.2} floatIntensity={isMobile ? 0.2 : 0.3}>
      <Center>
        <primitive ref={modelRef} object={clonedScene} />
      </Center>
    </Float>
  );
}

function Scene({ isMobile }) {
  const cameraRef = useRef();

  useFrame((state) => {
    const [mx, my] = state.pointer;
    const targetX = isMobile ? 0 : mx * 0.2;
    const targetY = isMobile ? 0.05 : my * 0.1 + 0.05;
    cameraRef.current.position.x = THREE.MathUtils.lerp(cameraRef.current.position.x, targetX, 0.05);
    cameraRef.current.position.y = THREE.MathUtils.lerp(cameraRef.current.position.y, targetY, 0.05);
    cameraRef.current.lookAt(0, 0.1, 0);
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0.1, isMobile ? 4.4 : 5.3]} fov={isMobile ? 34 : 30} />
      <ambientLight intensity={0.9} />
      <spotLight position={[2, 4, 5]} intensity={1.1} angle={0.38} penumbra={0.8} color="#ffffff" />
      <pointLight position={[-3, 0, 2]} intensity={0.45} color="#93c5fd" />
      <pointLight position={[0, -2, -2]} intensity={0.3} color="#bfdbfe" />
      <AvatarSceneErrorBoundary fallback={<SafeFallbackAvatar isMobile={isMobile} />}>
        <Suspense fallback={null}>
          <AvatarModel isMobile={isMobile} />
        </Suspense>
      </AvatarSceneErrorBoundary>
      {!isMobile && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />}
    </>
  );
}

function SafeFallbackAvatar({ isMobile }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.55) * 0.18;
      ref.current.rotation.x = Math.sin(t * 0.4) * 0.04;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.25}>
      <mesh ref={ref} scale={isMobile ? 0.8 : 1}>
        <icosahedronGeometry args={[0.9, 2]} />
        <meshStandardMaterial color="#8dc4ff" roughness={0.26} metalness={0.18} />
      </mesh>
    </Float>
  );
}

function HeroAvatarScene({ isMobile }) {
  return (
    <Canvas dpr={isMobile ? [1, 1.2] : [1, 1.7]} gl={{ antialias: !isMobile, alpha: true }}>
      <Scene isMobile={isMobile} />
    </Canvas>
  );
}

useGLTF.preload("/models/avatar.glb");

export default HeroAvatarScene;
