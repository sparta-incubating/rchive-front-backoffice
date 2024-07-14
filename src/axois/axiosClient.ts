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

    // const { accessToken } = ;
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

    // if (error.response.status === 401) {
    //   client.post('/api/v1/users/reissue');
    // }else if(){
    //console.log("다시 로그인 해주세요")
    //}

    return Promise.reject(error);
  },
);
