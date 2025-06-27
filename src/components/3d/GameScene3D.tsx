import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Sphere,
  Float,
  Text3D,
  MeshDistortMaterial,
  Sparkles,
  Trail,
} from "@react-three/drei";
import * as THREE from "three";

// Floating Star for game
function FloatingStar({ position, color = "#fbbf24", size = 0.1 }) {
  const starRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (starRef.current) {
      starRef.current.rotation.y += 0.02;
      starRef.current.rotation.z += 0.01;
      starRef.current.position.y +=
        Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Trail width={2} length={6} color={color} attenuation={(t) => t * t}>
        <Sphere ref={starRef} args={[size, 16, 16]} position={position}>
          <meshBasicMaterial color={color} />
        </Sphere>
      </Trail>
    </Float>
  );
}

// 3D Constellation Preview
function ConstellationPreview3D({ connections = [], stars = [] }) {
  const lineGeometry = useMemo(() => {
    if (!connections.length || !stars.length) return null;

    const points: THREE.Vector3[] = [];
    connections.forEach((connection) => {
      const fromStar = stars.find((star) => star.id === connection.from);
      const toStar = stars.find((star) => star.id === connection.to);

      if (fromStar && toStar) {
        points.push(
          new THREE.Vector3(
            (fromStar.x - 50) * 0.1,
            (50 - fromStar.y) * 0.1,
            0,
          ),
        );
        points.push(
          new THREE.Vector3((toStar.x - 50) * 0.1, (50 - toStar.y) * 0.1, 0),
        );
      }
    });

    if (points.length === 0) return null;
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [connections, stars]);

  return (
    <group position={[3, 0, -2]}>
      {lineGeometry && (
        <line geometry={lineGeometry}>
          <lineBasicMaterial
            color="#9333ea"
            transparent
            opacity={0.8}
            linewidth={3}
          />
        </line>
      )}
      {stars.map((star, index) => (
        <FloatingStar
          key={star.id || index}
          position={[(star.x - 50) * 0.1, (50 - star.y) * 0.1, 0]}
          color={star.isConnected ? "#fbbf24" : "#ffffff"}
          size={0.05 + star.brightness * 0.05}
        />
      ))}
    </group>
  );
}

// Stardust Particle Effect
function StardustEffect({ count = 100 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      speed: Math.random() * 0.01 + 0.005,
      size: Math.random() * 0.02 + 0.01,
    }));
  }, [count]);

  return (
    <Sparkles
      count={count}
      scale={[10, 10, 10]}
      size={2}
      speed={0.3}
      color="#fbbf24"
      opacity={0.6}
    />
  );
}

// 3D Achievement Badge
function AchievementBadge3D({ position, text, color = "#fbbf24" }) {
  const badgeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (badgeRef.current) {
      badgeRef.current.rotation.y += 0.02;
      badgeRef.current.position.y +=
        Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={badgeRef} position={position}>
        {/* Badge Background */}
        <Sphere args={[0.5, 32, 32]}>
          <MeshDistortMaterial
            color={color}
            transparent
            opacity={0.7}
            distort={0.2}
            speed={2}
          />
        </Sphere>

        {/* Badge Text */}
        <Text3D
          font="/fonts/SpaceGrotesk-Bold.json"
          size={0.1}
          height={0.02}
          position={[-0.2, 0, 0.6]}
        >
          {text}
          <meshBasicMaterial color="#ffffff" />
        </Text3D>

        {/* Surrounding particles */}
        <Sparkles count={20} scale={1.5} size={1} speed={0.5} color={color} />
      </group>
    </Float>
  );
}

// Floating UI Elements
function FloatingUI({ stardust = 0, level = 1 }) {
  return (
    <group position={[-4, 2, 0]}>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
        <Text3D
          font="/fonts/SpaceGrotesk-Bold.json"
          size={0.2}
          height={0.05}
          position={[0, 1, 0]}
        >
          {`Stardust: ${stardust}`}
          <meshBasicMaterial color="#fbbf24" />
        </Text3D>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Text3D
          font="/fonts/SpaceGrotesk-Bold.json"
          size={0.15}
          height={0.03}
          position={[0, 0.5, 0]}
        >
          {`Level: ${level}`}
          <meshBasicMaterial color="#9333ea" />
        </Text3D>
      </Float>
    </group>
  );
}

// Main Game Scene
function GameScene3DContent({
  constellationData,
  stardust = 0,
  level = 1,
  showAchievement = null,
}) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#fbbf24" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#9333ea" />

      {/* Stardust particles */}
      <StardustEffect count={150} />

      {/* Constellation Preview */}
      {constellationData && (
        <ConstellationPreview3D
          connections={constellationData.connections}
          stars={constellationData.stars}
        />
      )}

      {/* Floating UI */}
      <FloatingUI stardust={stardust} level={level} />

      {/* Achievement Badge */}
      {showAchievement && (
        <AchievementBadge3D
          position={[0, 3, -1]}
          text={showAchievement}
          color="#fbbf24"
        />
      )}

      {/* Background stars */}
      {Array.from({ length: 30 }, (_, i) => (
        <FloatingStar
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            -5 - Math.random() * 5,
          ]}
          size={Math.random() * 0.05 + 0.02}
          color={Math.random() > 0.7 ? "#9333ea" : "#ffffff"}
        />
      ))}
    </>
  );
}

// Main Component
interface GameScene3DProps {
  constellationData?: {
    connections: Array<{ from: string; to: string }>;
    stars: Array<{
      id: string;
      x: number;
      y: number;
      brightness: number;
      isConnected: boolean;
    }>;
  };
  stardust?: number;
  level?: number;
  showAchievement?: string | null;
}

const GameScene3D = ({
  constellationData,
  stardust = 0,
  level = 1,
  showAchievement = null,
}: GameScene3DProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <GameScene3DContent
          constellationData={constellationData}
          stardust={stardust}
          level={level}
          showAchievement={showAchievement}
        />
      </Canvas>
    </div>
  );
};

export default GameScene3D;
