import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactFlow, { Node, Edge, Position, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { getHeroByID, getFilm, getStarshipByID } from '../../api/api';
import styles from './HeroDetail.module.css';

const HeroDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hero, setHero] = useState<HeroType | null>(null);
  const [films, setFilms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getHero = async () => {
      setLoading(true);
      try {
        const data = await getHeroByID(Number(id));
        setHero(data);
        console.log('data', data);
        const filmData = await getFilm(data.films);
        console.log('filmData.results', filmData.results);
        setFilms(filmData.results);
      } catch (err) {
        setError('Failed to get hero details');
      } finally {
        setLoading(false);
      }
    };

    getHero();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const nodes: Node[] = [
    {
      id: `hero-${hero!.id}`,
      type: 'input',
      data: { label: hero!.name },
      position: { x: 250, y: 0 },
    },
    ...films.map((film, index) => ({
      id: `film-${index}`,
      data: { label: film.title },
      position: { x: 150 * index, y: 150 },
    })),
    ...hero!.starships.map((starship, index) => ({
      id: `starship-${index}`,
      data: { label: starship },
      position: { x: 150 * index, y: 300 },
    })),
  ];

  const edges: Edge[] = [
    ...hero!.films.map((film, index) => ({
      id: `hero-film-${index}`,
      source: `hero-${hero!.id}`,
      target: `film-${index}`,
      animated: true,
    })),
    ...hero!.starships.map((starship, index) => ({
      id: `film-starship-${index}`,
      source: `film-${Math.floor(index / 2)}`,
      target: `starship-${index}`,
      animated: true,
    })),
  ];

  return (
    <div className={styles.container}>
      <div>Hello World</div>
      <div style={{ height: '500px', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodesConnectable={false}
          edgesFocusable={false}
        >
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default HeroDetail;
