import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleDelay: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
}

const StarryBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate stars
    const newStars: Star[] = [];
    for (let i = 0; i < 150; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        brightness: Math.random() * 0.8 + 0.2,
        twinkleDelay: Math.random() * 3,
      });
    }
    setStars(newStars);

    // Generate cosmic particles
    const newParticles: Particle[] = [];
    const colors = [
      "rgba(147, 51, 234, 0.6)", // purple
      "rgba(59, 130, 246, 0.6)", // blue
      "rgba(236, 72, 153, 0.6)", // pink
      "rgba(251, 191, 36, 0.6)", // gold
    ];

    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 20 + 10,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Nebula background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-purple/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-cosmic-blue/15 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cosmic-pink/10 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      </div>

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-space-star animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.brightness,
            animationDelay: `${star.twinkleDelay}s`,
          }}
        />
      ))}

      {/* Cosmic particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-particle-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDuration: `${particle.speed}s`,
            animationDelay: `${particle.id * 0.5}s`,
          }}
        />
      ))}

      {/* Shooting stars */}
      <div className="absolute top-1/4 left-0 w-1 h-1 bg-space-star rounded-full animate-cosmic-drift opacity-70" />
      <div
        className="absolute top-1/2 left-0 w-1 h-1 bg-cosmic-blue rounded-full animate-cosmic-drift opacity-60"
        style={{ animationDelay: "8s" }}
      />
      <div
        className="absolute top-3/4 left-0 w-1 h-1 bg-cosmic-pink rounded-full animate-cosmic-drift opacity-50"
        style={{ animationDelay: "15s" }}
      />
    </div>
  );
};

export default StarryBackground;
