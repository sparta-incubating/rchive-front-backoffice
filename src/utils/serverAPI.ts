import { auth } from '@/auth';
import { refreshAccessToken } from '@/utils/auth.util';
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
            /*            const response = await axios.post(
                          `/api/auth/reissue`,
                          {},
                          {
                            withCredentials: true,
                          },
                        );
                        currentAccessToken = response.data.accessToken;*/
            currentAccessToken = await refreshAccessToken(refreshToken);
            // 변경된 accessToken을 session이 아닌 cookie에 임시 저장한다.

            /*    if (session && session.user) {
                  await unstable_update({
                    ...session,
                    user: { ...session?.user, accessToken: currentAccessToken },
                  });
                }
    */
            originalRequest.headers.Authorization = `Bearer ${currentAccessToken}`;

            return serverAPI(originalRequest);
          } else {
            throw new Error('No refresh token available');
          }
        } catch (refreshError) {
          console.error('Failed to refresh token, logging out');
          throw refreshError;
        }
      }

      return Promise.reject(error);
    },
  );

  return serverAPI;
};
