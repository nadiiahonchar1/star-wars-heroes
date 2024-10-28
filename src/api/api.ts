// import axios from 'axios';
import apiClient from './axiosConfig';

// Function to fetch heroes data from the API based on the page number
export const fetchHeroes = async (page: number): Promise<HeroesResponseType> => {
  const response = await apiClient.get(`/people/?page=${page}`);
  return response.data;
};

// Function to get details of a specific hero by their ID
export const getHeroByID = async (id: number): Promise<HeroType> => {
  const response = await apiClient.get(`/people/${id}/`);
  return response.data;
};

// Function to fetch multiple films based on their IDs
export const getFilm = async (ids: Films): Promise<FilmsResponseType> => {
  const idList = ids.join(',');
  const response = await apiClient.get(`/films/?id__in=${idList}`);
  return response.data;
};

// Function to fetch multiple starships based on their IDs
export const getStarship = async (ids: Starships): Promise<StarshipsResponseType> => {
  const idList = ids.join(',');
  const response = await apiClient.get(`/starships/?id__in=${idList}`);
  return response.data;
};