import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

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
    console.log('인터셉트 성공');
    const session = await getSession();
    const accessToken = session?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },

  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => {
    console.log('응답 받음!');

    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      console.log('비밀번호를 확인해주세요');
    } else if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const session = await getSession();

        if (session && session?.refreshToken) {
          const res = await client.post('/api/v1/users/reissue', {
            withCredentials: true,
          });

          const newToken = res.data.accessToken;

          // 새로운 액세스 토큰을 세션에 저장합니다.
          const updatedSession = await getSession();
          updatedSession.accessToken = newToken;
          client.defaults.headers.common['Authorization'] =
            `Bearer ${newToken}`;

          return client(originalRequest);
        }
      } catch (error) {
        // 리프레시 토큰도 만료 시
        signOut();
      }
    }

    return Promise.reject(error);
  },
);
