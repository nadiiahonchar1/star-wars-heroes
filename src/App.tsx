import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useSearchParams,
} from 'react-router-dom';
import { fetchHeroes } from './api/api';
import HeroItem from './components/HeroItem/HeroItem';
import HeroDetail from './components/HeroDetail/HeroDetail';
import styles from './App.module.css';

const App = () => {
  const [heroes, setHeroes] = useState<HeroType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  // useEffect to fetch heroes whenever the page number changes
  useEffect(() => {
    if (!searchParams.has('page')) {
      setSearchParams({ page: '1' });
    }

    const getHeroes = async () => {
      setLoading(true);
      try {
        const data = await fetchHeroes(page);
        setHeroes(Array.isArray(data.results) ? data.results : []);
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

  // Function to change the page (increment or decrement based on direction)
  const changePage = (direction: number) => {
    const newPage = Math.max(page + direction, 1);
    setSearchParams({ page: newPage.toString() });
  };

  // Display loading state
  if (loading) return <div>Loading...</div>;

  // Display error if there's an issue fetching data
  if (error) return <div>{error}</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={
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
          </div>
        }
      />
      <Route path="/hero/:id" element={<HeroDetail />} />
    </Routes>
  );
};

export default App;
