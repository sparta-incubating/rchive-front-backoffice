import axios from 'axios';
import { getCookie } from 'cookies-next';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const client = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie('AT');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log('액세스 토큰 오류');
    }
    return config;
  },

  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => {
    console.log('응답 받음:', response.status, response.config.url);
    return response;
  },

  async (error) => {
    console.error('API 오류:', error.response?.status, error.response?.data);
    // 토큰 재발행 로직 추가 예정
    return Promise.reject(error);
  },
);
