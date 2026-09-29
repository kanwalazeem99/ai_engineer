import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function DistortedOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.15;
    mesh.current.rotation.y = t * 0.2;
    // Subtle mouse influence
    const { x, y } = state.pointer;
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, x * 0.4, 0.05);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, y * 0.3, 0.05);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={mesh} args={[1.6, 6]}>
        <MeshDistortMaterial
          color="#c2562a"
          emissive="#1a1410"
          roughness={0.25}
          metalness={0.85}
          distort={0.45}
          speed={2}
        />
      </Icosahedron>
    </Float>
  );
}

function WireRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.3;
    ref.current.rotation.z = t * 0.1;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.6, 0.01, 8, 128]} />
      <meshBasicMaterial color="#1a1410" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#ff7a3d" />
        <DistortedOrb />
        <WireRing />
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  );
}
