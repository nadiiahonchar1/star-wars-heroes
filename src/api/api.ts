import axios from 'axios';

export const fetchHeroes = async (page: number) => {
  const response = await axios.get(
    `https://sw-api.starnavi.io/people/?page=${page}`
  );
  return response.data; 
};

export const getHeroByID = async (id: number) => {
  const response = await axios.get(
    `https://sw-api.starnavi.io/people/${id}/`
  );
  return response.data; 
};