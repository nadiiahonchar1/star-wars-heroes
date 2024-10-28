import axios from 'axios';

//Function to convert `snake_case` to `camelCase`
const toCamelCase = (str: string) =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

//Recursive function to convert all keys to `camelCase`
const convertKeysToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = toCamelCase(key);
      acc[camelCaseKey] = convertKeysToCamelCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};

//Axios instance created
const apiClient = axios.create({
  baseURL: 'https://sw-api.starnavi.io',
});

//Configure the interceptor to convert the response into camelCase
apiClient.interceptors.response.use(
  (response) => {
    response.data = convertKeysToCamelCase(response.data);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
