import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

import {
  renderSearchForm,
  renderNewImages,
  renderGalleryWrapper,
  renderLoader,
  renderButton, renderImages,
} from './js/render-functions.js';
import { getImagesFromAPI } from './js/pixabay-api.js';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

iziToast.settings({
  timeout: 3000,
});

const gallery = new SimpleLightbox('#gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const images = [];
let query = '';
let page = 1;

const searchResultsWarning = () => {
  iziToast.warning({
    icon: '',
    iconText: '',
    title: '⚠️ Warning',
    message: "We're sorry, but you've reached the end of search results.",
  });
}

const resetGallery = () => {
  images.length = 0;
  page = 1;
}

const onSubmitSearchFormHandler = async (event, form) => {
  event.preventDefault();
  query = form.elements.search.value;
  const loader = document.querySelector('.loader-wrapper');

  if (query.trim() !== '') {
    const galleryContainer = document.querySelector('#gallery');
    loader.classList.remove('hidden');
    resetGallery();

    const { images: newImages, total } = await getImagesFromAPI(query, page);

    renderNewImages(galleryContainer, newImages);

    if (newImages.length) {
      const button = document.querySelector('.load-more');
      images.push(...newImages);

      if (newImages.length >= total) {
        searchResultsWarning();
        button.classList.add('hidden');
      } else {
        button.classList.remove('hidden');
      }
      gallery.refresh();
    } else {
      iziToast.error({
        icon: '',
        iconText: '',
        title: '❌ Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    }
  } else {
    iziToast.warning({
      icon: '',
      iconText: '',
      title: '⚠️ Warning',
      message: 'Please enter a search query!',
    });
  }

  loader.classList.add('hidden');
  form.reset();
};

const onLoadImagesHandler = async (button) => {
  const loader = document.querySelector('.loader-wrapper');
  const galleryContainer = document.querySelector('#gallery');

  button.classList.add('hidden');
  loader.classList.remove('hidden');

  const { images: newImages, total } = await getImagesFromAPI(query, page += 1);
  images.push(...newImages);

  renderImages(galleryContainer, newImages);
  gallery.refresh();

  if (images.length >= total || newImages.length === 0) {
    searchResultsWarning();
  } else {
    button.classList.remove('hidden');
  }

  if (newImages.length !== 0) {
    const image = document.querySelector('.gallery-item');
    if (image) {
      const height = image.getBoundingClientRect().height;
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }
  }

  loader.classList.add('hidden');
};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  renderSearchForm(root);
  renderGalleryWrapper(root);
  renderLoader(root);
  renderButton(root);

  const form = document.querySelector('#search-form');

  form.addEventListener('submit', async (event) => {
    await onSubmitSearchFormHandler(event, form);
  });

  const button = document.querySelector('.load-more');

  button.addEventListener('click', async () => {
    await onLoadImagesHandler(button);
  });
});