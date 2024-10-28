type Films = string[];
type Species = string[];
type Vehicles = string[];
type Starships = string[];
type Characters = string[];
type Planets = string[];

type HeroType = {
  id: number;
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
  gender: string;
  homeworld: string;
  films: Films;
  species: Species;
  vehicles: Vehicles;
  starships: Starships;
  created: string;
  edited: string;
  url: string;
};

type FilmType = {
  id: string;
  title: string;
  episodeId: string;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: string;
  characters: Characters;
  planets: Planets;
  starships: Starships;
  vehicles: Vehicles;
  species: Species;
  created: string;
  edited: string;
  url: string;
};

type StarshipType = {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  costInCredits: string;
  length: string;
  maxAtmospheringSpeed: string;
  crew: string;
  passengers: string;
  cargoCapacity: string;
  consumables: string;
  hyperdriveRating: string;
  MGLT: string;
  starshipClass: string;
  pilots: Characters;
  films: Films;
  created: string;
  edited: string;
  url: string;
};

type HeroItemProps = {
  id: number;
  name: string;
};

type HeroesResponseType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: HeroType[];
};

type FilmsResponseType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: FilmType[];
};

type StarshipsResponseType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: StarshipType[];
};