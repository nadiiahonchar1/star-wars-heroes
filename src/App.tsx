import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [heroes, setHeroes] = useState<HeroType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get('https://sw-api.starnavi.io/people/');
        setHeroes(response.data.results);
      } catch (err) {
        setError('Не вдалося отримати дані про героїв');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Список героїв Star Wars</h1>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>{hero.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
