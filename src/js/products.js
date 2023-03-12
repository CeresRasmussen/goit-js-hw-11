import { pixabay } from './api';
export async function getProducts() {
  const products = await pixabay.get(
    'q=yellow+flowers&image_type=photo&per_page=20'
  );
  return products;
}
