type Films = string[];
type Species = string[];
type Vehicles = string[];
type Starships = string[];

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

type HeroItemProps = {
  id: number;
  name: string;
};