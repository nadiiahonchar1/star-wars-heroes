import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { fetchHeroes } from './api/api';

// Mock the fetchHeroes function from the API
jest.mock('./api/api', () => ({
  fetchHeroes: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test for the initial loading state
  test('renders loading state initially', () => {
    (fetchHeroes as jest.Mock).mockResolvedValueOnce({ results: [] });

    render(<App />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  // Test for error handling when fetching heroes fails
  test('renders error message when fetching heroes fails', async () => {
    (fetchHeroes as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to get hero data')
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to get hero data/i)).toBeInTheDocument();
    });
  });

  // Test for rendering the list of heroes
  test('renders list of heroes', async () => {
    const heroesData = {
      results: [
        { id: 1, name: 'Luke Skywalker' },
        { id: 2, name: 'Darth Vader' },
      ],
      next: null,
      previous: null,
    };

    (fetchHeroes as jest.Mock).mockResolvedValueOnce(heroesData);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/List of Star Wars heroes/i)).toBeInTheDocument();
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();
    });
  });
});
