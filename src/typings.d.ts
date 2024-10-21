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
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
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
  episode_id: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
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
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
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