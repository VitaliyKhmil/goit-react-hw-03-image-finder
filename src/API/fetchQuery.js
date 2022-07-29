import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL, API_KEY} from '../components/Constants/API';

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
