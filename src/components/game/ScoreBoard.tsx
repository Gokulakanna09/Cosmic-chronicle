import { Trophy, Star, Link2, Sparkles } from "lucide-react";

interface ScoreBoardProps {
  totalStardust: number;
  constellationsCount: number;
  currentConnections: number;
}

const ScoreBoard = ({
  totalStardust,
  constellationsCount,
  currentConnections,
}: ScoreBoardProps) => {
  const getLevel = (stardust: number) => {
    if (stardust < 100) return { level: 1, title: "Novice Star Gazer" };
    if (stardust < 500) return { level: 2, title: "Cosmic Apprentice" };
    if (stardust < 1000) return { level: 3, title: "Stellar Artist" };
    if (stardust < 2500) return { level: 4, title: "Constellation Master" };
    if (stardust < 5000) return { level: 5, title: "Galactic Architect" };
    return { level: 6, title: "Cosmic Deity" };
  };

  const { level, title } = getLevel(totalStardust);
  const nextLevelThresholds = [0, 100, 500, 1000, 2500, 5000, 10000];
  const currentThreshold = nextLevelThresholds[level - 1];
  const nextThreshold = nextLevelThresholds[level] || 10000;
  const progress =
    ((totalStardust - currentThreshold) / (nextThreshold - currentThreshold)) *
    100;

  return (
    <div className="space-y-4">
      {/* Level Progress */}
      <div className="glass-effect rounded-xl p-6 border border-space-light/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cosmic-gold/20 border border-cosmic-gold flex items-center justify-center">
              <span className="text-cosmic-gold font-bold text-sm">
                {level}
              </span>
            </div>
            <div>
              <h3 className="text-cosmic-gold font-bold text-sm">{title}</h3>
            </div>
          </div>
          <Trophy className="w-5 h-5 text-cosmic-gold" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-space-star/70">
            <span>{currentThreshold} XP</span>
            <span>{nextThreshold} XP</span>
          </div>
          <div className="w-full bg-space-medium/50 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cosmic-gold to-cosmic-pink h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4">
        {/* Total Stardust */}
        <div className="glass-effect rounded-xl p-4 border border-cosmic-gold/20">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-cosmic-gold animate-twinkle" />
            <div>
              <div className="text-2xl font-bold text-cosmic-gold">
                {totalStardust.toLocaleString()}
              </div>
              <div className="text-xs text-space-star/70">Total Stardust</div>
            </div>
          </div>
        </div>

        {/* Constellations Created */}
        <div className="glass-effect rounded-xl p-4 border border-cosmic-purple/20">
          <div className="flex items-center gap-3">
            <Star className="w-6 h-6 text-cosmic-purple" />
            <div>
              <div className="text-2xl font-bold text-cosmic-purple">
                {constellationsCount}
              </div>
              <div className="text-xs text-space-star/70">Constellations</div>
            </div>
          </div>
        </div>

        {/* Current Session */}
        <div className="glass-effect rounded-xl p-4 border border-cosmic-blue/20">
          <div className="flex items-center gap-3">
            <Link2 className="w-6 h-6 text-cosmic-blue" />
            <div>
              <div className="text-2xl font-bold text-cosmic-blue">
                {currentConnections}
              </div>
              <div className="text-xs text-space-star/70">
                Current Connections
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Achievement Preview */}
      <div className="glass-effect rounded-xl p-4 border border-space-light/20">
        <h3 className="text-sm font-bold text-space-star mb-3">
          Next Milestone
        </h3>
        <div className="space-y-2">
          {constellationsCount < 1 && (
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-cosmic-gold rounded-full"></div>
              <span className="text-space-star/70">
                Create your first constellation (+50 Stardust)
              </span>
            </div>
          )}
          {constellationsCount >= 1 && constellationsCount < 10 && (
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-cosmic-purple rounded-full"></div>
              <span className="text-space-star/70">
                Create {10 - constellationsCount} more constellation
                {10 - constellationsCount !== 1 ? "s" : ""} for Cosmic Artist
                (+200 Stardust)
              </span>
            </div>
          )}
          {totalStardust < 500 && (
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-cosmic-blue rounded-full"></div>
              <span className="text-space-star/70">
                Earn {500 - totalStardust} more Stardust to reach Stellar Artist
                level
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
