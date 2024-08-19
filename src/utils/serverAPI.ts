import { refreshAccessToken } from '@/utils/auth.util';
import nextAuthOptions from '@/utils/nextOptions/nextAuthOptions';
import axios from 'axios';
import { getServerSession } from 'next-auth';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createServerAPI = async () => {
  const session = await getServerSession(nextAuthOptions);
  let accessToken = session?.user?.accessToken || '';
  const serverAPI = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  serverAPI.interceptors.request.use(
    async (config) => {
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
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = session?.user?.refreshToken;

          if (refreshToken) {
            const newAccessToken = await refreshAccessToken(refreshToken);

            if (session && session.user) {
              session.user.accessToken = newAccessToken;
              accessToken = newAccessToken;
            }

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return serverAPI(originalRequest);
          } else {
            throw new Error('No refresh token available');
          }
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          throw refreshError;
        }
      }
      return Promise.reject(error);
    },
  );

  return serverAPI;
};
