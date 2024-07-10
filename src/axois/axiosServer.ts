import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const client = axios.create({
  baseURL: BACKEND_URL,
});

client.interceptors.request.use(
  (config) => {
    console.log('인터셉트 성공');

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
    return Promise.reject(error);
  },
);
