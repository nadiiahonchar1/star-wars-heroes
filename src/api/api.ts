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

// export const getFilmByID = async (id: number) => {
//   const response = await axios.get(`https://sw-api.starnavi.io/films/${id}/`);
//   return response.data.title;
// };

export const getStarshipByID = async (id: number) => {
  const response = await axios.get(
    `https://sw-api.starnavi.io/starships/${id}/`
  );
  return response.data.name;
};

export const getFilm = async (ids: Films) => {
    const idList = ids.join(',');
  const response = await axios.get(
    `https://sw-api.starnavi.io/films/?id__in=${idList}`
  );
  return response.data;
};

// export const getStarship = async (filmId: string, heroId: number) => {
//   const response = await axios.get(
//     `https://sw-api.starnavi.io/starships/?films__in=${filmId}&pilots__in=${heroId}`
//   );
//   return response.data;
// };
// export const getStarship = async (filmId: string) => {
//   const response = await axios.get(
//     `https://sw-api.starnavi.io/starships/?films__in=${filmId}`
//   );
//   return response.data;
};