import { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './HeroDetail.module.css';

// Create nodes for the hero, films, and starships
export const generateNodes = (
  hero: HeroType,
  films: FilmType[],
  starships: StarshipType[]
): Node[] => {
  return [
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
};

// Create edges between the hero and films, and between films and starships
export const generateEdges = (hero: HeroType, films: FilmType[]): Edge[] => {
  return [
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
};
