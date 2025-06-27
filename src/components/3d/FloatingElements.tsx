import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text3D, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Floating Navigation Button
export function FloatingNavButton({
  position,
  text,
  color = "#9333ea",
  onClick,
}: {
  position: [number, number, number];
  text: string;
  color?: string;
  onClick?: () => void;
}) {
  const buttonRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (buttonRef.current) {
      buttonRef.current.rotation.y += 0.01;
      buttonRef.current.position.y +=
        Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.02;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group
        ref={buttonRef}
        position={position}
        onClick={onClick}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        {/* Button background */}
        <Sphere args={[0.8, 32, 32]}>
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={0.7}
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>

        {/* Button text */}
        <Text3D
          font="/fonts/SpaceGrotesk-Bold.json"
          size={0.15}
          height={0.05}
          position={[-0.3, 0, 0.9]}
        >
          {text}
          <meshBasicMaterial color="#ffffff" />
        </Text3D>

        {/* Glow effect */}
        <Sphere args={[1, 32, 32]}>
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </Sphere>
      </group>
    </Float>
  );
}

// Floating Info Panel
export function FloatingInfoPanel({
  position,
  title,
  content,
  color = "#fbbf24",
}: {
  position: [number, number, number];
  title: string;
  content: string;
  color?: string;
}) {
  const panelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (panelRef.current) {
      panelRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      panelRef.current.position.y +=
        Math.sin(state.clock.elapsedTime + position[0]) * 0.01;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={panelRef} position={position}>
        {/* Panel background */}
        <mesh>
          <boxGeometry args={[2, 1, 0.1]} />
          <MeshDistortMaterial
            color="#1a1a2e"
            transparent
            opacity={0.8}
            distort={0.1}
            speed={1}
          />
        </mesh>

        {/* Panel border */}
        <mesh>
          <boxGeometry args={[2.1, 1.1, 0.05]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>

        {/* Title */}
        <Text3D
          font="/fonts/SpaceGrotesk-Bold.json"
          size={0.1}
          height={0.02}
          position={[-0.8, 0.3, 0.06]}
        >
          {title}
          <meshBasicMaterial color={color} />
        </Text3D>

        {/* Content */}
        <Text3D
          font="/fonts/SpaceGrotesk-Regular.json"
          size={0.06}
          height={0.01}
          position={[-0.8, 0.1, 0.06]}
        >
          {content.length > 50 ? content.substring(0, 50) + "..." : content}
          <meshBasicMaterial color="#ffffff" />
        </Text3D>
      </group>
    </Float>
  );
}

// Floating Achievement Badge
export function FloatingAchievement({
  position,
  achievement,
  show = false,
}: {
  position: [number, number, number];
  achievement: string;
  show?: boolean;
}) {
  const badgeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (badgeRef.current && show) {
      badgeRef.current.rotation.y += 0.03;
      badgeRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 3) * 0.1,
      );
    }
  });

  if (!show) return null;

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={badgeRef} position={position}>
        {/* Achievement glow */}
        <Sphere args={[1.5, 32, 32]}>
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.2} />
        </Sphere>

        {/* Achievement badge */}
        <Sphere args={[0.8, 32, 32]}>
          <MeshDistortMaterial
            color="#fbbf24"
            transparent
            opacity={0.9}
            distort={0.2}
            speed={3}
            metalness={1}
            roughness={0}
          />
        </Sphere>

        {/* Achievement text */}
        <Text3D
          font="/fonts/SpaceGrotesk-Bold.json"
          size={0.08}
          height={0.02}
          position={[-0.4, 0, 0.9]}
        >
          🏆 {achievement}
          <meshBasicMaterial color="#000000" />
        </Text3D>

        {/* Sparkle particles */}
        {Array.from({ length: 12 }, (_, i) => (
          <Sphere
            key={i}
            args={[0.02, 8, 8]}
            position={[
              Math.sin((i / 12) * Math.PI * 2) * 1.2,
              Math.cos((i / 12) * Math.PI * 2) * 1.2,
              Math.sin((i / 12) * Math.PI * 4) * 0.3,
            ]}
          >
            <meshBasicMaterial color="#ffffff" />
          </Sphere>
        ))}
      </group>
    </Float>
  );
}

// Animated Logo 3D
export function AnimatedLogo3D({
  position,
}: {
  position: [number, number, number];
}) {
  const logoRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (logoRef.current) {
      logoRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      logoRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
      logoRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.02;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={logoRef} position={position}>
        {/* Logo sphere */}
        <Sphere args={[1, 32, 32]}>
          <MeshDistortMaterial
            color="#9333ea"
            transparent
            opacity={0.8}
            distort={0.4}
            speed={2}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>

        {/* Logo rings */}
        {[1.2, 1.5, 1.8].map((radius, index) => (
          <mesh
            key={index}
            rotation={[Math.PI / 2 + index * 0.3, 0, index * 0.5]}
          >
            <ringGeometry args={[radius, radius + 0.05, 64]} />
            <meshBasicMaterial
              color="#fbbf24"
              transparent
              opacity={0.6 - index * 0.1}
            />
          </mesh>
        ))}

        {/* Logo text */}
        <Text3D
          font="/fonts/SpaceGrotesk-Bold.json"
          size={0.2}
          height={0.05}
          position={[-0.8, -1.5, 0]}
        >
          COSMIC
          <meshBasicMaterial color="#fbbf24" />
        </Text3D>

        <Text3D
          font="/fonts/SpaceGrotesk-Bold.json"
          size={0.15}
          height={0.03}
          position={[-0.6, -1.8, 0]}
        >
          CHRONICLE
          <meshBasicMaterial color="#9333ea" />
        </Text3D>
      </group>
    </Float>
  );
}
