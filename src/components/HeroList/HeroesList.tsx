import React, { useEffect, useState } from 'react';
import axios from 'axios';

type HeroesListProps = {
  onHeroClick: (hero: HeroType) => Promise<void>;
};

const HeroesList: React.FC<HeroesListProps> = ({ onHeroClick }) => {
  const [heroes, setHeroes] = useState<HeroType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get('https://sw-api.starnavi.io/people/');
        setHeroes(response.data);
      } catch (err) {
        setError('Помилка при отриманні героїв');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Герої Star Wars</h1>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>
            {hero.name}
            <div key={hero.id} onClick={() => onHeroClick(hero)}>
              {hero.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroesList;
