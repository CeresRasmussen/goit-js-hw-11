import { getProducts } from './js/products';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormRefs = document.querySelector('#search-form');
const galleryRefs = document.querySelector('.gallery');

searchFormRefs.addEventListener('submit', getAllProducts);

async function getAllProducts(e) {
  e.preventDefault();
  const {
    data: { hits },
  } = await getProducts('Hallo');
  console.log(hits);
  render(hits);
}
let lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

function render(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width=320 height=240/></a>
  <div class="info">
  <p class="info-item">Likes: 
    <b>${likes}</b>
  </p>
    <p class="info-item">Views: 
      <b>${views}</b>
    </p>
    <p class="info-item">Comments: 
      <b>${comments}</b>
    </p>
    <p class="info-item">Downloads:
      <b>${downloads}</b> 
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  galleryRefs.insertAdjacentHTML('beforeend', markup);
  lightBox.refresh();
}
