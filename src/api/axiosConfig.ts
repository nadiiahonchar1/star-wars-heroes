import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://sw-api.starnavi.io',
});

export default apiClient;
