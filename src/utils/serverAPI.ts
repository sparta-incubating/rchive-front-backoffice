import { auth } from '@/auth';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

let currentAccessToken: string | null = null;

export const createServerAPI = async () => {
  const session = await auth();

  currentAccessToken = session?.user?.accessToken || '';

  const serverAPI = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  serverAPI.interceptors.request.use(
    async (config) => {
      if (currentAccessToken) {
        config.headers.Authorization = `Bearer ${currentAccessToken}`;
      } else {
        console.log('액세스 토큰 오류');
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  return serverAPI;
};
