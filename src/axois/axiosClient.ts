'use client';

import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const client = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(
  (config) => {
    console.log('인터셉트 성공');

    // const token = store.getState();

    const accessToken = localStorage.getItem('token');
    client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

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

    // if (error.response.status === 403) {
    //   client.post('/api/v1/users/reissue');
    // }
    const errorResponse = error.response;
    const statusCode = errorResponse.status;
    console.log(statusCode);
    switch (statusCode) {
      case 404:
        alert('해당 이메일로된 아이가 없습니다');
        break;
      case 401:
        alert('비밀번호가 틀렸습니다.');
        break;
      case 400:
        alert('Bad request (요청 형식이 잘못됨)');
        break;
      case 403:
        alert('엑세스 토큰 만료');
        client.post('/api/v1/users/reissue');
        break;
    }
    return Promise.reject(error);
  },
);
