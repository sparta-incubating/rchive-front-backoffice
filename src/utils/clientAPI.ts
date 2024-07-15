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
    console.log(session, 'session');
    // if (session) {
    //   request.headers = {
    //     ...request.headers,
    //     Authorization: `Bearer ${session.jwt}`,
    //   };
    // }
    // client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },

  (error) => {
    console.log('요청 에러');
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => {
    console.log('응답 받음!');

    return response;
  },

  (error) => {
    console.log('응답 에러');

    // status에 따른 Error Handling
    const errorResponse = error.response;
    const statusCode = errorResponse.status;
    console.log(statusCode);

    // client.post('/api/v1/users/reissue');

    return Promise.reject(error);
  },
);
