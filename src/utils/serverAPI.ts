import axios from 'axios';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { serverLogout } from './auth.server.util';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const serverAPI = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

serverAPI.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie('AT', { cookies });

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log('액세스 토큰 오류');
    }
    return config;
  },

  (error) => Promise.reject(error),
);

serverAPI.interceptors.response.use(
  (response) => {
    console.log('응답 받음:', response.status, response.config.url);
    return response;
  },

  async (error) => {
    console.error('API 오류:', error.response?.status, error.response?.data);
    // 토큰 재발행 로직 추가 예정

    if (error.response?.status === 401) {
      serverLogout();
    }

    return Promise.reject(error);
  },
);
