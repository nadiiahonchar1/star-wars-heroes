import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactFlow, { Node, Edge, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { getHeroByID, getFilm, getStarship } from '../../api/api';
import styles from './HeroDetail.module.css';

const HeroDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hero, setHero] = useState<HeroType | null>(null);
  const [films, setFilms] = useState<FilmType[]>([]);
  const [starships, setStarships] = useState<StarshipType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch the hero details
    const getHero = async () => {
      setLoading(true);
      try {
        const data = await getHeroByID(Number(id));
        setHero(data);
        const filmData = await getFilm(data.films);
        setFilms(filmData.results);
        const starshipData = await getStarship(data.starships);
        setStarships(starshipData.results);
      } catch (err) {
        setError('Failed to get hero details');
      } finally {
        setLoading(false);
      }
    };

    // Call the function on component mount or when `id` changes
    getHero();
  }, [id]);

  // Show loading indicator while data is being fetched
  if (loading) return <div>Loading...</div>;

  // Display error message if fetching fails
  if (error) return <div>{error}</div>;

  // Create nodes for the hero, films, and starships
  const nodes: Node[] = [
    {
      id: `hero-${hero!.id}`,
      type: 'input',
      data: { label: hero!.name },
      position: { x: 250, y: 0 },
    },
    // Create nodes for each film the hero appears in
    ...films.map((film, index) => ({
      id: `film-${index}`,
      data: {
        label: (
          <>
            <span>Movie title:</span>
            <br />
            {film.title}
          </>
        ),
      },
      position: { x: 150 * index, y: 150 },
      className: styles.filmNode,
    })),
    // Create nodes for each starship the hero owns or flies
    ...hero!.starships.map((heroStarship, index) => {
      const starshipData = starships.find(({ id }) => id === heroStarship);

      return {
        id: `starship-${index}`,
        data: {
          label: (
            <>
              <span>The name of the starship:</span>
              <br />
              {starshipData ? starshipData.name : 'Unknown Starship'}
            </>
          ),
        },
        position: { x: 150 * index, y: 300 },
        className: styles.starshipNode,
      };
    }),
  ];

  // Create edges between the hero and films, and between films and starships
  const edges: Edge[] = [
    ...hero!.films.map((_, index) => ({
      id: `hero-film-${index}`,
      source: `hero-${hero!.id}`,
      target: `film-${index}`,
      animated: true,
    })),
    // Create edges between films and starships
    ...hero!.starships.flatMap((heroStarship, index) => {
      const relatedFilms = films.filter((film) =>
        film.starships.includes(heroStarship)
      );

      return relatedFilms.map((film, filmIndex) => ({
        id: `film-starship-${index}-${filmIndex}`,
        source: `film-${films.indexOf(film)}`,
        target: `starship-${index}`,
        animated: true,
      }));
    }),
  ];

  return (
    <div className={styles.container}>
      <div style={{ height: '500px', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodesConnectable={false}
          edgesFocusable={false}
          style={{ width: '100%', height: '100%' }}
        >
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default HeroDetail;
