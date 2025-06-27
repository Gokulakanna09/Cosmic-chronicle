import { useState, useEffect } from "react";
import { X, Calendar, Star, Users, Clock, ChevronRight } from "lucide-react";
import { AstronomicalEvent } from "../data/astronomicalEvents";

interface EventStoryModalProps {
  event: AstronomicalEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventStoryModal = ({ event, isOpen, onClose }: EventStoryModalProps) => {
  const [currentSection, setCurrentSection] = useState<
    "story" | "timeline" | "details"
  >("story");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentSection("story");
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !event) return null;

  const getEventIcon = (type: AstronomicalEvent["type"]) => {
    const iconMap = {
      discovery: "🔭",
      mission: "🚀",
      observation: "👁️",
      phenomenon: "⭐",
      anniversary: "📅",
    };
    return iconMap[type] || "🌟";
  };

  const getSignificanceColor = (
    significance: AstronomicalEvent["significance"],
  ) => {
    switch (significance) {
      case "high":
        return "cosmic-gold";
      case "medium":
        return "cosmic-blue";
      case "low":
        return "cosmic-purple";
      default:
        return "cosmic-blue";
    }
  };

  const formatDate = (date: string, year: number) => {
    const [month, day] = date.split("-");
    const dateObj = new Date(year, parseInt(month) - 1, parseInt(day));
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden animate-slide-up">
        <div className="glass-effect rounded-3xl border border-space-light/30 cosmic-glow overflow-hidden">
          {/* Header */}
          <div className="relative px-8 py-6 border-b border-space-light/20">
            {/* Background image overlay */}
            <div
              className="absolute inset-0 opacity-20 bg-cover bg-center"
              style={{ backgroundImage: `url(${event.imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-space-deep/90 to-space-medium/90" />

            <div className="relative z-10 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{getEventIcon(event.type)}</span>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-bold border`}
                    style={{
                      borderColor: `hsl(var(--${getSignificanceColor(event.significance)}))`,
                      color: `hsl(var(--${getSignificanceColor(event.significance)}))`,
                      backgroundColor: `hsl(var(--${getSignificanceColor(event.significance)}) / 0.1)`,
                    }}
                  >
                    {event.significance.toUpperCase()} SIGNIFICANCE
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-space-star mb-2">
                  {event.title}
                </h1>

                <div className="flex items-center gap-4 text-space-star/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date, event.year)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span className="capitalize">{event.type}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-3 rounded-full hover:bg-space-light/20 text-space-star/70 hover:text-space-star transition-all duration-200 group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-space-light/20">
            {[
              { id: "story", label: "Story", icon: "📖" },
              { id: "timeline", label: "Timeline", icon: "⏰" },
              { id: "details", label: "Details", icon: "ℹ️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentSection(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                  currentSection === tab.id
                    ? "text-cosmic-gold border-b-2 border-cosmic-gold bg-cosmic-gold/10"
                    : "text-space-star/70 hover:text-space-star hover:bg-space-light/10"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-8 max-h-[60vh] overflow-y-auto">
            {currentSection === "story" && (
              <div className="space-y-6 animate-fade-in">
                <div className="prose prose-invert max-w-none">
                  {event.story?.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-space-star/90 leading-relaxed mb-4 text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {event.characters && event.characters.length > 0 && (
                  <div className="glass-effect rounded-xl p-6 border border-cosmic-blue/20">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-cosmic-blue mb-4">
                      <Users className="w-5 h-5" />
                      Key Figures
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {event.characters.map((person, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-cosmic-blue/20 text-cosmic-blue text-sm border border-cosmic-blue/30"
                        >
                          {person}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentSection === "timeline" && (
              <div className="space-y-6 animate-fade-in">
                {event.timeline && event.timeline.length > 0 ? (
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-cosmic-purple/30" />

                    <div className="space-y-6">
                      {event.timeline.map((item, index) => (
                        <div
                          key={index}
                          className="relative flex items-start gap-6"
                        >
                          {/* Timeline dot */}
                          <div className="relative z-10 w-3 h-3 bg-cosmic-purple rounded-full border-4 border-space-deep animate-glow" />

                          {/* Timeline content */}
                          <div className="flex-1 glass-effect rounded-xl p-4 border border-cosmic-purple/20">
                            <div className="text-cosmic-gold font-bold text-sm mb-2">
                              {item.time}
                            </div>
                            <div className="text-space-star/90">
                              {item.event}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-space-star/30 mx-auto mb-4" />
                    <p className="text-space-star/70">
                      No detailed timeline available for this event.
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentSection === "details" && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Event Type */}
                  <div className="glass-effect rounded-xl p-6 border border-cosmic-blue/20">
                    <h3 className="text-cosmic-blue font-bold mb-3">
                      Event Type
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {getEventIcon(event.type)}
                      </span>
                      <span className="text-space-star capitalize text-lg">
                        {event.type}
                      </span>
                    </div>
                  </div>

                  {/* Significance */}
                  <div className="glass-effect rounded-xl p-6 border border-cosmic-gold/20">
                    <h3 className="text-cosmic-gold font-bold mb-3">
                      Historical Significance
                    </h3>
                    <div
                      className={`text-${getSignificanceColor(event.significance)} text-lg font-medium`}
                    >
                      {event.significance.charAt(0).toUpperCase() +
                        event.significance.slice(1)}{" "}
                      Impact
                    </div>
                    <div className="text-space-star/70 text-sm mt-2">
                      This event had a {event.significance} impact on our
                      understanding of space and astronomy.
                    </div>
                  </div>

                  {/* Date Info */}
                  <div className="glass-effect rounded-xl p-6 border border-cosmic-purple/20">
                    <h3 className="text-cosmic-purple font-bold mb-3">
                      When It Happened
                    </h3>
                    <div className="text-space-star text-lg">
                      {formatDate(event.date, event.year)}
                    </div>
                    <div className="text-space-star/70 text-sm mt-2">
                      {new Date().getFullYear() - event.year} years ago
                    </div>
                  </div>

                  {/* Quick Summary */}
                  <div className="glass-effect rounded-xl p-6 border border-cosmic-pink/20">
                    <h3 className="text-cosmic-pink font-bold mb-3">
                      Quick Summary
                    </h3>
                    <p className="text-space-star/90 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t border-space-light/20 flex items-center justify-between">
            <div className="text-space-star/50 text-sm">
              Explore the wonders of space history
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cosmic-purple/20 hover:bg-cosmic-purple/30 border border-cosmic-purple/40 text-cosmic-purple transition-all duration-200"
            >
              Close Story
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventStoryModal;
