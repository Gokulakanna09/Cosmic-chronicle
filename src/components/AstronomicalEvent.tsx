import { AstronomicalEvent } from "../data/astronomicalEvents";
import { Calendar, Star, Telescope, Rocket, Eye, Clock } from "lucide-react";

interface AstronomicalEventProps {
  event: AstronomicalEvent;
  index: number;
}

const getEventIcon = (type: AstronomicalEvent["type"]) => {
  switch (type) {
    case "discovery":
      return <Telescope className="w-5 h-5" />;
    case "mission":
      return <Rocket className="w-5 h-5" />;
    case "observation":
      return <Eye className="w-5 h-5" />;
    case "phenomenon":
      return <Star className="w-5 h-5" />;
    case "anniversary":
      return <Clock className="w-5 h-5" />;
    default:
      return <Calendar className="w-5 h-5" />;
  }
};

const getSignificanceColor = (
  significance: AstronomicalEvent["significance"],
) => {
  switch (significance) {
    case "high":
      return "border-cosmic-gold text-cosmic-gold";
    case "medium":
      return "border-cosmic-blue text-cosmic-blue";
    case "low":
      return "border-cosmic-purple text-cosmic-purple";
    default:
      return "border-cosmic-blue text-cosmic-blue";
  }
};

const AstronomicalEventCard = ({ event, index }: AstronomicalEventProps) => {
  return (
    <div
      className={`group relative min-w-[350px] max-w-[400px] h-[500px] glass-effect rounded-2xl p-6 transform transition-all duration-500 hover:scale-105 cosmic-glow animate-slide-up cursor-pointer ${
        onEventClick ? "hover:border-cosmic-gold/60" : ""
      }`}
      style={{ animationDelay: `${index * 0.2}s` }}
      onClick={() => onEventClick?.(event)}
    >
      {/* Background image */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-deep/90 via-space-medium/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getSignificanceColor(event.significance)} bg-black/30`}
          >
            {getEventIcon(event.type)}
            <span className="text-sm font-medium capitalize">{event.type}</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-cosmic-purple/20 border border-cosmic-purple text-cosmic-purple text-sm font-bold">
            {event.year}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-space-star mb-3 leading-tight">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-space-star/80 text-sm leading-relaxed flex-grow mb-4">
          {event.description}
        </p>

        {/* Date and Click Hint */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-cosmic-gold">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">
              {new Date(`2024-${event.date}`).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {onEventClick && (
            <div className="flex items-center gap-2 text-cosmic-purple/70 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span>📖</span>
              <span>Click to read the full story</span>
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cosmic-gold/50 transition-colors duration-300 pointer-events-none" />
      </div>
    </div>
  );
};

export default AstronomicalEventCard;
