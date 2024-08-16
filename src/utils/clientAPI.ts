import { refreshAccessToken } from '@/utils/auth.util';
import axios from 'axios';
import { getSession } from 'next-auth/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getAuthorizationToken = async () => {
  const SESSION = await getSession();

  if (SESSION) {
    const {
      user: { accessToken },
    } = SESSION;

    return accessToken;
  }
  throw Error('토큰이 없습니다. 로그인 해주시고 이용해주세요');
};

export const client = axios.create({
  baseURL: BACKEND_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  async (config) => {
    const accessToken = await getAuthorizationToken();
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
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const session = await getSession();
        const refreshToken = session?.user.refreshToken;
        //
        if (refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken);
          console.log({ newAccessToken });

          // Update the session with the new access token
          session.user.accessToken = newAccessToken;

          // Update the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request
          return client(originalRequest);
        } else {
          // await signOut();
        }
      } catch (refreshError) {
        console.error('Failed to refresh token, logging out');
        // await signOut();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
