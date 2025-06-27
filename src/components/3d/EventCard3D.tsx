import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Text,
  Image,
  Float,
  MeshDistortMaterial,
  Sphere,
} from "@react-three/drei";
import * as THREE from "three";

interface EventCard3DProps {
  title: string;
  year: number;
  description: string;
  imageUrl: string;
  position: [number, number, number];
  type: string;
  significance: string;
  onClick?: () => void;
}

function EventCard3D({
  title,
  year,
  description,
  imageUrl,
  position,
  type,
  significance,
  onClick,
}: EventCard3DProps) {
  const cardRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { viewport } = useThree();

  useFrame((state) => {
    if (cardRef.current) {
      // Floating animation
      cardRef.current.position.y +=
        Math.sin(state.clock.elapsedTime + position[0]) * 0.01;

      // Hover rotation effect
      if (hovered) {
        cardRef.current.rotation.y = THREE.MathUtils.lerp(
          cardRef.current.rotation.y,
          Math.sin(state.clock.elapsedTime * 2) * 0.1,
          0.1,
        );
        cardRef.current.scale.setScalar(
          THREE.MathUtils.lerp(cardRef.current.scale.x, 1.1, 0.1),
        );
      } else {
        cardRef.current.rotation.y = THREE.MathUtils.lerp(
          cardRef.current.rotation.y,
          0,
          0.1,
        );
        cardRef.current.scale.setScalar(
          THREE.MathUtils.lerp(cardRef.current.scale.x, 1, 0.1),
        );
      }
    }
  });

  const getSignificanceColor = (sig: string) => {
    switch (sig) {
      case "high":
        return "#fbbf24"; // cosmic-gold
      case "medium":
        return "#3b82f6"; // cosmic-blue
      case "low":
        return "#9333ea"; // cosmic-purple
      default:
        return "#3b82f6";
    }
  };

  const getTypeIcon = (eventType: string) => {
    switch (eventType) {
      case "discovery":
        return "🔭";
      case "mission":
        return "🚀";
      case "observation":
        return "👁";
      case "phenomenon":
        return "⭐";
      case "anniversary":
        return "📅";
      default:
        return "🌟";
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group
        ref={cardRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => {
          setClicked(!clicked);
          onClick?.();
        }}
      >
        {/* Main Card Background */}
        <RoundedBox args={[3, 4, 0.2]} radius={0.1} smoothness={4}>
          <MeshDistortMaterial
            color={hovered ? "#1a1a2e" : "#16213e"}
            transparent
            opacity={0.9}
            distort={hovered ? 0.1 : 0.05}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </RoundedBox>

        {/* Glowing Border */}
        <RoundedBox args={[3.1, 4.1, 0.15]} radius={0.12} smoothness={4}>
          <meshBasicMaterial
            color={getSignificanceColor(significance)}
            transparent
            opacity={hovered ? 0.6 : 0.3}
          />
        </RoundedBox>

        {/* Title */}
        <Text
          position={[0, 1.5, 0.11]}
          fontSize={0.2}
          maxWidth={2.5}
          lineHeight={1}
          textAlign="center"
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SpaceGrotesk-Bold.woff"
        >
          {title}
        </Text>

        {/* Year Badge */}
        <group position={[1, 1.5, 0.15]}>
          <RoundedBox args={[0.6, 0.3, 0.05]} radius={0.05}>
            <meshBasicMaterial color={getSignificanceColor(significance)} />
          </RoundedBox>
          <Text
            position={[0, 0, 0.03]}
            fontSize={0.12}
            color="#000000"
            anchorX="center"
            anchorY="middle"
            font="/fonts/SpaceGrotesk-Bold.woff"
          >
            {year}
          </Text>
        </group>

        {/* Type Icon */}
        <Text
          position={[-1.2, 1.5, 0.11]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {getTypeIcon(type)}
        </Text>

        {/* Description */}
        <Text
          position={[0, 0.2, 0.11]}
          fontSize={0.1}
          maxWidth={2.5}
          lineHeight={1.2}
          textAlign="center"
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SpaceGrotesk-Regular.woff"
        >
          {description.length > 150
            ? description.substring(0, 150) + "..."
            : description}
        </Text>

        {/* Image Placeholder */}
        <RoundedBox
          args={[2.5, 1.5, 0.05]}
          radius={0.05}
          position={[0, -1, 0.11]}
        >
          <meshBasicMaterial color="#2a2a4e" />
        </RoundedBox>

        {/* Floating particles around the card */}
        {hovered && (
          <>
            {Array.from({ length: 8 }, (_, i) => (
              <Sphere
                key={i}
                args={[0.02, 8, 8]}
                position={[
                  Math.sin((i / 8) * Math.PI * 2) * 2,
                  Math.cos((i / 8) * Math.PI * 2) * 2.5,
                  0.3,
                ]}
              >
                <meshBasicMaterial
                  color={getSignificanceColor(significance)}
                  transparent
                  opacity={0.8}
                />
              </Sphere>
            ))}
          </>
        )}

        {/* Interactive glow effect */}
        {hovered && (
          <Sphere args={[2, 32, 32]} position={[0, 0, -0.3]}>
            <meshBasicMaterial
              color={getSignificanceColor(significance)}
              transparent
              opacity={0.1}
            />
          </Sphere>
        )}
      </group>
    </Float>
  );
}

export default EventCard3D;
