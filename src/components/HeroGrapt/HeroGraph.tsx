import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const HeroGraph: React.FC<HeroGraphProps> = ({ hero, films, starships }) => {
  const nodes = [
    {
      id: 'hero',
      type: 'default',
      position: { x: 250, y: 0 },
      data: { label: hero.name },
    },
    ...films.map((film, index) => ({
      id: `film-${film}`,
      type: 'default',
      position: { x: 250 * index, y: 150 },
      data: { label: `Film ${film}` },
    })),
    ...starships.map((ship, index) => ({
      id: `ship-${ship}`,
      type: 'default',
      position: { x: 250 * index, y: 300 },
      data: { label: `Starship ${ship}` },
    })),
  ];

  const edges = [
    ...films.map((film) => ({
      id: `e1-${film}`,
      source: 'hero',
      target: `film-${film}`,
    })),
    ...starships.map((ship) => ({
      id: `e2-${ship}`,
      source: `film-${ship}`,
      target: `ship-${ship}`,
    })),
  ];

  return (
    <div style={{ height: '500px' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default HeroGraph;
