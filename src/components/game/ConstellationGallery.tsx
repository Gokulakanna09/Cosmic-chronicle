import { useState } from "react";
import { X, Star, Calendar, Sparkles, Eye, Trash2 } from "lucide-react";
import { Constellation } from "../../pages/SkyArtist";

interface ConstellationGalleryProps {
  constellations: Constellation[];
  onClose: () => void;
  onLoad: (constellation: Constellation) => void;
}

const ConstellationGallery = ({
  constellations,
  onClose,
  onLoad,
}: ConstellationGalleryProps) => {
  const [selectedConstellation, setSelectedConstellation] =
    useState<Constellation | null>(null);

  const totalStardust = constellations.reduce(
    (sum, constellation) => sum + constellation.stardust,
    0,
  );

  const handleLoad = (constellation: Constellation) => {
    onLoad(constellation);
  };

  const handleDelete = (constellationId: string) => {
    if (confirm("Are you sure you want to delete this constellation?")) {
      // This would need to be implemented in the parent component
      // For now, we'll just close the modal
      console.log("Delete constellation:", constellationId);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="glass-effect rounded-2xl border border-space-light/20 cosmic-glow">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-space-light/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cosmic-purple/20 border border-cosmic-purple flex items-center justify-center">
                <Star className="w-5 h-5 text-cosmic-purple animate-twinkle" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-cosmic-purple">
                  Constellation Gallery
                </h2>
                <p className="text-space-star/70 text-sm">
                  {constellations.length} saved constellation
                  {constellations.length !== 1 ? "s" : ""} • {totalStardust}{" "}
                  total Stardust
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-space-light/20 text-space-star/70 hover:text-space-star transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex h-[70vh]">
            {/* Gallery Grid */}
            <div className="flex-1 p-6 overflow-y-auto">
              {constellations.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Star className="w-16 h-16 text-space-star/30 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-space-star/70 mb-2">
                      No Constellations Yet
                    </h3>
                    <p className="text-space-star/50 text-sm">
                      Create your first constellation to see it here!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {constellations.map((constellation) => (
                    <div
                      key={constellation.id}
                      className={`group relative glass-effect rounded-xl p-4 border constellation-canvas transition-all duration-300 hover:scale-105 cosmic-glow ${
                        selectedConstellation?.id === constellation.id
                          ? "border-cosmic-gold/50 bg-cosmic-gold/10"
                          : "border-space-light/20 hover:border-cosmic-purple/40"
                      }`}
                      onClick={() => setSelectedConstellation(constellation)}
                    >
                      {/* Constellation Preview */}
                      <div className="relative w-full h-32 mb-4 bg-gradient-to-b from-space-deep to-space-medium rounded-lg overflow-hidden border border-space-light/10">
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          {/* Connections */}
                          {constellation.connections.map(
                            (connection, index) => {
                              const fromStar = constellation.stars.find(
                                (star) => star.id === connection.from,
                              );
                              const toStar = constellation.stars.find(
                                (star) => star.id === connection.to,
                              );
                              if (!fromStar || !toStar) return null;

                              return (
                                <line
                                  key={index}
                                  x1={fromStar.x}
                                  y1={fromStar.y}
                                  x2={toStar.x}
                                  y2={toStar.y}
                                  stroke="#9333ea"
                                  strokeWidth="0.5"
                                  opacity="0.7"
                                />
                              );
                            },
                          )}

                          {/* Stars */}
                          {constellation.stars.map((star) => (
                            <circle
                              key={star.id}
                              cx={star.x}
                              cy={star.y}
                              r={1 + star.brightness}
                              fill="#fbbf24"
                              opacity="0.9"
                            />
                          ))}
                        </svg>
                      </div>

                      {/* Info */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-space-star group-hover:text-cosmic-gold transition-colors duration-200">
                          {constellation.name}
                        </h3>

                        <div className="flex items-center justify-between text-xs text-space-star/70">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(constellation.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>{constellation.stardust}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-space-star/60">
                          <span>
                            {constellation.stars.length} stars •{" "}
                            {constellation.connections.length} connections
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLoad(constellation);
                            }}
                            className="p-1.5 rounded bg-cosmic-blue/20 hover:bg-cosmic-blue/40 border border-cosmic-blue/40 text-cosmic-blue transition-colors duration-200"
                            title="Load constellation"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(constellation.id);
                            }}
                            className="p-1.5 rounded bg-red-500/20 hover:bg-red-500/40 border border-red-500/40 text-red-400 transition-colors duration-200"
                            title="Delete constellation"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar - Selected Constellation Details */}
            {selectedConstellation && (
              <div className="w-80 border-l border-space-light/20 p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-cosmic-gold mb-2">
                      {selectedConstellation.name}
                    </h3>
                    <p className="text-space-star/70 text-sm">
                      Created on {formatDate(selectedConstellation.createdAt)}
                    </p>
                  </div>

                  {/* Large Preview */}
                  <div className="relative w-full h-48 bg-gradient-to-b from-space-deep to-space-medium rounded-lg overflow-hidden border border-space-light/10">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {/* Connections */}
                      {selectedConstellation.connections.map(
                        (connection, index) => {
                          const fromStar = selectedConstellation.stars.find(
                            (star) => star.id === connection.from,
                          );
                          const toStar = selectedConstellation.stars.find(
                            (star) => star.id === connection.to,
                          );
                          if (!fromStar || !toStar) return null;

                          return (
                            <line
                              key={index}
                              x1={fromStar.x}
                              y1={fromStar.y}
                              x2={toStar.x}
                              y2={toStar.y}
                              stroke="#9333ea"
                              strokeWidth="1"
                              opacity="0.8"
                            />
                          );
                        },
                      )}

                      {/* Stars */}
                      {selectedConstellation.stars.map((star) => (
                        <circle
                          key={star.id}
                          cx={star.x}
                          cy={star.y}
                          r={2 + star.brightness * 2}
                          fill="#fbbf24"
                          opacity="0.9"
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass-effect rounded-lg p-3 text-center border border-cosmic-blue/20">
                      <div className="text-lg font-bold text-cosmic-blue">
                        {selectedConstellation.stars.length}
                      </div>
                      <div className="text-xs text-space-star/70">Stars</div>
                    </div>
                    <div className="glass-effect rounded-lg p-3 text-center border border-cosmic-pink/20">
                      <div className="text-lg font-bold text-cosmic-pink">
                        {selectedConstellation.connections.length}
                      </div>
                      <div className="text-xs text-space-star/70">
                        Connections
                      </div>
                    </div>
                  </div>

                  {/* Story */}
                  {selectedConstellation.story && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-cosmic-purple">Story</h4>
                      <div className="glass-effect rounded-lg p-3 border border-cosmic-purple/20">
                        <p className="text-space-star/80 text-sm leading-relaxed">
                          {selectedConstellation.story}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleLoad(selectedConstellation)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cosmic-blue/20 hover:bg-cosmic-blue/30 border border-cosmic-blue/40 text-cosmic-blue rounded-lg transition-all duration-200"
                    >
                      <Eye className="w-4 h-4" />
                      Load Constellation
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstellationGallery;
