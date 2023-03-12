import axios from 'axios';
export const pixabay = axios.create({
  baseURL: 'https://pixabay.com/api?key=34322174-2bb2d5b62b2bbc36c28141246&',
  timeout: 1000,
});
