import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, OrbitControls, Stars, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import EventCard3D from "./EventCard3D";
import { AstronomicalEvent } from "../../data/astronomicalEvents";

interface Timeline3DProps {
  events: AstronomicalEvent[];
  selectedDate: Date;
  onEventClick?: (event: AstronomicalEvent) => void;
}

// Timeline Path Component
function TimelinePath({ events }: { events: AstronomicalEvent[] }) {
  const pathRef = useRef<THREE.Line>(null);

  const points = useMemo(() => {
    return events.map((_, index) => {
      const angle = (index / events.length) * Math.PI * 2;
      const radius = 8;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0,
      );
    });
  }, [events]);

  const lineGeometry = useMemo(() => {
    if (points.length === 0) return null;
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  useFrame(() => {
    if (pathRef.current) {
      pathRef.current.rotation.z += 0.002;
    }
  });

  if (!lineGeometry) return null;

  return (
    <line ref={pathRef} geometry={lineGeometry}>
      <lineBasicMaterial
        color="#9333ea"
        transparent
        opacity={0.4}
        linewidth={2}
      />
    </line>
  );
}

// Central Hub
function CentralHub({ selectedDate }: { selectedDate: Date }) {
  const hubRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (hubRef.current) {
      hubRef.current.rotation.y += 0.01;
      hubRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={hubRef}>
        {/* Central Sphere */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial
            color="#fbbf24"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>

        {/* Date Display */}
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.3}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SpaceGrotesk-Bold.woff"
        >
          {selectedDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
        </Text>

        <Text
          position={[0, 2, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/SpaceGrotesk-Regular.woff"
        >
          {selectedDate.getFullYear()}
        </Text>

        {/* Orbiting rings */}
        {[2, 2.5, 3].map((radius, index) => (
          <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius, radius + 0.05, 64]} />
            <meshBasicMaterial
              color="#9333ea"
              transparent
              opacity={0.2 - index * 0.05}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// Camera Controller for Timeline
function TimelineCameraController() {
  const { camera } = useThree();

  useFrame((state) => {
    // Gentle camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 3;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main 3D Timeline Scene
function Timeline3DScene({
  events,
  selectedDate,
  onEventClick,
}: Timeline3DProps) {
  const eventPositions = useMemo(() => {
    return events.map((_, index) => {
      const angle = (index / events.length) * Math.PI * 2;
      const radius = 8;
      const height = (Math.random() - 0.5) * 4; // Random height variation
      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius + height,
        (Math.random() - 0.5) * 2, // Random depth
      ] as [number, number, number];
    });
  }, [events]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fbbf24" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#9333ea" />
      <pointLight position={[0, 0, 15]} intensity={0.7} color="#3b82f6" />

      {/* Stars */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
      />

      {/* Central Hub */}
      <CentralHub selectedDate={selectedDate} />

      {/* Timeline Path */}
      <TimelinePath events={events} />

      {/* Event Cards */}
      {events.map((event, index) => (
        <EventCard3D
          key={event.id}
          title={event.title}
          year={event.year}
          description={event.description}
          imageUrl={event.imageUrl}
          position={eventPositions[index]}
          type={event.type}
          significance={event.significance}
          onClick={() => onEventClick?.(event)}
        />
      ))}

      {/* Camera Controller */}
      <TimelineCameraController />

      {/* Interactive Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={false}
        maxDistance={25}
        minDistance={5}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
    </>
  );
}

// Main Component
const Timeline3D = ({
  events,
  selectedDate,
  onEventClick,
}: Timeline3DProps) => {
  if (events.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-cosmic-blue mb-4">
            <svg
              className="w-16 h-16 mx-auto animate-twinkle"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-space-star mb-2">
            No Events in 3D Space
          </h3>
          <p className="text-space-star/70 text-sm">
            Switch to a different view mode to see events in 3D!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 relative">
      <Canvas
        camera={{ position: [12, 8, 12], fov: 60 }}
        style={{
          background: "transparent",
          borderRadius: "1rem",
        }}
        gl={{ alpha: true, antialias: true }}
      >
        <Timeline3DScene
          events={events}
          selectedDate={selectedDate}
          onEventClick={onEventClick}
        />
      </Canvas>

      {/* 3D Controls Info */}
      <div className="absolute bottom-4 right-4 glass-effect rounded-lg px-3 py-2 border border-cosmic-blue/30">
        <p className="text-cosmic-blue text-xs">
          🖱️ Drag to rotate • 🖱️ Wheel to zoom • Click cards to interact
        </p>
      </div>
    </div>
  );
};

export default Timeline3D;
