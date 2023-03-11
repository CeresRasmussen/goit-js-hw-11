import axios from 'axios';
export const pixabay = axios.create({
  baseURL: 'https://pixabay.com/api/',
  timeout: 1000,
});
