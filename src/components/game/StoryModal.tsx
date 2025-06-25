import { useState } from "react";
import { X, Save, Sparkles, Star } from "lucide-react";
import { Constellation } from "../../pages/SkyArtist";

interface StoryModalProps {
  story: string;
  constellation: Constellation | null;
  onClose: () => void;
  onSave: (name: string) => void;
}

const StoryModal = ({
  story,
  constellation,
  onClose,
  onSave,
}: StoryModalProps) => {
  const [constellationName, setConstellationName] = useState(
    constellation?.name || "My Constellation",
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!constellationName.trim()) return;

    setIsSaving(true);
    // Simulate save delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSave(constellationName.trim());
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="glass-effect rounded-2xl border border-space-light/20 cosmic-glow">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-space-light/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cosmic-gold/20 border border-cosmic-gold flex items-center justify-center">
                <Star className="w-5 h-5 text-cosmic-gold animate-twinkle" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-cosmic-gold">
                  Constellation Created!
                </h2>
                <p className="text-space-star/70 text-sm">
                  {constellation?.stardust || 0} Stardust earned
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
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Story */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cosmic-purple animate-twinkle" />
                <h3 className="text-lg font-bold text-cosmic-purple">
                  Your Constellation's Story
                </h3>
              </div>

              <div className="glass-effect rounded-xl p-4 border border-cosmic-purple/20">
                <p className="text-space-star/90 leading-relaxed whitespace-pre-line">
                  {story}
                </p>
              </div>
            </div>

            {/* Constellation Stats */}
            {constellation && (
              <div className="grid grid-cols-3 gap-4">
                <div className="glass-effect rounded-lg p-3 text-center border border-cosmic-blue/20">
                  <div className="text-lg font-bold text-cosmic-blue">
                    {constellation.stars.length}
                  </div>
                  <div className="text-xs text-space-star/70">Stars</div>
                </div>
                <div className="glass-effect rounded-lg p-3 text-center border border-cosmic-pink/20">
                  <div className="text-lg font-bold text-cosmic-pink">
                    {constellation.connections.length}
                  </div>
                  <div className="text-xs text-space-star/70">Connections</div>
                </div>
                <div className="glass-effect rounded-lg p-3 text-center border border-cosmic-gold/20">
                  <div className="text-lg font-bold text-cosmic-gold">
                    {constellation.stardust}
                  </div>
                  <div className="text-xs text-space-star/70">Stardust</div>
                </div>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-space-star">
                Name Your Constellation
              </label>
              <input
                type="text"
                value={constellationName}
                onChange={(e) => setConstellationName(e.target.value)}
                placeholder="Enter constellation name..."
                className="w-full px-4 py-3 rounded-lg bg-space-medium/50 border border-space-light/30 text-space-star placeholder-space-star/50 focus:border-cosmic-blue focus:outline-none transition-colors duration-200"
                maxLength={50}
              />
              <p className="text-xs text-space-star/60">
                {constellationName.length}/50 characters
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-space-light/20">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-space-star/70 hover:text-space-star hover:bg-space-light/20 transition-all duration-200"
            >
              Skip Saving
            </button>

            <button
              onClick={handleSave}
              disabled={!constellationName.trim() || isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-cosmic-gold/20 hover:bg-cosmic-gold/30 border border-cosmic-gold/40 text-cosmic-gold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-cosmic-gold/30 border-t-cosmic-gold rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save to Gallery</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
