export interface AstronomicalEvent {
  id: string;
  date: string; // MM-DD format
  year: number;
  title: string;
  description: string;
  type: "discovery" | "mission" | "observation" | "phenomenon" | "anniversary";
  imageUrl: string;
  significance: "high" | "medium" | "low";
}

export const astronomicalEvents: AstronomicalEvent[] = [
  // January Events
  {
    id: "1",
    date: "01-01",
    year: 1801,
    title: "Discovery of Ceres",
    description:
      "Giuseppe Piazzi discovered Ceres, the first asteroid ever found and now classified as a dwarf planet. This discovery opened our understanding of the asteroid belt.",
    type: "discovery",
    imageUrl:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80",
    significance: "high",
  },
  {
    id: "2",
    date: "01-15",
    year: 2006,
    title: "Stardust Returns to Earth",
    description:
      "NASA's Stardust mission returned to Earth with samples from comet Wild 2, providing unprecedented insights into the composition of comets.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },

  // February Events
  {
    id: "3",
    date: "02-18",
    year: 1930,
    title: "Discovery of Pluto",
    description:
      "Clyde Tombaugh discovered Pluto at Lowell Observatory, expanding our solar system and beginning decades of exploration of the outer planets.",
    type: "discovery",
    imageUrl:
      "https://images.unsplash.com/photo-1614732414444-096040ec8d57?w=800&q=80",
    significance: "high",
  },
  {
    id: "4",
    date: "02-20",
    year: 1962,
    title: "John Glenn Orbits Earth",
    description:
      "John Glenn became the first American to orbit Earth, marking a crucial milestone in the Space Race and human spaceflight.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    significance: "high",
  },

  // March Events
  {
    id: "5",
    date: "03-13",
    year: 1781,
    title: "Discovery of Uranus",
    description:
      "William Herschel discovered Uranus, the first planet found with a telescope, doubling the known size of our solar system.",
    type: "discovery",
    imageUrl:
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&q=80",
    significance: "high",
  },
  {
    id: "6",
    date: "03-20",
    year: 2015,
    title: "Total Solar Eclipse over Europe",
    description:
      "A spectacular total solar eclipse was visible across parts of Europe, providing scientists with valuable observations of the sun's corona.",
    type: "phenomenon",
    imageUrl:
      "https://images.unsplash.com/photo-1566055563071-2d4d64c4f303?w=800&q=80",
    significance: "medium",
  },

  // April Events
  {
    id: "7",
    date: "04-12",
    year: 1961,
    title: "Yuri Gagarin's Space Flight",
    description:
      "Yuri Gagarin became the first human in space, orbiting Earth aboard Vostok 1 and opening the era of human space exploration.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&q=80",
    significance: "high",
  },
  {
    id: "8",
    date: "04-24",
    year: 1990,
    title: "Hubble Space Telescope Launch",
    description:
      "The Hubble Space Telescope was launched, revolutionizing our understanding of the universe with unprecedented deep space imagery.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },

  // May Events
  {
    id: "9",
    date: "05-05",
    year: 1961,
    title: "First American in Space",
    description:
      "Alan Shepard became the first American in space with his suborbital flight aboard Freedom 7, lasting 15 minutes.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "10",
    date: "05-25",
    year: 1961,
    title: "JFK's Moon Landing Goal",
    description:
      "President Kennedy announced the goal of landing Americans on the Moon before the end of the decade, launching the Apollo program.",
    type: "anniversary",
    imageUrl:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    significance: "high",
  },

  // June Events
  {
    id: "11",
    date: "06-16",
    year: 1963,
    title: "First Woman in Space",
    description:
      "Valentina Tereshkova became the first woman in space, orbiting Earth 48 times during her three-day mission aboard Vostok 6.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&q=80",
    significance: "high",
  },
  {
    id: "12",
    date: "06-25",
    year: 1178,
    title: "Lunar Impact Observation",
    description:
      "Canterbury monks reported seeing an explosion on the Moon, possibly the formation of crater Giordano Bruno - one of the earliest recorded astronomical observations.",
    type: "observation",
    imageUrl:
      "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80",
    significance: "medium",
  },

  // July Events
  {
    id: "13",
    date: "07-20",
    year: 1969,
    title: "Apollo 11 Moon Landing",
    description:
      "Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon, fulfilling Kennedy's promise and marking humanity's greatest space achievement.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    significance: "high",
  },
  {
    id: "14",
    date: "07-04",
    year: 1997,
    title: "Mars Pathfinder Landing",
    description:
      "NASA's Mars Pathfinder successfully landed on Mars, deploying the Sojourner rover and beginning a new era of Mars exploration.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },

  // August Events
  {
    id: "15",
    date: "08-20",
    year: 1977,
    title: "Voyager 2 Launch",
    description:
      "NASA launched Voyager 2, which would go on to visit all four outer planets and become the longest-operating NASA spacecraft.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "16",
    date: "08-21",
    year: 2017,
    title: "Great American Eclipse",
    description:
      "A total solar eclipse crossed the entire United States from coast to coast, watched by millions and providing valuable scientific data.",
    type: "phenomenon",
    imageUrl:
      "https://images.unsplash.com/photo-1566055563071-2d4d64c4f303?w=800&q=80",
    significance: "high",
  },

  // September Events
  {
    id: "17",
    date: "09-23",
    year: 1846,
    title: "Discovery of Neptune",
    description:
      "Neptune was discovered by Johann Galle based on mathematical predictions by Urbain Le Verrier, proving the power of mathematical astronomy.",
    type: "discovery",
    imageUrl:
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&q=80",
    significance: "high",
  },
  {
    id: "18",
    date: "09-15",
    year: 2017,
    title: "Cassini's Final Plunge",
    description:
      "NASA's Cassini spacecraft ended its 13-year mission to Saturn with a planned descent into the planet's atmosphere, providing final data.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },

  // October Events
  {
    id: "19",
    date: "10-04",
    year: 1957,
    title: "Sputnik 1 Launch",
    description:
      "The Soviet Union launched Sputnik 1, the first artificial satellite, beginning the Space Age and the Space Race.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "20",
    date: "10-19",
    year: 1991,
    title: "Galileo's Asteroid Encounter",
    description:
      "NASA's Galileo spacecraft made the first close encounter with an asteroid, flying by 951 Gaspra and taking detailed photographs.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80",
    significance: "medium",
  },

  // November Events
  {
    id: "21",
    date: "11-09",
    year: 1965,
    title: "Great Northeast Blackout",
    description:
      "A massive power failure across the northeastern United States led to numerous UFO sightings, highlighting the connection between power grids and astronomical observations.",
    type: "observation",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "low",
  },
  {
    id: "22",
    date: "11-26",
    year: 2011,
    title: "Mars Science Laboratory Launch",
    description:
      "NASA launched the Mars Science Laboratory mission carrying the Curiosity rover, which would land on Mars and search for signs of past life.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },

  // December Events
  {
    id: "23",
    date: "12-07",
    year: 1972,
    title: "Apollo 17 Launch",
    description:
      "The last manned mission to the Moon launched, carrying the only scientist-astronaut to walk on the lunar surface, Harrison Schmitt.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    significance: "high",
  },
  {
    id: "24",
    date: "12-21",
    year: 2012,
    title: "Winter Solstice & Mayan Calendar",
    description:
      "The winter solstice coincided with the end of the Mayan Long Count calendar, sparking global interest in astronomy and ancient calendars.",
    type: "phenomenon",
    imageUrl:
      "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80",
    significance: "medium",
  },
];

export const spaceTrivia = [
  "A day on Venus is longer than its year - it takes 243 Earth days to rotate once but only 225 Earth days to orbit the Sun.",
  "There are more stars in the universe than grains of sand on all the beaches on Earth.",
  "Jupiter's Great Red Spot is a storm that has been raging for over 300 years and is larger than Earth.",
  "One teaspoon of neutron star material would weigh about 6 billion tons on Earth.",
  "The footprints on the Moon will last for millions of years due to the lack of atmosphere and wind.",
  "Saturn would float in water if you could find a bathtub big enough - it's less dense than water.",
  "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
  "The Milky Way galaxy is on a collision course with the Andromeda galaxy in about 4.5 billion years.",
  "There are more possible games of chess than atoms in the observable universe.",
  "If you could drive a car to the Sun at highway speeds, it would take over 100 years to get there.",
];

export function getEventsForDate(date: Date): AstronomicalEvent[] {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateString = `${month}-${day}`;

  return astronomicalEvents.filter((event) => event.date === dateString);
}

export function getRandomEvent(): AstronomicalEvent {
  const randomIndex = Math.floor(Math.random() * astronomicalEvents.length);
  return astronomicalEvents[randomIndex];
}

export function getRandomTrivia(): string {
  const randomIndex = Math.floor(Math.random() * spaceTrivia.length);
  return spaceTrivia[randomIndex];
}
