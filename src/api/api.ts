import axios from 'axios';

// Function to fetch heroes data from the API based on the page number
export const fetchHeroes = async (page: number) => {
  const response = await axios.get(
    `https://sw-api.starnavi.io/people/?page=${page}`
  );
  return response.data; 
};

// Function to get details of a specific hero by their ID
export const getHeroByID = async (id: number) => {
  const response = await axios.get(
    `https://sw-api.starnavi.io/people/${id}/`
  );
  return response.data; 
};

// Function to fetch multiple films based on their IDs
export const getFilm = async (ids: Films) => {
    const idList = ids.join(',');
  const response = await axios.get(
    `https://sw-api.starnavi.io/films/?id__in=${idList}`
  );
  return response.data;
};

// Function to fetch multiple starships based on their IDs
export const getStarship = async (ids: Starships) => {
  const idList = ids.join(',');
  const response = await axios.get(
    `https://sw-api.starnavi.io/starships/?id__in=${idList}`
  );
  return response.data;
};