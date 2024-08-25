import { refreshToken } from '@/api/server/authApi';
import { NextApiResponse } from 'next';

export const extractAccessToken = (token: string) => {
  return token.replace('Bearer ', '');
};

export const extractRefreshToken = (token: string[]) => {
  return token[0].split('=')[1].split(';')[0];
};

export const refreshAccessToken = async (refreshTokenValue: string) => {
  try {
    const refreshResponse = await refreshToken(refreshTokenValue);
    return extractAccessToken(refreshResponse.headers.authorization);
  } catch (error) {
    console.error('Refresh token is expired or invalid');
    throw error;
  }
};

export const handleServerLogout = (res: NextApiResponse) => {
  res.setHeader('Set-Cookie', [
    'next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'next-auth.csrf-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
  ]);

  // 클라이언트 로그아웃 페이지로 리다이렉트
  res.writeHead(302, { Location: '/login' });
  res.end();
};
