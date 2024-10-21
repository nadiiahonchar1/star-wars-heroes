import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeroItem from './HeroItem';

describe('HeroItem Component', () => {
  // Test to verify that the hero name and image are rendered correctly
  test('renders hero name and image', () => {
    render(
      <BrowserRouter>
        <HeroItem id={1} name="Luke Skywalker" />
      </BrowserRouter>
    );

    const heroName = screen.getByText('Luke Skywalker');
    const heroImage = screen.getByAltText('Luke Skywalker');

    expect(heroName).toBeInTheDocument();
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute(
      'src',
      'https://starwars-visualguide.com/assets/img/characters/1.jpg'
    );
  });
});
