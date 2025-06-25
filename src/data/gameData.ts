import { Star } from "../pages/SkyArtist";

// Real star data inspired by actual star catalogs
export const FAMOUS_STARS = [
  { name: "Sirius", brightness: 0.9 },
  { name: "Betelgeuse", brightness: 0.8 },
  { name: "Rigel", brightness: 0.7 },
  { name: "Vega", brightness: 0.8 },
  { name: "Altair", brightness: 0.6 },
  { name: "Polaris", brightness: 0.7 },
  { name: "Aldebaran", brightness: 0.6 },
  { name: "Spica", brightness: 0.7 },
  { name: "Antares", brightness: 0.8 },
  { name: "Deneb", brightness: 0.9 },
];

export function generateStarField(count: number): Star[] {
  const stars: Star[] = [];

  for (let i = 0; i < count; i++) {
    const isFamousStar = i < FAMOUS_STARS.length;
    const star: Star = {
      id: `star-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      brightness: isFamousStar
        ? FAMOUS_STARS[i].brightness
        : Math.random() * 0.5 + 0.2,
      name: isFamousStar ? FAMOUS_STARS[i].name : undefined,
      isConnected: false,
    };
    stars.push(star);
  }

  return stars;
}

// Constellation stories and myths
export const CONSTELLATION_STORIES = [
  {
    minStars: 3,
    maxStars: 5,
    stories: [
      "Your constellation resembles the 'Cosmic Triangle' - ancient astronomers believed three bright stars in this formation guided lost travelers through the darkness of space.",
      "This pattern echoes the 'Stellar Gateway' mentioned in old star charts, said to be a portal between dimensions where cosmic energy flows freely.",
      "Your creation mirrors the 'Dancing Sprites' constellation, folklore tells of celestial beings who dance among these stars during meteor showers.",
    ],
  },
  {
    minStars: 6,
    maxStars: 8,
    stories: [
      "Behold the 'Crown of Andromeda' - a royal constellation that ancient star-watchers believed bestowed wisdom upon those who could trace its pattern.",
      "Your stellar arrangement forms the 'Celestial Bridge', legend speaks of a pathway that connects distant galaxies across the void of space.",
      "This configuration resembles the 'Phoenix Rising' - a constellation that appears only to those with the vision to see beyond the ordinary night sky.",
    ],
  },
  {
    minStars: 9,
    maxStars: 12,
    stories: [
      "You have recreated the magnificent 'Dragon of the Deep Sky' - an ancient constellation that was said to guard the secrets of stellar formation.",
      "Your masterpiece forms the 'Galactic Spiral', a pattern that mirrors the very structure of our Milky Way galaxy, connecting us to the cosmic dance of creation.",
      "This grand design echoes the 'Navigator's Pride' - a complex constellation used by space-faring civilizations to chart courses through the stellar highways.",
    ],
  },
  {
    minStars: 13,
    maxStars: 20,
    stories: [
      "Magnificent! You have created the 'Cosmic Mandala' - a sacred geometric pattern that ancient star-priests believed held the key to understanding the universe's deepest mysteries.",
      "Your constellation mirrors the legendary 'Star Web of Infinite Wisdom' - a complex network that connects the consciousness of all sentient beings across the cosmos.",
      "This intricate pattern resembles the 'Celestial Clock' - a cosmic timepiece that marks the epochs of galactic evolution and the birth and death of stars.",
    ],
  },
];

export const CREATIVITY_STORIES = [
  "Your unique vision has created something never before seen in the cosmic tapestry. This constellation will inspire future star-gazers for generations to come.",
  "The stars have whispered secrets only you could hear, and through your artistic vision, their message is now written across the sky for all to witness.",
  "In connecting these celestial lights, you have become part of an ancient tradition of sky artists who see poetry in the positioning of stars.",
  "Your constellation tells a story of connection - how separate points of light can come together to create something greater than the sum of their parts.",
  "The cosmic forces have aligned to guide your hand in creating this stellar masterpiece. Each connection you've made resonates with the harmony of the spheres.",
];

export function getConstellationStory(
  starCount: number,
  connectionCount: number,
): string {
  // Find appropriate story category
  const category =
    CONSTELLATION_STORIES.find(
      (cat) => starCount >= cat.minStars && starCount <= cat.maxStars,
    ) || CONSTELLATION_STORIES[0];

  // Get random story from category
  const storyIndex = Math.floor(Math.random() * category.stories.length);
  let story = category.stories[storyIndex];

  // Add creativity bonus story for complex patterns
  if (connectionCount > starCount) {
    const creativityIndex = Math.floor(
      Math.random() * CREATIVITY_STORIES.length,
    );
    story += "\n\n" + CREATIVITY_STORIES[creativityIndex];
  }

  return story;
}

// Achievement system
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (stats: GameStats) => boolean;
  stardust: number;
}

export interface GameStats {
  constellationsCreated: number;
  totalStars: number;
  totalConnections: number;
  uniquePatterns: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-constellation",
    name: "Star-Touched",
    description: "Create your first constellation",
    icon: "⭐",
    condition: (stats) => stats.constellationsCreated >= 1,
    stardust: 50,
  },
  {
    id: "cosmic-artist",
    name: "Cosmic Artist",
    description: "Create 10 constellations",
    icon: "🎨",
    condition: (stats) => stats.constellationsCreated >= 10,
    stardust: 200,
  },
  {
    id: "star-weaver",
    name: "Star Weaver",
    description: "Connect 100 stars total",
    icon: "🕸️",
    condition: (stats) => stats.totalStars >= 100,
    stardust: 150,
  },
  {
    id: "connection-master",
    name: "Connection Master",
    description: "Make 200 connections",
    icon: "🔗",
    condition: (stats) => stats.totalConnections >= 200,
    stardust: 300,
  },
  {
    id: "complex-creator",
    name: "Complex Creator",
    description: "Create a constellation with 15+ stars",
    icon: "🌌",
    condition: (stats) => stats.uniquePatterns >= 1,
    stardust: 500,
  },
];

// Stardust calculation
export function calculateStardust(
  starCount: number,
  connectionCount: number,
  avgBrightness: number,
  timeSpent: number,
): number {
  const basePoints = connectionCount * 10;
  const brightnessBonus = Math.floor(avgBrightness * 50);
  const complexityBonus = starCount > 8 ? (starCount - 8) * 15 : 0;
  const speedBonus = timeSpent < 60 ? 25 : timeSpent < 120 ? 15 : 5;

  return basePoints + brightnessBonus + complexityBonus + speedBonus;
}

// Random space facts for trivia
export const SPACE_FACTS = [
  "The Orion constellation contains the bright red star Betelgeuse, which is so large that if it replaced our Sun, it would extend beyond Mars' orbit.",
  "The Big Dipper is not actually a constellation but an asterism - a recognizable pattern of stars that's part of the larger Ursa Major constellation.",
  "Polaris, the North Star, hasn't always been the pole star. Due to Earth's axial precession, different stars serve as pole stars over thousands of years.",
  "The constellation Draco contains the star Thuban, which was the pole star when the ancient Egyptians built the pyramids around 3000 BCE.",
  "Sirius, the brightest star in our night sky, is actually a binary star system consisting of Sirius A and a white dwarf companion called Sirius B.",
  "The Southern Cross constellation is visible only from the Southern Hemisphere and was crucial for navigation by early explorers.",
  "Andromeda, our nearest major galaxy, appears as a constellation in our sky but will collide with the Milky Way in about 4.5 billion years.",
];

export function getRandomSpaceFact(): string {
  return SPACE_FACTS[Math.floor(Math.random() * SPACE_FACTS.length)];
}
