import { useState, useEffect } from "react";
import {
  Shuffle,
  Telescope,
  Rocket,
  Calendar,
  List,
  Gamepad2,
  Star,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import StarryBackground from "../components/StarryBackground";
import Timeline from "../components/Timeline";
import DatePicker from "../components/DatePicker";
import SpaceTrivia from "../components/SpaceTrivia";
import {
  getEventsForDate,
  getRandomEvent,
  getAllEvents,
  getEventsByMonth,
} from "../data/astronomicalEvents";

const Index = () => {
  const [selectedDate, setSelectedDate] = useState(new Date("2024-07-20")); // Apollo 11 Moon Landing
  const [events, setEvents] = useState(
    getEventsForDate(new Date("2024-07-20")),
  );
  const [viewMode, setViewMode] = useState<"date" | "all" | "month">("date");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<AstronomicalEvent | null>(
    null,
  );
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  useEffect(() => {
    if (viewMode === "date") {
      const dateEvents = getEventsForDate(selectedDate);
      setEvents(dateEvents);
    } else if (viewMode === "month") {
      const monthEvents = getEventsByMonth(selectedDate.getMonth() + 1);
      setEvents(monthEvents);
    } else {
      setEvents(getAllEvents());
    }
  }, [selectedDate, viewMode]);

  const handleRandomEvent = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomEvent = getRandomEvent();
      const eventDate = new Date(`2024-${randomEvent.date}`);
      setSelectedDate(eventDate);
      setIsLoading(false);
    }, 500);
  };

  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const handleEventClick = (event: AstronomicalEvent) => {
    setSelectedEvent(event);
    setIsStoryModalOpen(true);
  };

  const closeStoryModal = () => {
    setIsStoryModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background layers */}
      <StarryBackground />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero section */}
        <section className="px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto text-center">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
              <div className="relative telescope-element">
                <Telescope className="w-12 h-12 text-cosmic-purple animate-twinkle" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-cosmic-gold rounded-full animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-cosmic-gradient">
                Cosmic Chronicle
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-space-star/80 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Discover the astronomical events that shaped our understanding of
              the universe, one date at a time
            </p>

            {/* Controls */}
            <div className="flex flex-col items-center justify-center gap-4 mb-8 animate-slide-up">
              {/* Primary Controls */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <DatePicker
                  selectedDate={selectedDate}
                  onDateChange={handleDateChange}
                />

                <button
                  onClick={handleRandomEvent}
                  disabled={isLoading}
                  className="flex items-center gap-3 px-6 py-3 glass-effect rounded-xl border border-cosmic-pink/30 text-space-star hover:border-cosmic-pink/50 transition-all duration-300 cosmic-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Shuffle
                    className={`w-5 h-5 text-cosmic-pink ${
                      isLoading ? "animate-spin" : ""
                    }`}
                  />
                  <span className="font-medium">
                    {isLoading ? "Finding..." : "Random Event"}
                  </span>
                </button>

                <Link
                  to="/sky-artist"
                  className="flex items-center gap-3 px-6 py-3 glass-effect rounded-xl border border-cosmic-gold/30 text-space-star hover:border-cosmic-gold/50 transition-all duration-300 cosmic-glow group"
                >
                  <Star className="w-5 h-5 text-cosmic-gold group-hover:animate-twinkle" />
                  <span className="font-medium">Sky Artist Game</span>
                </Link>
              </div>

              {/* View Mode Controls */}
              <div className="flex items-center gap-2 p-1 glass-effect rounded-lg border border-space-light/20">
                <button
                  onClick={() => setViewMode("date")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "date"
                      ? "bg-cosmic-purple/30 text-cosmic-purple border border-cosmic-purple/50"
                      : "text-space-star/70 hover:text-space-star hover:bg-space-light/20"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  This Date
                </button>
                <button
                  onClick={() => setViewMode("month")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "month"
                      ? "bg-cosmic-blue/30 text-cosmic-blue border border-cosmic-blue/50"
                      : "text-space-star/70 hover:text-space-star hover:bg-space-light/20"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  This Month
                </button>
                <button
                  onClick={() => setViewMode("all")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    viewMode === "all"
                      ? "bg-cosmic-gold/30 text-cosmic-gold border border-cosmic-gold/50"
                      : "text-space-star/70 hover:text-space-star hover:bg-space-light/20"
                  }`}
                >
                  <List className="w-4 h-4" />
                  All Events
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
              <div className="glass-effect rounded-xl p-6 cosmic-glow animate-slide-up">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Rocket className="w-6 h-6 text-cosmic-blue" />
                  <span className="text-2xl font-bold text-cosmic-blue">
                    65+
                  </span>
                </div>
                <p className="text-space-star/70 text-sm">
                  Historic space events
                </p>
              </div>

              <div className="glass-effect rounded-xl p-6 cosmic-glow animate-slide-up animation-delay-200 telescope-element">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Telescope className="w-6 h-6 text-cosmic-purple" />
                  <span className="text-2xl font-bold text-cosmic-purple">
                    12
                  </span>
                </div>
                <p className="text-space-star/70 text-sm">
                  Months of discoveries
                </p>
              </div>

              <div className="glass-effect rounded-xl p-6 cosmic-glow animate-slide-up animation-delay-400">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Calendar className="w-6 h-6 text-cosmic-gold" />
                  <span className="text-2xl font-bold text-cosmic-gold">
                    {events.length}
                  </span>
                </div>
                <p className="text-space-star/70 text-sm">
                  Events currently shown
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sky Artist Game Promo */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="relative glass-effect rounded-3xl p-8 md:p-12 border border-cosmic-gold/30 cosmic-glow overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cosmic-gold/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cosmic-purple/10 rounded-full blur-3xl" />

              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Star className="w-12 h-12 text-cosmic-gold animate-twinkle" />
                  <Gamepad2 className="w-10 h-10 text-cosmic-purple" />
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-cosmic-gradient mb-4">
                  Sky Artist
                </h2>

                <p className="text-xl md:text-2xl text-space-star/80 mb-6 max-w-3xl mx-auto">
                  Become a cosmic creator! Connect real stars to form
                  constellations, unlock ancient myths, and earn Stardust points
                  in this immersive space game.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="glass-effect rounded-xl p-6 border border-cosmic-blue/20">
                    <Star className="w-8 h-8 text-cosmic-blue mx-auto mb-3" />
                    <h3 className="font-bold text-cosmic-blue mb-2">
                      Connect Stars
                    </h3>
                    <p className="text-space-star/70 text-sm">
                      Draw lines between real stars to create your own
                      constellations
                    </p>
                  </div>

                  <div className="glass-effect rounded-xl p-6 border border-cosmic-purple/20">
                    <Rocket className="w-8 h-8 text-cosmic-purple mx-auto mb-3" />
                    <h3 className="font-bold text-cosmic-purple mb-2">
                      Unlock Stories
                    </h3>
                    <p className="text-space-star/70 text-sm">
                      Each creation reveals cosmic myths and astronomical facts
                    </p>
                  </div>

                  <div className="glass-effect rounded-xl p-6 border border-cosmic-gold/20">
                    <Trophy className="w-8 h-8 text-cosmic-gold mx-auto mb-3" />
                    <h3 className="font-bold text-cosmic-gold mb-2">
                      Earn Stardust
                    </h3>
                    <p className="text-space-star/70 text-sm">
                      Gain points for creativity and save your masterpieces
                    </p>
                  </div>
                </div>

                <Link
                  to="/sky-artist"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-cosmic-gold/20 hover:bg-cosmic-gold/30 border border-cosmic-gold/40 text-cosmic-gold rounded-xl text-lg font-medium transition-all duration-300 hover:scale-105 cosmic-glow"
                >
                  <Star className="w-6 h-6 animate-twinkle" />
                  <span>Start Creating</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Events timeline */}
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <Timeline
              events={events}
              selectedDate={selectedDate}
              viewMode={viewMode}
              onEventClick={handleEventClick}
            />
          </div>
        </section>
        {/* Footer */}
        <footer className="px-4 py-8 border-t border-space-light/20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-space-star/60 text-sm">
              Explore the cosmos through time • Built with{" "}
              <span className="text-cosmic-pink">❤</span> for space enthusiasts
            </p>
            <div className="flex items-center justify-center gap-6 mt-4">
              <button className="text-space-star/40 hover:text-cosmic-blue transition-colors duration-200 text-sm">
                About
              </button>
              <button className="text-space-star/40 hover:text-cosmic-purple transition-colors duration-200 text-sm">
                Sources
              </button>
              <button className="text-space-star/40 hover:text-cosmic-pink transition-colors duration-200 text-sm">
                Contact
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Space trivia */}
      <SpaceTrivia />

      {/* Event Story Modal */}
      <EventStoryModal
        event={selectedEvent}
        isOpen={isStoryModalOpen}
        onClose={closeStoryModal}
      />
    </div>
  );
};

export default Index;
