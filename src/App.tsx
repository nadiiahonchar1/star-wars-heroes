import axios from 'axios';
import { useState } from 'react';

import './App.css';
import HeroGraph from './components/HeroGrapt/HeroGraph';
import HeroesList from './components/HeroList/HeroesList';

const App = () => {
  const [selectedHero, setSelectedHero] = useState<HeroType | null>(null);
  const [films, setFilms] = useState<Films[]>([]);
  const [starships, setStarships] = useState<Starships[]>([]);

  const handleHeroClick = async (hero: HeroType) => {
    setSelectedHero(hero);

    const filmsResponse = await axios.all(
      hero.films.map((film) => axios.get(film))
    );
    const starshipsResponse = await axios.all(
      hero.starships.map((starship) => axios.get(starship))
    );

    setFilms(filmsResponse.map((res) => res.data));
    setStarships(starshipsResponse.map((res) => res.data));
  };

  return (
    <div>
      <HeroesList onHeroClick={handleHeroClick} />
      {selectedHero && (
        <HeroGraph hero={selectedHero} films={films} starships={starships} />
      )}
    </div>
  );
};

export default App;
