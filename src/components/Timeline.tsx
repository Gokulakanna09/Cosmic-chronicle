import { AstronomicalEvent } from "../data/astronomicalEvents";
import AstronomicalEventCard from "./AstronomicalEvent";

interface TimelineProps {
  events: AstronomicalEvent[];
  selectedDate: Date;
}

const Timeline = ({ events, selectedDate }: TimelineProps) => {
  const formatDateHeader = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto cosmic-glow">
          <div className="text-cosmic-blue mb-4">
            <svg
              className="w-16 h-16 mx-auto animate-twinkle"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-space-star mb-2">
            No Events Found
          </h3>
          <p className="text-space-star/70 text-sm">
            No astronomical events recorded for {formatDateHeader(selectedDate)}
            . Try selecting a different date or click the Random Event button!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Date header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-cosmic-gradient mb-2">
          {formatDateHeader(selectedDate)}
        </h2>
        <p className="text-space-star/70">
          {events.length} astronomical event{events.length !== 1 ? "s" : ""}{" "}
          recorded
        </p>
      </div>

      {/* Desktop timeline layout */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-cosmic-purple via-cosmic-blue to-cosmic-pink opacity-50" />

          {/* Events */}
          <div className="space-y-12">
            {events
              .sort((a, b) => a.year - b.year)
              .map((event, index) => (
                <div
                  key={event.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-cosmic-gold border-4 border-space-deep animate-glow z-10" />

                  {/* Event card */}
                  <div
                    className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}
                  >
                    <AstronomicalEventCard event={event} index={index} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Mobile/tablet layout */}
      <div className="lg:hidden">
        <div className="space-y-6">
          {events
            .sort((a, b) => a.year - b.year)
            .map((event, index) => (
              <div key={event.id} className="flex justify-center">
                <AstronomicalEventCard event={event} index={index} />
              </div>
            ))}
        </div>
      </div>

      {/* Horizontal scroll for large screens when many events */}
      {events.length > 4 && (
        <div className="xl:hidden">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {events
              .sort((a, b) => a.year - b.year)
              .map((event, index) => (
                <div key={event.id} className="flex-shrink-0">
                  <AstronomicalEventCard event={event} index={index} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
