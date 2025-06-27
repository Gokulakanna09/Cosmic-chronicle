export interface AstronomicalEvent {
  id: string;
  date: string; // MM-DD format
  year: number;
  title: string;
  description: string;
  story: string; // Detailed narrative story
  type: "discovery" | "mission" | "observation" | "phenomenon" | "anniversary";
  imageUrl: string;
  significance: "high" | "medium" | "low";
  characters?: string[]; // Key people involved
  timeline?: { time: string; event: string }[]; // Timeline of events
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
    story:
      "On the first night of the new century, Giuseppe Piazzi, an Italian astronomer working at the Palermo Observatory, was methodically cataloguing stars when something extraordinary caught his attention. A faint point of light seemed to have moved slightly from where it should have been according to his star charts.\n\nIntrigued, Piazzi observed this mysterious object for several nights. Night after night, it continued to move against the background of fixed stars - a clear sign that this was no ordinary star. What Piazzi had discovered was something entirely new to human knowledge: the first asteroid.\n\nHe initially thought it might be a comet, but it lacked the characteristic tail. As weeks passed and more observations were made, it became clear this was a new type of celestial body orbiting between Mars and Jupiter. Piazzi named it Ceres, after the Roman goddess of harvest and protector of Sicily.\n\nThis discovery revolutionized our understanding of the solar system. Ceres wasn't just a rock floating in space - it was large enough to be classified as a dwarf planet, and its discovery opened the door to finding thousands more asteroids in what we now call the asteroid belt. Piazzi had unwittingly discovered an entire new class of objects that filled the mysterious gap between Mars and Jupiter.",
    type: "discovery",
    imageUrl:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80",
    significance: "high",
    characters: ["Giuseppe Piazzi"],
    timeline: [
      { time: "January 1, 1801", event: "First observation of moving object" },
      {
        time: "January 2-24, 1801",
        event: "Continued tracking and measurements",
      },
      {
        time: "February 1801",
        event: "Piazzi falls ill, loses track of object",
      },
      {
        time: "December 1801",
        event: "Gauss calculates orbit, object rediscovered",
      },
      { time: "1802", event: "Officially named Ceres" },
    ],
  },
  {
    id: "2",
    date: "01-07",
    year: 1610,
    title: "Galileo Discovers Jupiter's Moons",
    description:
      "Galileo Galilei first observed the four largest moons of Jupiter through his telescope, proving that not everything orbits Earth.",
    type: "discovery",
    imageUrl:
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&q=80",
    significance: "high",
  },
  {
    id: "3",
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
  {
    id: "4",
    date: "01-27",
    year: 1967,
    title: "Apollo 1 Fire",
    description:
      "A cabin fire during a launch rehearsal test killed three astronauts, leading to major safety improvements in the Apollo program.",
    type: "anniversary",
    imageUrl:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    significance: "high",
  },
  {
    id: "5",
    date: "01-28",
    year: 1986,
    title: "Challenger Disaster",
    description:
      "Space Shuttle Challenger broke apart 73 seconds into flight, killing all seven crew members and temporarily halting the shuttle program.",
    type: "anniversary",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },

  // February Events
  {
    id: "6",
    date: "02-01",
    year: 2003,
    title: "Columbia Disaster",
    description:
      "Space Shuttle Columbia disintegrated during re-entry, killing all seven crew members and leading to shuttle program reforms.",
    type: "anniversary",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "7",
    date: "02-11",
    year: 2016,
    title: "LIGO Detects Gravitational Waves",
    description:
      "The first direct detection of gravitational waves was announced, confirming Einstein's theory and opening a new era of astronomy.",
    type: "discovery",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "8",
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
    id: "9",
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
  {
    id: "10",
    date: "02-24",
    year: 1987,
    title: "Supernova 1987A Observed",
    description:
      "The closest supernova explosion in nearly 400 years was observed, providing unprecedented data about stellar death.",
    type: "observation",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },

  // March Events
  {
    id: "11",
    date: "03-02",
    year: 1972,
    title: "Pioneer 10 Launch",
    description:
      "NASA launched Pioneer 10, the first spacecraft to travel through the asteroid belt and visit Jupiter.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "12",
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
    id: "13",
    date: "03-14",
    year: 2018,
    title: "Stephen Hawking Passes Away",
    description:
      "Renowned theoretical physicist Stephen Hawking died on Pi Day, leaving behind groundbreaking work on black holes and cosmology.",
    type: "anniversary",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "14",
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
  {
    id: "15",
    date: "03-21",
    year: 2019,
    title: "First Image of a Black Hole",
    description:
      "The Event Horizon Telescope collaboration released the first image of a black hole, located in galaxy M87.",
    type: "discovery",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },

  // April Events
  {
    id: "16",
    date: "04-03",
    year: 1973,
    title: "First Mobile Phone Call",
    description:
      "Martin Cooper made the first handheld cellular phone call, using technology derived from space communications.",
    type: "anniversary",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "medium",
  },
  {
    id: "17",
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
    id: "18",
    date: "04-14",
    year: 1970,
    title: "Apollo 13 Explosion",
    description:
      "Apollo 13's oxygen tank exploded, creating a near-disaster that became NASA's 'successful failure' through incredible teamwork.",
    type: "anniversary",
    imageUrl:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    significance: "high",
  },
  {
    id: "19",
    date: "04-24",
    year: 1990,
    title: "Hubble Space Telescope Launch",
    description:
      "The Hubble Space Telescope was launched, revolutionizing our understanding of the universe with unprecedented deep space imagery.",
    story:
      "April 24, 1990 - After two decades of planning, political battles, and technical challenges, the Space Shuttle Discovery lifted off carrying humanity's most ambitious scientific instrument: the Hubble Space Telescope.\n\nNamed after astronomer Edwin Hubble, who discovered that the universe was expanding, this school-bus-sized telescope represented a dream decades in the making. Scientists had long envisioned placing a telescope above Earth's atmosphere, free from the blurring effects that limit ground-based observations.\n\nAs Discovery's robotic arm carefully deployed Hubble into orbit 353 miles above Earth, mission controllers held their breath. Initial tests seemed promising, but when the first images arrived, disaster struck. The images were blurry - Hubble's primary mirror had a flaw smaller than 1/50th the width of a human hair, but enough to ruin its vision.\n\nWhat followed was one of NASA's greatest comeback stories. In 1993, astronauts performed a daring repair mission, essentially giving Hubble 'contact lenses' to correct its vision. When the first corrected images arrived, they were breathtaking - crisp, clear views of distant galaxies, nebulae, and cosmic phenomena.\n\nHubble went on to revolutionize astronomy, discovering that the universe's expansion is accelerating, helping determine the age of the universe at 13.8 billion years, and capturing images that brought the cosmos to millions of people worldwide. It remains one of humanity's greatest scientific achievements.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
    characters: ["Edwin Hubble", "Lyman Spitzer", "Nancy Grace Roman"],
    timeline: [
      { time: "1946", event: "Lyman Spitzer proposes space telescope concept" },
      {
        time: "1977",
        event: "Congress approves funding for Large Space Telescope",
      },
      { time: "1990", event: "Hubble launches aboard Space Shuttle Discovery" },
      {
        time: "1990",
        event: "First images reveal spherical aberration problem",
      },
      { time: "1993", event: "STS-61 repair mission fixes Hubble's vision" },
      {
        time: "1995",
        event: "Hubble Deep Field image reveals distant galaxies",
      },
    ],
  },
  {
    id: "20",
    date: "04-25",
    year: 1990,
    title: "Hubble's First Images",
    description:
      "Hubble Space Telescope began transmitting its first images, though initially blurry due to a mirror flaw later corrected.",
    type: "observation",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "medium",
  },

  // May Events
  {
    id: "21",
    date: "05-01",
    year: 2001,
    title: "Dennis Tito Space Tourist",
    description:
      "Dennis Tito became the first space tourist, paying $20 million for a trip to the International Space Station.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "medium",
  },
  {
    id: "22",
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
    id: "23",
    date: "05-14",
    year: 1973,
    title: "Skylab Space Station Launch",
    description:
      "America's first space station was launched, providing a platform for scientific research and long-duration spaceflight.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "24",
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
  {
    id: "25",
    date: "05-30",
    year: 1971,
    title: "Mariner 9 Launch to Mars",
    description:
      "NASA launched Mariner 9, which became the first spacecraft to orbit another planet when it reached Mars.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },

  // June Events
  {
    id: "26",
    date: "06-03",
    year: 1965,
    title: "First American Spacewalk",
    description:
      "Edward White became the first American to perform a spacewalk during the Gemini 4 mission, lasting 23 minutes.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "27",
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
    id: "28",
    date: "06-18",
    year: 1983,
    title: "Sally Ride - First American Woman in Space",
    description:
      "Sally Ride became the first American woman in space aboard Space Shuttle Challenger, inspiring generations of female astronauts.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "29",
    date: "06-21",
    year: 2004,
    title: "SpaceShipOne Reaches Space",
    description:
      "The first privately funded human spaceflight reached the edge of space, winning the Ansari X Prize.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "30",
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
    id: "31",
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
  {
    id: "32",
    date: "07-14",
    year: 2015,
    title: "New Horizons Pluto Flyby",
    description:
      "NASA's New Horizons spacecraft made its closest approach to Pluto, providing the first detailed images of the dwarf planet.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1614732414444-096040ec8d57?w=800&q=80",
    significance: "high",
  },
  {
    id: "33",
    date: "07-16",
    year: 1969,
    title: "Apollo 11 Launch",
    description:
      "Apollo 11 launched from Kennedy Space Center, beginning humanity's first journey to land on the Moon.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    significance: "high",
  },
  {
    id: "34",
    date: "07-20",
    year: 1969,
    title: "Apollo 11 Moon Landing",
    description:
      "Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon, fulfilling Kennedy's promise and marking humanity's greatest space achievement.",
    story:
      "July 20, 1969 - A day that would forever change human history. As the lunar module Eagle descended toward the Moon's surface, Neil Armstrong's heart rate climbed. The computer was overloading with alarms, fuel was running dangerously low, and the designated landing site was scattered with boulders.\n\nWith only 30 seconds of fuel remaining, Armstrong took manual control. Flying over the boulder field, he spotted a clear area and gently set the Eagle down. 'The Eagle has landed,' he radioed back to Earth, words that would echo through history.\n\nSix and a half hours later, Armstrong opened the hatch and stepped onto the lunar surface. As his left foot touched the powdery regolith, he spoke the words watched by 650 million people: 'That's one small step for man, one giant leap for mankind.'\n\nBuzz Aldrin joined him 19 minutes later, describing the lunar landscape as 'magnificent desolation.' For 21 hours and 36 minutes, they explored, collected samples, planted an American flag, and left a plaque reading: 'Here men from the planet Earth first set foot upon the Moon July 1969 A.D. We came in peace for all mankind.'\n\nMeanwhile, Michael Collins orbited alone in the command module, maintaining communication and preparing for the reunion. The successful return three days later proved that the impossible dream had become reality - humans had touched another world and returned safely home.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    significance: "high",
    characters: ["Neil Armstrong", "Buzz Aldrin", "Michael Collins"],
    timeline: [
      {
        time: "July 16, 1969",
        event: "Apollo 11 launches from Kennedy Space Center",
      },
      { time: "July 19, 1969", event: "Spacecraft enters lunar orbit" },
      { time: "July 20, 1969 - 20:17 UTC", event: "Eagle lands on the Moon" },
      {
        time: "July 21, 1969 - 02:56 UTC",
        event: "Armstrong steps onto lunar surface",
      },
      {
        time: "July 21, 1969 - 03:15 UTC",
        event: "Aldrin joins Armstrong on surface",
      },
      { time: "July 21, 1969 - 17:54 UTC", event: "Eagle lifts off from Moon" },
      { time: "July 24, 1969", event: "Safe splashdown in Pacific Ocean" },
    ],
  },
  {
    id: "35",
    date: "07-23",
    year: 1999,
    title: "Chandra X-ray Observatory Launch",
    description:
      "NASA launched the Chandra X-ray Observatory, enabling detailed study of black holes, supernovas, and other high-energy phenomena.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },

  // August Events
  {
    id: "36",
    date: "08-05",
    year: 2011,
    title: "Juno Launch to Jupiter",
    description:
      "NASA launched the Juno spacecraft to Jupiter to study the planet's composition, gravity field, magnetic field, and polar magnetosphere.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&q=80",
    significance: "high",
  },
  {
    id: "37",
    date: "08-06",
    year: 2012,
    title: "Curiosity Rover Lands on Mars",
    description:
      "NASA's Curiosity rover successfully landed on Mars using the innovative sky crane system, beginning its search for signs of past life.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "38",
    date: "08-12",
    year: 1960,
    title: "Echo 1 Satellite Launch",
    description:
      "The first passive communications satellite was launched, a large balloon that reflected radio signals across Earth.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "medium",
  },
  {
    id: "39",
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
    id: "40",
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
    id: "41",
    date: "09-05",
    year: 1977,
    title: "Voyager 1 Launch",
    description:
      "NASA launched Voyager 1, which would become the first human-made object to enter interstellar space.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "42",
    date: "09-12",
    year: 1962,
    title: "JFK's Moon Speech",
    description:
      "President Kennedy delivered his famous 'We choose to go to the Moon' speech at Rice University, galvanizing public support.",
    type: "anniversary",
    imageUrl:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    significance: "high",
  },
  {
    id: "43",
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
  {
    id: "44",
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
    id: "45",
    date: "09-26",
    year: 2022,
    title: "DART Impact on Asteroid",
    description:
      "NASA's DART spacecraft successfully impacted asteroid Dimorphos, demonstrating planetary defense capabilities.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80",
    significance: "high",
  },

  // October Events
  {
    id: "46",
    date: "10-01",
    year: 1958,
    title: "NASA Established",
    description:
      "The National Aeronautics and Space Administration (NASA) was officially established, consolidating American space efforts.",
    type: "anniversary",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "47",
    date: "10-04",
    year: 1957,
    title: "Sputnik 1 Launch",
    description:
      "The Soviet Union launched Sputnik 1, the first artificial satellite, beginning the Space Age and the Space Race.",
    story:
      "October 4, 1957 - At 7:28 PM Moscow time, a modified R-7 intercontinental ballistic missile roared to life at the Baikonur Cosmodrome in Kazakhstan. Atop this powerful rocket sat a simple but revolutionary payload: a polished aluminum sphere about the size of a beach ball, equipped with four radio antennas.\n\nThis was Sputnik 1 - Russian for 'traveling companion' - and it was about to change the world forever.\n\nAs the rocket's engines cut off and the satellite separated, Sputnik began its historic journey around Earth every 96 minutes. Its radio transmitter sent out a steady 'beep-beep-beep' signal that could be picked up by amateur radio operators around the globe.\n\nIn the United States, the reaction was immediate and profound. Americans had assumed they led the world in technology, but here was proof that the Soviet Union had achieved something extraordinary first. The satellite's radio signals, audible to anyone with a shortwave radio, became the soundtrack of a new era.\n\nSputnik 1 orbited Earth for three weeks before its batteries died, and it burned up in the atmosphere after 92 days. But in that brief time, it had launched the Space Age, triggered the Space Race, and fundamentally changed how humanity saw itself and its place in the cosmos. The tiny satellite proved that space was no longer the realm of science fiction - it was humanity's next frontier.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
    characters: ["Sergei Korolev", "Konstantin Tsiolkovsky"],
    timeline: [
      {
        time: "October 4, 1957 - 19:28 UTC",
        event: "Sputnik 1 launches from Baikonur",
      },
      {
        time: "October 4, 1957 - 20:29 UTC",
        event: "First radio signals received",
      },
      { time: "October 26, 1957", event: "Transmitter batteries die" },
      { time: "January 4, 1958", event: "Sputnik 1 burns up in atmosphere" },
    ],
  },
  {
    id: "48",
    date: "10-07",
    year: 2008,
    title: "Asteroid 2008 TC3 Impact",
    description:
      "The first asteroid detected before Earth impact, demonstrating our improving ability to track dangerous objects.",
    type: "observation",
    imageUrl:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80",
    significance: "medium",
  },
  {
    id: "49",
    date: "10-15",
    year: 1997,
    title: "Cassini-Huygens Launch",
    description:
      "The most ambitious interplanetary mission ever launched began its journey to Saturn, arriving seven years later.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "50",
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
    id: "51",
    date: "11-02",
    year: 2000,
    title: "First ISS Crew Arrives",
    description:
      "Expedition 1 arrived at the International Space Station, beginning continuous human presence in space for over 20 years.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "52",
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
    id: "53",
    date: "11-12",
    year: 2014,
    title: "Philae Lands on Comet",
    description:
      "ESA's Philae lander became the first spacecraft to soft-land on a comet, touching down on 67P/Churyumov-Gerasimenko.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "54",
    date: "11-20",
    year: 1998,
    title: "ISS Construction Begins",
    description:
      "The first module of the International Space Station, Zarya, was launched, beginning construction of humanity's outpost in space.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "55",
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
    id: "56",
    date: "12-03",
    year: 1973,
    title: "Pioneer 10 Jupiter Flyby",
    description:
      "Pioneer 10 became the first spacecraft to fly by Jupiter, sending back detailed images and data about the gas giant.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&q=80",
    significance: "high",
  },
  {
    id: "57",
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
    id: "58",
    date: "12-14",
    year: 1962,
    title: "Mariner 2 Venus Flyby",
    description:
      "Mariner 2 became the first spacecraft to successfully fly by another planet, revealing Venus's harsh surface conditions.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "59",
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
  {
    id: "60",
    date: "12-25",
    year: 2021,
    title: "James Webb Space Telescope Launch",
    description:
      "The most powerful space telescope ever built was launched on Christmas Day, designed to see the first galaxies formed after the Big Bang.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },

  // Additional events to fill more dates
  {
    id: "61",
    date: "01-02",
    year: 1959,
    title: "Luna 1 Launch",
    description:
      "The Soviet Union launched Luna 1, the first spacecraft to reach the vicinity of the Moon and escape Earth's gravity.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&q=80",
    significance: "high",
  },
  {
    id: "62",
    date: "01-03",
    year: 2004,
    title: "Spirit Rover Lands on Mars",
    description:
      "NASA's Spirit rover successfully landed on Mars, beginning an extended mission to search for evidence of past water activity.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "63",
    date: "01-25",
    year: 2024,
    title: "Opportunity Rover Ends Mission",
    description:
      "NASA's Opportunity rover, originally planned for 90 days, finally ended its mission after nearly 15 years on Mars.",
    type: "anniversary",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "64",
    date: "02-05",
    year: 2018,
    title: "Falcon Heavy First Flight",
    description:
      "SpaceX successfully launched the Falcon Heavy rocket, sending Elon Musk's Tesla Roadster into space with a mannequin driver.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
  },
  {
    id: "65",
    date: "03-18",
    year: 1965,
    title: "First Spacewalk",
    description:
      "Soviet cosmonaut Alexei Leonov performed the first spacewalk in history, spending 12 minutes outside his spacecraft.",
    type: "mission",
    imageUrl:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80",
    significance: "high",
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
  "A single bolt of lightning contains enough energy to toast 100,000 slices of bread.",
  "The International Space Station orbits Earth every 90 minutes at a speed of 17,500 mph.",
  "Mercury has ice at its poles despite being the closest planet to the Sun.",
  "Mars has the largest volcano in the solar system - Olympus Mons is three times taller than Mount Everest.",
  "The moon is gradually moving away from Earth at about 1.5 inches per year.",
];

export function getEventsForDate(date: Date): AstronomicalEvent[] {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateString = `${month}-${day}`;

  return astronomicalEvents.filter((event) => event.date === dateString);
}

export function getAllEvents(): AstronomicalEvent[] {
  return astronomicalEvents.sort((a, b) => {
    // Sort by date first (month-day), then by year
    const dateA = new Date(`2024-${a.date}`);
    const dateB = new Date(`2024-${b.date}`);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }
    return a.year - b.year;
  });
}

export function getRandomEvent(): AstronomicalEvent {
  const randomIndex = Math.floor(Math.random() * astronomicalEvents.length);
  return astronomicalEvents[randomIndex];
}

export function getRandomTrivia(): string {
  const randomIndex = Math.floor(Math.random() * spaceTrivia.length);
  return spaceTrivia[randomIndex];
}

export function getEventsByMonth(month: number): AstronomicalEvent[] {
  const monthString = String(month).padStart(2, "0");
  return astronomicalEvents.filter((event) =>
    event.date.startsWith(monthString),
  );
}
