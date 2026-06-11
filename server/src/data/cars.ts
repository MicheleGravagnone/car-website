// Seed catalog. Images reference files served by the client from /public/img.

export interface SeedColor {
  name: string;
  hex: string;
  image: string;
}

export interface SeedCar {
  model: string;
  trim: string;
  year: number;
  body: string;
  horsepower: number;
  zeroToSixty: number;
  topSpeed: number;
  transmission: string;
  fuel: string;
  price: number;
  tagline: string;
  description: string;
  heroImage: string;
  colors: SeedColor[];
}

export const cars: SeedCar[] = [
  {
    model: "718 Cayman",
    trim: "Style Edition",
    year: 2024,
    body: "Coupé",
    horsepower: 300,
    zeroToSixty: 4.9,
    topSpeed: 170,
    transmission: "7-speed PDK",
    fuel: "Gasoline",
    price: 63400,
    tagline: "Mid-engine, made for the corner.",
    description:
      "The 718 Cayman puts the engine where it belongs — in the middle. The result is balance you feel through the wheel on every apex, wrapped in a silhouette that has defined the sports coupé for a generation.",
    heroImage: "/img/porsche_718.jpg",
    colors: [
      { name: "Jet Black", hex: "#15161a", image: "/img/cayman_black.jpg" },
      { name: "Gentian Blue", hex: "#1f3a5f", image: "/img/cayman_blue.jpg" },
      { name: "Guards Red", hex: "#b3121f", image: "/img/cayman_red.jpg" },
      { name: "Racing Yellow", hex: "#f2c200", image: "/img/cayman_yellow.jpg" },
    ],
  },
  {
    model: "718 Spyder",
    trim: "RS",
    year: 2024,
    body: "Roadster",
    horsepower: 414,
    zeroToSixty: 4.2,
    topSpeed: 187,
    transmission: "6-speed Manual",
    fuel: "Gasoline",
    price: 102300,
    tagline: "Open top. Closed circuit.",
    description:
      "A naturally aspirated flat-six, a manual gearbox and a fabric roof you fold by hand. The 718 Spyder is an unfiltered, analog answer to a digital world — built for drivers who still want to do the work.",
    heroImage: "/img/spyder_red.jpg",
    colors: [
      { name: "Jet Black", hex: "#15161a", image: "/img/spyder_black.jpg" },
      { name: "Gentian Blue", hex: "#1f3a5f", image: "/img/spyder_blue.jpg" },
      { name: "Agate Grey", hex: "#5a5d61", image: "/img/spyder_gray.jpg" },
      { name: "Guards Red", hex: "#b3121f", image: "/img/spyder_red.jpg" },
      { name: "Carrara White", hex: "#e8e8e6", image: "/img/spyder_white.jpg" },
      { name: "Racing Yellow", hex: "#f2c200", image: "/img/spyder_yellow.jpg" },
    ],
  },
  {
    model: "911 Carrera",
    trim: "T",
    year: 2024,
    body: "Coupé",
    horsepower: 379,
    zeroToSixty: 4.0,
    topSpeed: 182,
    transmission: "7-speed PDK",
    fuel: "Gasoline",
    price: 114400,
    tagline: "The benchmark, since 1963.",
    description:
      "Fewer kilograms, more agility. The 911 Carrera T is a commitment to purism — a sports car distilled to its essentials and sharpened for the road, carrying a flyline that has been instantly recognizable for six decades.",
    heroImage: "/img/porsche_911.jpg",
    colors: [
      { name: "Jet Black", hex: "#15161a", image: "/img/carrera_black.jpg" },
      { name: "Gentian Blue", hex: "#1f3a5f", image: "/img/carrera_blue.jpg" },
      { name: "Agate Grey", hex: "#5a5d61", image: "/img/carrera_gray.jpg" },
      { name: "Guards Red", hex: "#b3121f", image: "/img/carrera_red.jpg" },
      { name: "Carrara White", hex: "#e8e8e6", image: "/img/carrera_white.jpg" },
      { name: "Racing Yellow", hex: "#f2c200", image: "/img/carrera_yellow.jpg" },
    ],
  },
  {
    model: "911 Targa",
    trim: "4 GTS",
    year: 2024,
    body: "Targa",
    horsepower: 473,
    zeroToSixty: 3.5,
    topSpeed: 193,
    transmission: "8-speed PDK",
    fuel: "Gasoline",
    price: 144200,
    tagline: "An icon, roof down.",
    description:
      "The unmistakable wraparound bar and disappearing roof turn the 911 Targa into a piece of moving architecture. All-wheel drive and a GTS-tuned flat-six make sure it drives every bit as good as it looks.",
    heroImage: "/img/targa_white.jpg",
    colors: [
      { name: "Jet Black", hex: "#15161a", image: "/img/targa_black.jpg" },
      { name: "Gentian Blue", hex: "#1f3a5f", image: "/img/targa_blue.jpg" },
      { name: "Oak Green", hex: "#2f4030", image: "/img/targa_green.jpg" },
      { name: "Guards Red", hex: "#b3121f", image: "/img/targa_red.jpg" },
      { name: "Carrara White", hex: "#e8e8e6", image: "/img/targa_white.jpg" },
      { name: "Racing Yellow", hex: "#f2c200", image: "/img/targa_yellow.jpg" },
    ],
  },
  {
    model: "911 Turbo",
    trim: "S",
    year: 2024,
    body: "Coupé",
    horsepower: 640,
    zeroToSixty: 2.6,
    topSpeed: 205,
    transmission: "8-speed PDK",
    fuel: "Gasoline",
    price: 230400,
    tagline: "Everyday, at full attack.",
    description:
      "640 horsepower, all-wheel drive and a 2.6-second sprint to 60. The 911 Turbo S is the rare supercar you can drive to work — devastatingly fast, yet composed enough for the daily commute.",
    heroImage: "/img/turbo_black.jpg",
    colors: [
      { name: "Jet Black", hex: "#15161a", image: "/img/turbo_black.jpg" },
      { name: "Gentian Blue", hex: "#1f3a5f", image: "/img/turbo_blue.jpg" },
      { name: "Oak Green", hex: "#2f4030", image: "/img/turbo_green.jpg" },
    ],
  },
  {
    model: "Taycan",
    trim: "4S",
    year: 2024,
    body: "Sport Sedan",
    horsepower: 522,
    zeroToSixty: 3.7,
    topSpeed: 155,
    transmission: "2-speed Automatic",
    fuel: "Electric",
    price: 110300,
    tagline: "Soul, electrified.",
    description:
      "The Taycan makes electricity electrifying. Instant torque, a two-speed transmission on the rear axle and a low-slung silhouette prove that going electric never meant leaving the Porsche feeling behind.",
    heroImage: "/img/porsche_taycan.jpg",
    colors: [
      { name: "Gentian Blue", hex: "#1f3a5f", image: "/img/4s_blue.jpg" },
      { name: "Mamba Green", hex: "#3a6b2f", image: "/img/4s_green.jpg" },
      { name: "Carmine Red", hex: "#9b1b2a", image: "/img/4s_red.jpg" },
    ],
  },
  {
    model: "Panamera",
    trim: "4 Executive",
    year: 2024,
    body: "Executive Sedan",
    horsepower: 348,
    zeroToSixty: 5.3,
    topSpeed: 168,
    transmission: "8-speed PDK",
    fuel: "Gasoline",
    price: 105000,
    tagline: "A sports car that seats four.",
    description:
      "The Panamera follows instinct, not convention. The Executive's extended wheelbase adds limousine-grade rear space without dulling the handling — proof that a four-door can still carry the Porsche DNA.",
    heroImage: "/img/porsche_panamera.jpg",
    colors: [
      { name: "Jet Black", hex: "#15161a", image: "/img/executive_black.jpg" },
      { name: "Gentian Blue", hex: "#1f3a5f", image: "/img/executive_blue.jpg" },
      { name: "Carmine Red", hex: "#9b1b2a", image: "/img/executive_red.jpg" },
      { name: "Carrara White", hex: "#e8e8e6", image: "/img/executive_white.jpg" },
    ],
  },
  {
    model: "Cayenne",
    trim: "S",
    year: 2024,
    body: "SUV",
    horsepower: 468,
    zeroToSixty: 4.7,
    topSpeed: 169,
    transmission: "8-speed Tiptronic",
    fuel: "Gasoline",
    price: 96100,
    tagline: "Drive anything. Anywhere.",
    description:
      "Office today, off-road or racetrack tomorrow. The Cayenne asked whether an SUV could be a true sports car and has spent two decades answering yes — pairing genuine performance with everyday usability.",
    heroImage: "/img/porsche_cayenne.jpg",
    colors: [
      { name: "Jet Black", hex: "#15161a", image: "/img/sport_black.jpg" },
      { name: "Gentian Blue", hex: "#1f3a5f", image: "/img/sport_blue.jpg" },
      { name: "Oak Green", hex: "#2f4030", image: "/img/sport_green.jpg" },
      { name: "Carrara White", hex: "#e8e8e6", image: "/img/sport_white.jpg" },
    ],
  },
  {
    model: "Macan",
    trim: "T",
    year: 2024,
    body: "Compact SUV",
    horsepower: 261,
    zeroToSixty: 6.0,
    topSpeed: 144,
    transmission: "7-speed PDK",
    fuel: "Gasoline",
    price: 61900,
    tagline: "The sports car of SUVs.",
    description:
      "Five doors, five seats, one unmistakable flyline. The Macan packs the Porsche contour into a compact footprint, making it the sports car you reach for when the day asks for a little more room.",
    heroImage: "/img/porsche_macan.jpg",
    colors: [
      { name: "Jet Black", hex: "#15161a", image: "/img/tbt_black.jpg" },
      { name: "Carrara White", hex: "#e8e8e6", image: "/img/tbt_white.jpg" },
    ],
  },
];
