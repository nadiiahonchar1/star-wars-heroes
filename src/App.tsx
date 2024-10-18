// import axios from 'axios';
import { useEffect, useState } from 'react';
import { fetchHeroes } from './api/api';
import './App.css';

const App = () => {
  const [heroes, setHeroes] = useState<HeroType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  useEffect(() => {
    const getHeroes = async () => {
      setLoading(true);
      try {
        const data = await fetchHeroes(page);
        setHeroes(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
      } catch (err) {
        setError('Failed to get hero data');
      } finally {
        setLoading(false);
      }
    };

    getHeroes();
  }, [page]);

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
      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!prevPage}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
