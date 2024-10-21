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

export const getFilm = async (ids: Films) => {
    const idList = ids.join(',');
  const response = await axios.get(
    `https://sw-api.starnavi.io/films/?id__in=${idList}`
  );
  return response.data;
};

export const getStarship = async (ids: Starships) => {
  const idList = ids.join(',');
  const response = await axios.get(
    `https://sw-api.starnavi.io/starships/?id__in=${idList}`
  );
  return response.data;
};