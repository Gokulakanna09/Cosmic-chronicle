import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Sphere,
  MeshDistortMaterial,
  Stars,
  OrbitControls,
  Float,
  Ring,
  Torus,
  Text,
} from "@react-three/drei";
import { AnimatedLogo3D } from "./FloatingElements";
import {
  Performance3DMonitor,
  AdaptiveLOD,
  FrustumCulling,
} from "./Performance3D";
import * as THREE from "three";

// Animated Planet Component
function Planet({
  position,
  size = 1,
  color = "#4f46e5",
  distortionSpeed = 2,
  distortionStrength = 0.3,
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.02;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distortionStrength}
          speed={distortionSpeed}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Animated Ring System
function RingSystem({ position, radius = 3, color = "#fbbf24" }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.02;
      ringRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <Ring ref={ringRef} args={[radius, radius + 0.1, 64]}>
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </Ring>
      <Ring args={[radius + 0.5, radius + 0.6, 64]}>
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </Ring>
    </group>
  );
}

// 3D Constellation
function Constellation3D() {
  const points = useMemo(() => {
    const pts = [];
    // Create a 3D constellation pattern
    pts.push(new THREE.Vector3(-2, 2, 0));
    pts.push(new THREE.Vector3(0, 3, 1));
    pts.push(new THREE.Vector3(2, 2, -1));
    pts.push(new THREE.Vector3(1, 0, 0));
    pts.push(new THREE.Vector3(-1, -1, 1));
    return pts;
  }, []);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <group position={[5, 0, -3]}>
      {/* Constellation lines */}
      <line geometry={lineGeometry}>
        <lineBasicMaterial color="#9333ea" transparent opacity={0.8} />
      </line>
      {/* Constellation stars */}
      {points.map((point, index) => (
        <Sphere
          key={index}
          args={[0.05, 16, 16]}
          position={[point.x, point.y, point.z]}
        >
          <meshBasicMaterial color="#fbbf24" />
        </Sphere>
      ))}
    </group>
  );
}

// Floating Space Debris
function SpaceDebris() {
  const count = 50;
  const debris = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: Math.random() * 0.1 + 0.05,
      speed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  const debrisRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    debrisRefs.current.forEach((ref, i) => {
      if (ref) {
        ref.rotation.x += debris[i].speed;
        ref.rotation.y += debris[i].speed * 0.5;
        ref.position.y += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
    });
  });

  return (
    <>
      {debris.map((item, index) => (
        <Torus
          key={index}
          ref={(el) => (debrisRefs.current[index] = el)}
          args={[item.scale, item.scale * 0.3, 8, 16]}
          position={item.position}
          rotation={item.rotation}
        >
          <meshBasicMaterial color="#4f46e5" transparent opacity={0.4} />
        </Torus>
      ))}
    </>
  );
}

// Animated Background Grid
function GridBackground() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.rotation.y += 0.005;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[30, 30, "#9333ea", "#4f46e5"]}
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

// Camera Animation
function CameraController() {
  const { camera } = useThree();

  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
    camera.position.z = Math.cos(state.clock.elapsedTime * 0.1) * 2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main 3D Scene
function Scene3D() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fbbf24" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9333ea" />

      {/* Camera Controller */}
      <CameraController />

      {/* 3D Stars */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />

      {/* Planets */}
      <Planet
        position={[-4, 1, -2]}
        size={0.8}
        color="#3b82f6"
        distortionSpeed={3}
        distortionStrength={0.4}
      />
      <Planet
        position={[3, -1, -4]}
        size={1.2}
        color="#ec4899"
        distortionSpeed={2}
        distortionStrength={0.6}
      />
      <Planet
        position={[0, 3, -6]}
        size={0.6}
        color="#fbbf24"
        distortionSpeed={4}
        distortionStrength={0.3}
      />

      {/* Ring Systems */}
      <RingSystem position={[-4, 1, -2]} radius={1.5} color="#3b82f6" />
      <RingSystem position={[3, -1, -4]} radius={2} color="#ec4899" />

      {/* 3D Constellation */}
      <Constellation3D />

      {/* Space Debris */}
      <SpaceDebris />

      {/* Background Grid */}
      <GridBackground />

      {/* 3D Logo */}
      <AnimatedLogo3D position={[0, 2, -3]} />

      {/* Orbit Controls for interaction */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

// Main Component
const CosmicScene = () => {
  const [performanceLevel, setPerformanceLevel] = useState<
    "low" | "medium" | "high"
  >("high");

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{
          alpha: true,
          antialias: performanceLevel === "high",
          powerPreference: "high-performance",
        }}
        dpr={performanceLevel === "low" ? 1 : window.devicePixelRatio}
        frameloop="demand"
      >
        <Performance3DMonitor onPerformanceChange={setPerformanceLevel} />
        <AdaptiveLOD>
          <FrustumCulling>
            <Scene3D />
          </FrustumCulling>
        </AdaptiveLOD>
      </Canvas>
    </div>
  );
};

export default CosmicScene;
