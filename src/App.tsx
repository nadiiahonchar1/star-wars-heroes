import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchHeroes } from './api/api';
import HeroItem from './components/HeroItem/HeroItem';
import HeroDetail from './components/HeroDetail/HeroDetail';
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

  const changePage = (direction: number) => {
    setPage((prev) => Math.max(prev + direction, 1));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Router>
      <div className={styles.container}>
        <h1>List of Star Wars heroes</h1>
        <ul className={styles.list}>
          {heroes.map((hero) => (
            <HeroItem key={hero.id} id={hero.id} name={hero.name} />
          ))}
        </ul>
        <div>
          <button onClick={() => changePage(-1)} disabled={!prevPage}>
            Previous
          </button>
          <button onClick={() => changePage(1)} disabled={!nextPage}>
            Next
          </button>
        </div>
        <Routes>
          <Route path="/hero/:id" element={<HeroDetail />} />{' '}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
