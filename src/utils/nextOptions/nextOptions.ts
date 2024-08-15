import { trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';
import axiosInstance from '@/utils/axiosAPI';
import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        username: { type: 'username' },
        password: { type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          // login 진행
          const response = await axiosInstance.post('/apis/v1/users/login', {
            username: credentials?.username,
            password: credentials?.password,
          });

          // refresh token cookie에 저장
          const setCookie = response.headers['set-cookie'] as string[];
          const refreshToken = setCookie[0].split('=')[1].split(';')[0];

          // access token 가져오기
          const accessToken = response.headers.authorization.replace(
            'Bearer ',
            '',
          );

          if (response?.status === 200) {
            // User 타입의 객체 반환
            return {
              id: accessToken,
              name: credentials?.username,
              email: credentials?.username,
              accessToken,
              refreshToken,
            };
          }
          return null;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log({ error });
            const message = Object.values(error.response?.data)[0] as string;
            console.log(message);
            throw new Error(message);
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 5 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        // 여기서 추가 정보를 가져옵니다
        try {
          const response = await axiosInstance.get(
            '/apis/v1/role/select/last',
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            },
          );
          console.log(response.data.data);
          const { trackId, trackRole, trackName, period } = response.data.data;
          token.trackId = trackId;
          token.trackRole = trackRole;
          token.trackName = trackName;
          token.loginPeriod = period;
        } catch (error) {
          const roleResponse = await axiosInstance.get(
            '/apis/v1/role/request',
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            },
          );
          const { data } = roleResponse.data;
          token.roleApply = data;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.user.roleError = token.roleError as string | undefined;
      session.user.trackId = token.trackId as number;
      session.user.trackRole = token.trackRole as trackRole;
      session.user.trackName = token.trackName as TrackType;
      session.user.loginPeriod = token.loginPeriod as number;
      return session;
    },
  },
  events: {
    async signOut({ session, token }) {
      await axiosInstance.delete('/apis/v1/users/logout', {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          Cookie: `Refresh=${token.refreshToken}`,
        },
      });
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/role',
    error: '/error',
  },
  debug: process.env.NEXT_PUBLIC_RUN_MODE === 'development',
};

export default nextAuthOptions;
