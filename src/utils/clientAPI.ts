import axios from 'axios';
import { parseCookies } from 'nookies';

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
    const cookies = parseCookies();
    const accessToken = cookies.accessToken;

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
    //   const originalRequest = error.config;
    //   if (error.response.status === 401 && !originalRequest._retry) {
    //     originalRequest._retry = true;
    //     try {
    //       const response = await client.post(
    //         '/api/v1/users/reissue',
    //         {},
    //         { withCredentials: true },
    //       );
    //       const newAccessToken = response.data.accessToken;
    //       setCookie(null, 'accessToken', newAccessToken, {
    //         maxAge: 30 * 24 * 60 * 60,
    //         path: '/',
    //       });
    //       originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    //       return client(originalRequest);
    //     } catch (refreshError) {
    //       //로그아웃 로직
    //       return Promise.reject(refreshError);
    //     }
    //   }
    //   return Promise.reject(error);
  },
);
