import axios from 'axios';
import { getSession } from 'next-auth/react';

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
    console.log('응답 받음:', response.status, response.config.url);

    return response;
  },

  async (error) => {
    console.log('오류 발생:', error.response?.status, error.config.url);

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          '/api/v1/users/reissue',
          {},
          {
            withCredentials: true, // 쿠키 전송을 위해 필요
          },
        );
        console.log(refreshResponse.data, '??????');
        const { accessToken } = refreshResponse.data.accessToken;

        // 세션 업데이트
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken }),
        });

        client.defaults.headers.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return client(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우, 로그아웃 처리
        // 여기에 로그아웃 로직을 추가하세요

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
