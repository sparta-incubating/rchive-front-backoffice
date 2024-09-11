import { client } from '@/utils/clientAPI';
import axios from 'axios';

export const getTrackNames = async () => {
  try {
    const response = await client.get('/apis/v1/role/track');
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.response?.data);
    }
  }
};
