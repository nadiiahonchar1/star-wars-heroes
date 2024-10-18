type Films = string[];
type Species = string[];
type Vehicles = string[];
type Starships = string[];

type HeroType = {
  id: number;
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: number;
  films: Films;
  species: Species;
  vehicles: Vehicles;
  starships: Starships;
  created: string;
  edited: string;
  url: string;
};

type HeroGraphProps = {
  hero: HeroType; 
  films: Films; 
  starships: Starships; 
};