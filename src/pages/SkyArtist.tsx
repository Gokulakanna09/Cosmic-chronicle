import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowLeft,
  Star,
  Sparkles,
  Trophy,
  Save,
  Shuffle,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Link } from "react-router-dom";
import StarryBackground from "../components/StarryBackground";
import ConstellationCanvas from "../components/game/ConstellationCanvas";
import ConstellationGallery from "../components/game/ConstellationGallery";
import StoryModal from "../components/game/StoryModal";
import ScoreBoard from "../components/game/ScoreBoard";
import { generateStarField, getConstellationStory } from "../data/gameData";

export interface Star {
  id: string;
  x: number;
  y: number;
  brightness: number;
  name?: string;
  constellation?: string;
  isConnected: boolean;
}

export interface Connection {
  from: string;
  to: string;
}

export interface Constellation {
  id: string;
  name: string;
  connections: Connection[];
  stars: Star[];
  createdAt: Date;
  stardust: number;
  story?: string;
}

const SkyArtist = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedStar, setSelectedStar] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentConstellation, setCurrentConstellation] =
    useState<Constellation | null>(null);
  const [savedConstellations, setSavedConstellations] = useState<
    Constellation[]
  >([]);
  const [totalStardust, setTotalStardust] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [currentStory, setCurrentStory] = useState<string>("");
  const [gameMode, setGameMode] = useState<"create" | "restore">("create");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Generate initial star field
    setStars(generateStarField(150));

    // Load saved data from localStorage
    const savedData = localStorage.getItem("skyArtistData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setSavedConstellations(data.constellations || []);
      setTotalStardust(data.stardust || 0);
    }

    // Setup audio
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, []);

  const saveData = useCallback(() => {
    const data = {
      constellations: savedConstellations,
      stardust: totalStardust,
    };
    localStorage.setItem("skyArtistData", JSON.stringify(data));
  }, [savedConstellations, totalStardust]);

  useEffect(() => {
    saveData();
  }, [saveData]);

  const handleStarClick = (starId: string) => {
    if (!isDrawing) return;

    if (!selectedStar) {
      setSelectedStar(starId);
      setStars((prev) =>
        prev.map((star) =>
          star.id === starId ? { ...star, isConnected: true } : star,
        ),
      );
    } else {
      if (selectedStar !== starId) {
        // Create connection
        const newConnection = { from: selectedStar, to: starId };
        setConnections((prev) => [...prev, newConnection]);
        setStars((prev) =>
          prev.map((star) =>
            star.id === starId ? { ...star, isConnected: true } : star,
          ),
        );
      }
      setSelectedStar(null);
    }
  };

  const startDrawing = () => {
    setIsDrawing(true);
    setConnections([]);
    setSelectedStar(null);
    setStars((prev) => prev.map((star) => ({ ...star, isConnected: false })));
  };

  const finishConstellation = () => {
    if (connections.length < 2) {
      alert("Connect at least 3 stars to create a constellation!");
      return;
    }

    setIsDrawing(false);

    // Calculate stardust based on creativity and connections
    const basePoints = connections.length * 10;
    const creativityBonus = Math.floor(Math.random() * 50) + 20;
    const earnedStardust = basePoints + creativityBonus;

    setTotalStardust((prev) => prev + earnedStardust);

    // Create constellation object
    const connectedStars = stars.filter((star) => star.isConnected);
    const newConstellation: Constellation = {
      id: Date.now().toString(),
      name: `Constellation ${savedConstellations.length + 1}`,
      connections,
      stars: connectedStars,
      createdAt: new Date(),
      stardust: earnedStardust,
    };

    setCurrentConstellation(newConstellation);

    // Show story
    const story = getConstellationStory(
      connectedStars.length,
      connections.length,
    );
    setCurrentStory(story);
    setShowStory(true);
  };

  const saveConstellation = (name: string) => {
    if (!currentConstellation) return;

    const savedConstellation = { ...currentConstellation, name };
    setSavedConstellations((prev) => [...prev, savedConstellation]);
    setCurrentConstellation(null);
  };

  const clearCanvas = () => {
    setConnections([]);
    setSelectedStar(null);
    setIsDrawing(false);
    setStars((prev) => prev.map((star) => ({ ...star, isConnected: false })));
  };

  const regenerateStars = () => {
    setStars(generateStarField(150));
    clearCanvas();
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-space-deep">
      {/* Background */}
      <StarryBackground />

      {/* Audio */}
      <audio
        ref={audioRef}
        src="https://www.soundjay.com/misc/sounds-767.mp3"
        preload="auto"
      />

      {/* Header */}
      <header className="relative z-20 px-4 py-6 glass-effect border-b border-space-light/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-cosmic-blue hover:text-cosmic-purple transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Chronicle</span>
            </Link>
            <div className="h-6 w-px bg-space-light/30" />
            <div className="flex items-center gap-3 telescope-element">
              <Star className="w-8 h-8 text-cosmic-gold animate-twinkle" />
              <h1 className="text-2xl font-bold text-cosmic-gradient">
                Sky Artist
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Audio Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMusic}
                className="p-2 glass-effect rounded-lg border border-cosmic-blue/30 text-cosmic-blue hover:border-cosmic-blue/50 transition-all duration-200"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={toggleMute}
                className="p-2 glass-effect rounded-lg border border-cosmic-blue/30 text-cosmic-blue hover:border-cosmic-blue/50 transition-all duration-200"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Stardust Display */}
            <div className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg border border-cosmic-gold/30">
              <Sparkles className="w-5 h-5 text-cosmic-gold animate-twinkle" />
              <span className="text-cosmic-gold font-bold">
                {totalStardust}
              </span>
              <span className="text-space-star/70 text-sm">Stardust</span>
            </div>

            {/* Gallery Button */}
            <button
              onClick={() => setShowGallery(true)}
              className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg border border-cosmic-purple/30 text-cosmic-purple hover:border-cosmic-purple/50 transition-all duration-200"
            >
              <Trophy className="w-4 h-4" />
              <span className="font-medium">Gallery</span>
            </button>
          </div>
        </div>
      </header>

      {/* Game Area */}
      <main className="relative z-10 flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Game Canvas */}
            <div className="lg:col-span-3">
              <div className="glass-effect rounded-2xl p-6 border border-space-light/20 cosmic-glow">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-space-star">
                    {isDrawing ? "Connect the Stars" : "Your Canvas Awaits"}
                  </h2>

                  <div className="flex items-center gap-3">
                    {!isDrawing ? (
                      <>
                        <button
                          onClick={startDrawing}
                          className="flex items-center gap-2 px-4 py-2 bg-cosmic-purple/20 hover:bg-cosmic-purple/30 border border-cosmic-purple/40 text-cosmic-purple rounded-lg transition-all duration-200"
                        >
                          <Star className="w-4 h-4" />
                          Start Drawing
                        </button>
                        <button
                          onClick={regenerateStars}
                          className="flex items-center gap-2 px-4 py-2 glass-effect border border-cosmic-blue/30 text-cosmic-blue hover:border-cosmic-blue/50 rounded-lg transition-all duration-200"
                        >
                          <Shuffle className="w-4 h-4" />
                          New Sky
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={finishConstellation}
                          className="flex items-center gap-2 px-4 py-2 bg-cosmic-gold/20 hover:bg-cosmic-gold/30 border border-cosmic-gold/40 text-cosmic-gold rounded-lg transition-all duration-200"
                        >
                          <Save className="w-4 h-4" />
                          Finish
                        </button>
                        <button
                          onClick={clearCanvas}
                          className="px-4 py-2 glass-effect border border-red-400/30 text-red-400 hover:border-red-400/50 rounded-lg transition-all duration-200"
                        >
                          Clear
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <ConstellationCanvas
                  stars={stars}
                  connections={connections}
                  selectedStar={selectedStar}
                  isDrawing={isDrawing}
                  onStarClick={handleStarClick}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ScoreBoard
                totalStardust={totalStardust}
                constellationsCount={savedConstellations.length}
                currentConnections={connections.length}
              />

              {/* Instructions */}
              <div className="glass-effect rounded-xl p-6 border border-space-light/20">
                <h3 className="text-lg font-bold text-cosmic-gold mb-4">
                  How to Play
                </h3>
                <div className="space-y-3 text-sm text-space-star/80">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cosmic-purple/20 border border-cosmic-purple flex items-center justify-center text-cosmic-purple text-xs font-bold mt-0.5">
                      1
                    </div>
                    <p>
                      Click "Start Drawing" to begin creating your constellation
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cosmic-blue/20 border border-cosmic-blue flex items-center justify-center text-cosmic-blue text-xs font-bold mt-0.5">
                      2
                    </div>
                    <p>Click stars to connect them with glowing lines</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cosmic-gold/20 border border-cosmic-gold flex items-center justify-center text-cosmic-gold text-xs font-bold mt-0.5">
                      3
                    </div>
                    <p>Create patterns and earn Stardust points</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-cosmic-pink/20 border border-cosmic-pink flex items-center justify-center text-cosmic-pink text-xs font-bold mt-0.5">
                      4
                    </div>
                    <p>Save your constellations and unlock their stories</p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="glass-effect rounded-xl p-6 border border-space-light/20">
                <h3 className="text-lg font-bold text-cosmic-pink mb-4">
                  Sky Tips
                </h3>
                <div className="space-y-2 text-sm text-space-star/70">
                  <p>• Brighter stars give more points</p>
                  <p>• Complex patterns earn creativity bonuses</p>
                  <p>• Connect 3+ stars for valid constellations</p>
                  <p>• Each creation unlocks a unique story</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showGallery && (
        <ConstellationGallery
          constellations={savedConstellations}
          onClose={() => setShowGallery(false)}
          onLoad={(constellation) => {
            setStars(constellation.stars);
            setConnections(constellation.connections);
            setShowGallery(false);
          }}
        />
      )}

      {showStory && (
        <StoryModal
          story={currentStory}
          constellation={currentConstellation}
          onClose={() => setShowStory(false)}
          onSave={saveConstellation}
        />
      )}
    </div>
  );
};

export default SkyArtist;
