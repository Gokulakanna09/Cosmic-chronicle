import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { getRandomTrivia } from "../data/astronomicalEvents";

const SpaceTrivia = () => {
  const [trivia, setTrivia] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    setTrivia(getRandomTrivia());

    // Auto-refresh trivia every 30 seconds
    const interval = setInterval(() => {
      setTrivia(getRandomTrivia());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNewTrivia = () => {
    setTrivia(getRandomTrivia());
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 animate-float ${
        isMinimized ? "w-16 h-16" : "w-80 max-w-[calc(100vw-3rem)]"
      }`}
    >
      <div className="glass-effect rounded-2xl border border-cosmic-purple/30 cosmic-glow">
        {isMinimized ? (
          // Minimized state
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full flex items-center justify-center text-cosmic-purple hover:text-cosmic-gold transition-colors duration-300"
          >
            <Sparkles className="w-8 h-8 animate-twinkle" />
          </button>
        ) : (
          // Expanded state
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cosmic-purple animate-twinkle" />
                <h3 className="text-sm font-semibold text-cosmic-gold">
                  Space Trivia
                </h3>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="w-6 h-6 rounded-full bg-cosmic-blue/20 hover:bg-cosmic-blue/40 flex items-center justify-center text-cosmic-blue transition-colors duration-200"
                  aria-label="Minimize"
                >
                  <div className="w-2 h-0.5 bg-current" />
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/40 flex items-center justify-center text-red-400 transition-colors duration-200"
                  aria-label="Close"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            <p className="text-space-star/90 text-sm leading-relaxed mb-3">
              {trivia}
            </p>

            <button
              onClick={handleNewTrivia}
              className="w-full px-3 py-2 rounded-lg bg-cosmic-purple/20 hover:bg-cosmic-purple/30 border border-cosmic-purple/40 text-cosmic-purple text-xs font-medium transition-all duration-200 hover:border-cosmic-purple/60"
            >
              New Fact
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpaceTrivia;
