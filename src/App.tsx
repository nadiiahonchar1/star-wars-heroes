import { useEffect, useState } from 'react';
import { fetchHeroes } from './api/api';
import HeroItem from './components/HeroItem/HeroItem';
import styles from './App.module.css';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>List of Star Wars heroes</h1>
      <ul className={styles.list}>
        {heroes.map((hero) => (
          <HeroItem key={hero.id} id={hero.id} name={hero.name} />
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
