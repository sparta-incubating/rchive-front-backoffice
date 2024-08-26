import { login } from '@/api/server/authApi';
import { extractAccessToken, extractRefreshToken } from '@/utils/auth.util';
import axios from 'axios';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          // login 진행
          const response = await login(
            credentials?.username as string,
            credentials?.password as string,
          );

          // refresh token cookie에 저장
          const setCookie = response.headers['set-cookie'] as string[];
          const refreshToken = extractRefreshToken(setCookie);

          // access token 가져오기
          const accessToken = extractAccessToken(
            response.headers.authorization,
          );

          if (response?.status === 200) {
            // User 타입의 객체 반환 (name의 타입을 string으로 설정)
            return {
              id: accessToken,
              name: credentials?.username as string, // ensure name is a string
              email: credentials?.username as string, // ensure email is a string
              accessToken,
              refreshToken,
            };
          }
          return null;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const message = Object.values(error.response?.data)[0] as string;
            throw new Error(message);
          }
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
