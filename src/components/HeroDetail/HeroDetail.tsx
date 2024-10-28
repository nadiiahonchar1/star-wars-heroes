import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactFlow, { Node, Edge, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { getHeroByID, getFilm, getStarship } from '../../api/api';
import { generateNodes, generateEdges } from './heroDetailUtils';
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
        const filmData: FilmsResponseType = await getFilm(data.films);
        setFilms(filmData.results);
        const starshipData: StarshipsResponseType = await getStarship(
          data.starships
        );
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

  const nodes: Node[] = generateNodes(hero!, films, starships);
  const edges: Edge[] = generateEdges(hero!, films);

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
