import axios from 'axios';
const KEY = '33498062-ee2b42b41cbde2a2a11e8f88d';
// не мій апішний ключ
export async function getProducts(search, page) {
  console.log('search:', search);

  const products = await axios.get(
    `https://pixabay.com/api?key=${KEY}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );

  return products;
}

// if (!searchTopic) {
//   return Notify.failure(
//     'Sorry, You have not entered what you want to search for. Please try again.'
//   );
// }
