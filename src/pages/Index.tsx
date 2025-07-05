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
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";
import StarryBackground from "../components/StarryBackground";
import Timeline from "../components/Timeline";
import DatePicker from "../components/DatePicker";
import SpaceTrivia from "../components/SpaceTrivia";
import EventStoryModal from "../components/EventStoryModal";
import {
  getEventsForDate,
  getRandomEvent,
  getAllEvents,
  getEventsByMonth,
  type AstronomicalEvent,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    let filteredEvents: AstronomicalEvent[] = [];

    if (viewMode === "date") {
      filteredEvents = getEventsForDate(selectedDate);
    } else if (viewMode === "month") {
      filteredEvents = getEventsByMonth(selectedDate.getMonth() + 1);
    } else {
      filteredEvents = getAllEvents();
    }

    // Apply search filter
    if (searchQuery) {
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.year.toString().includes(searchQuery),
      );
    }

    // Apply type filter
    if (filterType !== "all") {
      filteredEvents = filteredEvents.filter(
        (event) => event.type === filterType,
      );
    }

    setEvents(filteredEvents);
  }, [selectedDate, viewMode, searchQuery, filterType]);

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
              <h1 className="text-4xl md:text-6xl font-bold animated-title">
                <span className="cosmic-word">
                  {"Cosmic".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="cosmic-letter"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <span className="mx-4 text-cosmic-gold animate-pulse">✨</span>
                <span className="chronicle-word">
                  {"Chronicle".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="chronicle-letter"
                      style={{
                        animationDelay: `${(index + 6) * 0.1}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </h1>
            </div>

            {/* Animated tagline */}
            <div className="relative mb-8">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-cosmic-purple/10 blur-xl rounded-full animate-pulse" />

              <p className="relative text-xl md:text-2xl text-space-star/80 max-w-3xl mx-auto leading-relaxed animated-tagline">
                <span className="tagline-word">
                  {"Discover".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="tagline-letter"
                      style={{
                        animationDelay: `${1.5 + index * 0.05}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>{" "}
                <span className="tagline-word">
                  {"the".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="tagline-letter"
                      style={{
                        animationDelay: `${1.9 + index * 0.05}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>{" "}
                <span className="tagline-word text-cosmic-gold">
                  {"astronomical".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="tagline-letter-gold"
                      style={{
                        animationDelay: `${2.1 + index * 0.05}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>{" "}
                <span className="tagline-word">
                  {"events".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="tagline-letter"
                      style={{
                        animationDelay: `${2.8 + index * 0.05}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <br />
                <span className="tagline-word">
                  {"that".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="tagline-letter"
                      style={{
                        animationDelay: `${3.2 + index * 0.05}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>{" "}
                <span className="tagline-word">
                  {"shaped".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="tagline-letter"
                      style={{
                        animationDelay: `${3.4 + index * 0.05}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>{" "}
                <span className="tagline-word">
                  {"our".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="tagline-letter"
                      style={{
                        animationDelay: `${3.7 + index * 0.05}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>{" "}
                <span className="tagline-word text-cosmic-blue">
                  {"understanding".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="tagline-letter-blue"
                      style={{
                        animationDelay: `${3.9 + index * 0.05}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>{" "}
                <span className="tagline-word">
                  {"of".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="tagline-letter"
                      style={{
                        animationDelay: `${4.6 + index * 0.05}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <br />
                <span className="tagline-word">
                  {"the".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="tagline-letter"
                      style={{
                        animationDelay: `${4.8 + index * 0.05}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>{" "}
                <span className="tagline-word text-cosmic-purple">
                  {"universe".split("").map((letter, index) => (
                    <span
                      key={index}
                      className="tagline-letter-purple"
                      style={{
                        animationDelay: `${5.0 + index * 0.05}s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <span className="text-cosmic-pink ml-2 animate-pulse">🌌</span>
              </p>
            </div>

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
                  className="group flex items-center gap-3 px-6 py-3 glass-effect rounded-xl border border-cosmic-pink/30 text-space-star hover:border-cosmic-pink/50 transition-all duration-300 cosmic-glow disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  <Shuffle
                    className={`w-5 h-5 text-cosmic-pink ${
                      isLoading ? "animate-spin" : "group-hover:animate-bounce"
                    }`}
                  />
                  <span className="font-medium">
                    {isLoading ? "Time Warping..." : "Surprise Me 🚀"}
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

              {/* Enhanced View Mode Controls */}
              <div className="flex items-center gap-2 p-1 glass-effect rounded-lg border border-space-light/20">
                <button
                  onClick={() => setViewMode("date")}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    viewMode === "date"
                      ? "bg-cosmic-purple/30 text-cosmic-purple border border-cosmic-purple/50 shadow-lg"
                      : "text-space-star/70 hover:text-space-star hover:bg-space-light/20"
                  }`}
                >
                  <div className="text-lg">📅</div>
                  <span className="group-hover:tracking-wider transition-all duration-200">
                    This Date
                  </span>
                </button>
                <button
                  onClick={() => setViewMode("month")}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    viewMode === "month"
                      ? "bg-cosmic-blue/30 text-cosmic-blue border border-cosmic-blue/50 shadow-lg"
                      : "text-space-star/70 hover:text-space-star hover:bg-space-light/20"
                  }`}
                >
                  <div className="text-lg">🗓️</div>
                  <span className="group-hover:tracking-wider transition-all duration-200">
                    This Month
                  </span>
                </button>
                <button
                  onClick={() => setViewMode("all")}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    viewMode === "all"
                      ? "bg-cosmic-gold/30 text-cosmic-gold border border-cosmic-gold/50 shadow-lg"
                      : "text-space-star/70 hover:text-space-star hover:bg-space-light/20"
                  }`}
                >
                  <div className="text-lg">🌌</div>
                  <span className="group-hover:tracking-wider transition-all duration-200">
                    All Events
                  </span>
                </button>
              </div>

              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cosmic-blue" />
                  <input
                    type="text"
                    placeholder="Search events, missions, years..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 glass-effect rounded-xl border border-cosmic-blue/30 text-space-star placeholder-space-star/50 focus:border-cosmic-blue focus:outline-none transition-all duration-200 hover:border-cosmic-blue/50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-space-star/50 hover:text-space-star transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filter Dropdown */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cosmic-purple" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="pl-10 pr-8 py-3 glass-effect rounded-xl border border-cosmic-purple/30 text-space-star focus:border-cosmic-purple focus:outline-none transition-all duration-200 hover:border-cosmic-purple/50 cursor-pointer"
                  >
                    <option value="all">All Types</option>
                    <option value="mission">🚀 Missions</option>
                    <option value="discovery">🔭 Discoveries</option>
                    <option value="observation">👁️ Observations</option>
                    <option value="phenomenon">⭐ Phenomena</option>
                    <option value="anniversary">📅 Anniversaries</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Interactive Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
              <div className="group glass-effect rounded-xl p-6 cosmic-glow animate-slide-up hover:scale-105 hover:bg-cosmic-blue/10 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-cosmic-blue/50">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Rocket className="w-6 h-6 text-cosmic-blue group-hover:animate-bounce" />
                  <span className="text-2xl font-bold text-cosmic-blue group-hover:text-3xl transition-all duration-300 counter-animate">
                    65+
                  </span>
                </div>
                <p className="text-space-star/70 text-sm group-hover:text-space-star transition-colors duration-300">
                  Historic space events
                </p>
                <div className="w-full h-1 bg-cosmic-blue/20 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-cosmic-blue rounded-full w-0 group-hover:w-full transition-all duration-1000 delay-200" />
                </div>
              </div>

              <div className="group glass-effect rounded-xl p-6 cosmic-glow animate-slide-up animation-delay-200 telescope-element hover:scale-105 hover:bg-cosmic-purple/10 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-cosmic-purple/50">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Telescope className="w-6 h-6 text-cosmic-purple group-hover:animate-pulse" />
                  <span className="text-2xl font-bold text-cosmic-purple group-hover:text-3xl transition-all duration-300">
                    12
                  </span>
                </div>
                <p className="text-space-star/70 text-sm group-hover:text-space-star transition-colors duration-300">
                  Months of discoveries
                </p>
                <div className="w-full h-1 bg-cosmic-purple/20 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-cosmic-purple rounded-full w-0 group-hover:w-full transition-all duration-1000 delay-200" />
                </div>
              </div>

              <div className="group glass-effect rounded-xl p-6 cosmic-glow animate-slide-up animation-delay-400 hover:scale-105 hover:bg-cosmic-gold/10 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-cosmic-gold/50">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Calendar className="w-6 h-6 text-cosmic-gold group-hover:animate-spin" />
                  <span className="text-2xl font-bold text-cosmic-gold group-hover:text-3xl transition-all duration-300">
                    {events.length}
                  </span>
                </div>
                <p className="text-space-star/70 text-sm group-hover:text-space-star transition-colors duration-300">
                  Events currently shown
                </p>
                <div className="w-full h-1 bg-cosmic-gold/20 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-cosmic-gold rounded-full w-0 group-hover:w-full transition-all duration-1000 delay-200" />
                </div>
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
                      Earn Stardust & Climb Leaderboards
                    </h3>
                    <p className="text-space-star/70 text-sm">
                      Compete globally, unlock achievements, and showcase your
                      cosmic creations
                    </p>
                    <div className="flex justify-center gap-2 mt-3">
                      <span className="px-2 py-1 bg-cosmic-gold/20 text-cosmic-gold text-xs rounded-full">
                        🏆 Rankings
                      </span>
                      <span className="px-2 py-1 bg-cosmic-gold/20 text-cosmic-gold text-xs rounded-full">
                        🎖️ Badges
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  to="/sky-artist"
                  className="group inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-cosmic-gold via-cosmic-pink to-cosmic-purple hover:from-cosmic-purple hover:via-cosmic-gold hover:to-cosmic-pink rounded-2xl text-white text-xl font-bold transition-all duration-500 hover:scale-110 transform shadow-2xl hover:shadow-cosmic-gold/50 border-2 border-transparent hover:border-cosmic-gold/60"
                  style={{
                    background:
                      "linear-gradient(45deg, #fbbf24, #ec4899, #9333ea)",
                    boxShadow:
                      "0 0 40px rgba(251, 191, 36, 0.4), 0 10px 30px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Star className="w-8 h-8 animate-twinkle group-hover:animate-spin" />
                  <span className="group-hover:tracking-wider transition-all duration-300">
                    Start Creating ✨
                  </span>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse group-hover:animate-bounce" />
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
