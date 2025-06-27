import { useRef, useEffect, useState } from "react";
import { Star } from "../../pages/SkyArtist";

interface ConstellationCanvasProps {
  stars: Star[];
  connections: { from: string; to: string }[];
  selectedStar: string | null;
  isDrawing: boolean;
  onStarClick: (starId: string) => void;
}

const ConstellationCanvas = ({
  stars,
  connections,
  selectedStar,
  isDrawing,
  onStarClick,
}: ConstellationCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCanvasSize({
          width: rect.width,
          height: Math.max(600, rect.width * 0.6),
        });
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // Draw connections
    connections.forEach((connection) => {
      const fromStar = stars.find((star) => star.id === connection.from);
      const toStar = stars.find((star) => star.id === connection.to);

      if (fromStar && toStar) {
        const fromX = (fromStar.x / 100) * canvasSize.width;
        const fromY = (fromStar.y / 100) * canvasSize.height;
        const toX = (toStar.x / 100) * canvasSize.width;
        const toY = (toStar.y / 100) * canvasSize.height;

        // Glowing connection line
        ctx.save();
        ctx.strokeStyle = "#9333ea"; // cosmic-purple
        ctx.lineWidth = 2;
        ctx.shadowColor = "#9333ea";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        ctx.restore();

        // Additional glow effect
        ctx.save();
        ctx.strokeStyle = "rgba(147, 51, 234, 0.3)";
        ctx.lineWidth = 6;
        ctx.shadowColor = "#9333ea";
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        ctx.restore();
      }
    });

    // Draw stars
    stars.forEach((star) => {
      const x = (star.x / 100) * canvasSize.width;
      const y = (star.y / 100) * canvasSize.height;
      const radius = 2 + star.brightness * 3;

      ctx.save();

      // Star glow
      if (
        star.isConnected ||
        hoveredStar === star.id ||
        selectedStar === star.id
      ) {
        ctx.shadowColor = "#fbbf24"; // cosmic-gold
        ctx.shadowBlur = 15;
        ctx.fillStyle = "#fbbf24";
      } else {
        ctx.shadowColor = "#fffbb3"; // space-star
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#fffbb3";
      }

      // Pulsing effect for selected star
      if (selectedStar === star.id) {
        const pulse = 1 + 0.3 * Math.sin(Date.now() * 0.01);
        ctx.scale(pulse, pulse);
        ctx.translate((x * (1 - pulse)) / pulse, (y * (1 - pulse)) / pulse);
      }

      // Draw star
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Star core
      ctx.shadowBlur = 0;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }, [stars, connections, selectedStar, hoveredStar, canvasSize]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Find closest star within click threshold
    let closestStar: Star | null = null;
    let minDistance = Infinity;

    stars.forEach((star) => {
      const distance = Math.sqrt(
        Math.pow(star.x - x, 2) + Math.pow(star.y - y, 2),
      );
      if (distance < 5 && distance < minDistance) {
        // 5% threshold
        closestStar = star;
        minDistance = distance;
      }
    });

    if (closestStar) {
      onStarClick(closestStar.id);
    }
  };

  const handleCanvasMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Find hovered star
    let hoveredStarId: string | null = null;
    stars.forEach((star) => {
      const distance = Math.sqrt(
        Math.pow(star.x - x, 2) + Math.pow(star.y - y, 2),
      );
      if (distance < 3) {
        // 3% threshold for hover
        hoveredStarId = star.id;
      }
    });

    setHoveredStar(hoveredStarId);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-gradient-to-b from-space-deep to-space-medium rounded-xl overflow-hidden border border-space-light/20"
      style={{ minHeight: "600px" }}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${
          isDrawing ? "drawing-mode" : "constellation-canvas"
        }`}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={() => setHoveredStar(null)}
      />

      {/* Overlay instructions */}
      {!isDrawing && stars.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="glass-effect rounded-xl p-6 text-center max-w-md">
            <h3 className="text-xl font-bold text-cosmic-gold mb-2">
              Welcome, Sky Artist!
            </h3>
            <p className="text-space-star/80 text-sm">
              Click "Start Drawing" to begin connecting stars and create your
              own constellation masterpiece.
            </p>
          </div>
        </div>
      )}

      {/* Drawing mode overlay */}
      {isDrawing && (
        <div className="absolute top-4 left-4 glass-effect rounded-lg px-4 py-2 border border-cosmic-purple/30">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cosmic-purple rounded-full animate-pulse"></div>
            <span className="text-cosmic-purple text-sm font-medium">
              Drawing Mode Active
            </span>
          </div>
        </div>
      )}

      {/* Star count */}
      <div className="absolute bottom-4 right-4 glass-effect rounded-lg px-3 py-2 border border-space-light/20">
        <span className="text-space-star/70 text-sm">
          {stars.filter((star) => star.isConnected).length} / {stars.length}{" "}
          stars connected
        </span>
      </div>

      {/* Connection count */}
      {connections.length > 0 && (
        <div className="absolute bottom-4 left-4 glass-effect rounded-lg px-3 py-2 border border-cosmic-gold/30">
          <span className="text-cosmic-gold text-sm font-medium">
            {connections.length} connection{connections.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
};

export default ConstellationCanvas;
