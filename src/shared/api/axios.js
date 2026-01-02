import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
});

// Add a response interceptor
API.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('INSIDE RESPONSE INTERCEPTOR SUCCESS');
    // console.log(response.data);

    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    console.log('INSIDE RESPONSE INTERCEPTOR FAILED');
    console.log(error);
    return Promise.reject(error);
  }
);
