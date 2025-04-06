import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import { renderNewImages, renderImages } from './js/render-functions.js';

import { getImagesFromAPI } from './js/pixabay-api.js';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Налаштування iziToast
iziToast.settings({
  timeout: 3000,
});

// Ініціалізація галереї
const gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

// Глобальні змінні
const images = [];
let query = '';
let page = 1;

// Повідомлення про кінець результатів
const searchResultsWarning = () => {
  iziToast.warning({
    title: '⚠️ Warning',
    message: "We're sorry, but you've reached the end of search results.",
  });
};

// Скидання стану
const resetGallery = () => {
  images.length = 0;
  page = 1;
  const galleryContainer = document.querySelector('#gallery');
  galleryContainer.innerHTML = '';
};

// Обробка пошукової форми
const onSubmitSearchFormHandler = async (event, form) => {
  event.preventDefault();
  query = form.elements.search.value.trim();
  const loader = document.querySelector('.loader-wrapper');
  const button = document.querySelector('.load-more');
  const galleryContainer = document.querySelector('#gallery');

  if (!query) {
    iziToast.warning({
      title: '⚠️ Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  loader.classList.remove('hidden');
  button.classList.add('hidden');
  resetGallery();

  try {
    const { images: newImages, total } = await getImagesFromAPI(query, page);

    if (newImages.length) {
      images.push(...newImages);
      renderNewImages(galleryContainer, newImages);
      gallery.refresh();

      if (images.length < total) {
        button.classList.remove('hidden');
      } else {
        searchResultsWarning();
      }
    } else {
      iziToast.error({
        title: '❌ Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
  } catch (error) {
    iziToast.error({
      title: '❌ Error',
      message: 'Something went wrong. Please try again later.',
    });
    console.error(error);
  } finally {
    loader.classList.add('hidden');
    form.reset();
  }
};

// Завантаження додаткових зображень
const onLoadImagesHandler = async button => {
  const loader = document.querySelector('.loader-wrapper');
  const galleryContainer = document.querySelector('#gallery');

  button.classList.add('hidden');
  loader.classList.remove('hidden');

  try {
    const { images: newImages, total } = await getImagesFromAPI(query, ++page);

    if (newImages.length) {
      images.push(...newImages);
      renderImages(galleryContainer, newImages);
      gallery.refresh();

      if (images.length < total) {
        button.classList.remove('hidden');
      } else {
        searchResultsWarning();
      }

      const firstNewImage = document.querySelector('.gallery-item');
      if (firstNewImage) {
        const height = firstNewImage.getBoundingClientRect().height;
        window.scrollBy({
          top: height * 2,
          behavior: 'smooth',
        });
      }
    } else {
      searchResultsWarning();
    }
  } catch (error) {
    iziToast.error({
      title: '❌ Error',
      message: 'Failed to load images. Please try again.',
    });
    console.error(error);
  } finally {
    loader.classList.add('hidden');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#search-form');
  const button = document.querySelector('.load-more');

  form.addEventListener('submit', async event => {
    await onSubmitSearchFormHandler(event, form);
  });

  button.addEventListener('click', async () => {
    await onLoadImagesHandler(button);
  });
});
