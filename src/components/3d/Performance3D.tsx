import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";

// Performance monitor component
export function Performance3DMonitor({
  onPerformanceChange,
}: {
  onPerformanceChange?: (performance: "low" | "medium" | "high") => void;
}) {
  const performanceRef = useRef<"low" | "medium" | "high">("high");

  return (
    <PerformanceMonitor
      onIncline={(api) => {
        // Performance is good, increase quality
        if (performanceRef.current !== "high") {
          performanceRef.current = "high";
          onPerformanceChange?.("high");
        }
      }}
      onDecline={(api) => {
        // Performance is declining, reduce quality
        if (performanceRef.current === "high") {
          performanceRef.current = "medium";
          onPerformanceChange?.("medium");
        } else if (performanceRef.current === "medium") {
          performanceRef.current = "low";
          onPerformanceChange?.("low");
        }
      }}
      flipflops={3}
      onFallback={() => {
        // Fallback to lowest settings
        performanceRef.current = "low";
        onPerformanceChange?.("low");
      }}
    >
      {/* Child components will be monitored */}
      <meshBasicMaterial />
    </PerformanceMonitor>
  );
}

// Adaptive LOD (Level of Detail) component
export function AdaptiveLOD({
  children,
  distance = 10,
  levels = 3,
}: {
  children: React.ReactNode;
  distance?: number;
  levels?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const currentLOD = useRef(0);

  useFrame(() => {
    if (groupRef.current) {
      const dist = camera.position.distanceTo(groupRef.current.position);
      const newLOD = Math.min(Math.floor(dist / distance), levels - 1);

      if (newLOD !== currentLOD.current) {
        currentLOD.current = newLOD;
        // Adjust LOD based on distance
        groupRef.current.visible = newLOD < levels - 1;
      }
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// Frame rate limiter
export function FrameLimiter({ targetFPS = 60 }: { targetFPS?: number }) {
  const lastTime = useRef(0);
  const { invalidate } = useThree();

  useFrame((state, delta) => {
    const now = state.clock.elapsedTime;
    const targetDelta = 1 / targetFPS;

    if (now - lastTime.current >= targetDelta) {
      lastTime.current = now;
      invalidate();
    }
  });

  return null;
}

// Culling component - hides objects outside camera view
export function FrustumCulling({
  children,
  margin = 1.2,
}: {
  children: React.ReactNode;
  margin?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const frustum = useRef(new THREE.Frustum());
  const cameraMatrix = useRef(new THREE.Matrix4());

  useFrame(() => {
    if (groupRef.current) {
      cameraMatrix.current.multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse,
      );
      frustum.current.setFromProjectionMatrix(cameraMatrix.current);

      // Check if object is in camera frustum
      const sphere = new THREE.Sphere(groupRef.current.position, margin);
      groupRef.current.visible = frustum.current.intersectsSphere(sphere);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}
