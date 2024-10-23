import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const serverAxios = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const addAccessTokenToRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const { auth } = await import('@/auth');
  const session = await auth();
  const accessToken = session?.user?.accessToken;

  if (accessToken) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  } else {
    console.log('액세스 토큰이 존재하지 않습니다.');
  }

  return config;
};

serverAxios.interceptors.request.use(addAccessTokenToRequest, (error) =>
  Promise.reject(error),
);
