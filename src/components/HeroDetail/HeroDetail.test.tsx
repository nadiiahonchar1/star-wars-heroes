import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroDetail from './HeroDetail';
import * as api from '../../api/api';

jest.mock('../../api/api', () => ({
  getHeroByID: jest.fn(),
  getFilm: jest.fn(),
  getStarship: jest.fn(),
}));

describe('HeroDetail Component', () => {
  test('renders loading state', async () => {
    (api.getHeroByID as jest.Mock).mockResolvedValueOnce({
      films: [],
      starships: [],
    });

    render(
      <MemoryRouter initialEntries={['/hero/1']}>
        <HeroDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('shows error message on failure', async () => {
    (api.getHeroByID as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to get hero details')
    );

    render(
      <MemoryRouter initialEntries={['/hero/1']}>
        <HeroDetail />
      </MemoryRouter>
    );

    expect(
      await screen.findByText('Failed to get hero details')
    ).toBeInTheDocument();
  });
});
