import axios from 'axios';
import iziToast from 'izitoast';

const API_KEY = '45273601-269fa7243c6da01438f09c62a';

const axiosInstance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: API_KEY,
  },
});

export const getImagesFromAPI = async (
  searchQuery,
  page = 1,
  per_page = 15
) => {
  try {
    const { data } = await axiosInstance.get('/', {
      params: {
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        page,
        per_page,
      },
    });
    return {
      images: data.hits,
      total: data.totalHits,
    };
  } catch (error) {
    iziToast.error({
      icon: '',
      iconText: '',
      title: '❌ Error',
      message: `Error while fetching images. Please try again! ${error}`,
    });
    return {
      images: [],
      total: 0,
    };
  }
};
