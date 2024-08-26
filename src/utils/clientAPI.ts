import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

let currentAccessToken: string | null = null;

const getAuthorizationToken = async () => {
  if (currentAccessToken) {
    return currentAccessToken;
  }

  const SESSION = await getSession();

  if (SESSION) {
    const {
      user: { accessToken },
    } = SESSION;

    currentAccessToken = accessToken;
    return accessToken;
  }
  throw Error('토큰이 없습니다. 로그인 해주시고 이용해주세요');
};

export const client = axios.create({
  baseURL: BACKEND_URL,
});

client.interceptors.request.use(
  async (config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

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

        if (refreshToken) {
          const response = await axios.post('/api/auth/reissue');

          // 새로운 액세스 토큰을 전역 변수에 저장
          currentAccessToken = response.data.accessToken;

          // 새로운 헤더로 Authorization 토큰 업데이트
          originalRequest.headers.Authorization = `Bearer ${currentAccessToken}`;

          // 원래의 요청을 새로운 토큰으로 재시도
          return client(originalRequest);
        } else {
          throw new Error('No refresh token available');
        }
      } catch (refreshError) {
        console.error('Failed to refresh token, logging out');

        try {
          await signOut();
        } catch (logoutError) {
          console.error('Failed to sign out:', logoutError);
        } finally {
          currentAccessToken = null;
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
