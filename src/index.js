import { getProducts } from './js/products';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';

const searchFormRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtnRef = document.querySelector('.load-more');

let lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

let page = 1;
let totalHits;
loadMoreBtnRef.style.display = 'none';

loadMoreBtnRef.addEventListener('click', showMoreImage);
searchFormRef.addEventListener('submit', getAllProducts);

function getAllProducts(e) {
  e.preventDefault();
  page = 1;
  clearGallery();
  searchRequest();
}

async function searchRequest() {
  const searchTopic = searchFormRef.elements[0].value.trim();
  const { data } = await getProducts(searchTopic, page);
  const hits = data.hits;
  totalHits = data.totalHits;
  if (hits.length === 0) {
    loadMoreBtnRef.style.display = 'none';
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  Notify.success(`Hooray! We found ${totalHits} images`);
  loadMoreBtnRef.style.display = 'block';
  renderImage(hits);
}

function renderImage(hits) {
  console.log('hits:', hits);

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
  galleryRef.insertAdjacentHTML('beforeend', markup);
  lightBox.refresh();
}

function clearGallery() {
  galleryRef.innerHTML = '';
}

function showMoreImage() {
  page += 1;
  searchRequest();
}
