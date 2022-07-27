import axios from 'axios';
import { toast } from 'react-toastify';

const API_KEY = '27690883-978e56c4f986dc8399e7ca8d2';
const BASE_URL = 'https://pixabay.com/api/';

export const searchParams = {
  q: '',
  page: 1,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

const customAxios = axios.create({
  baseURL: `${BASE_URL}?key=${API_KEY}`,
});

export const fetchQuery = async params => {
  try {
    const result = await customAxios.get('', { params });
    return result;
  } catch (error) {
    toast.error('Pixabay error!');
  }
};
