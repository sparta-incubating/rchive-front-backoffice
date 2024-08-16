import {
  getLastConnectRole,
  getRoleApplyStatus,
  logout,
  signIn,
} from '@/api/server/authApi';
import { trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';
import {
  extractAccessToken,
  extractRefreshToken,
  refreshAccessToken,
} from '@/utils/auth.util';
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
          const response = await signIn(
            credentials?.username,
            credentials?.password,
          );

          // refresh token cookie에 저장
          const setCookie = response.headers['set-cookie'] as string[];
          const refreshToken = extractRefreshToken(setCookie);

          // access token 가져오기
          const accessToken = extractAccessToken(
            response.headers.authorization,
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
            console.log('-------------login error----------------');
            console.log(error.response);
            console.log('-------------login error----------------');
            const message = Object.values(error.response?.data)[0] as string;
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
    async jwt({ token, user, trigger }) {
      console.log('jwt 가 실행되어유~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      console.log('jwt 가 실행되어유~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      console.log('jwt 가 실행되어유~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      console.log('jwt 가 실행되어유~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      console.log('jwt 가 실행되어유~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      if (trigger === 'update' && token.accessToken) {
        console.log('update token');
        return { ...token, accessToken: token.accessToken };
      }
      if (trigger === 'update') {
        console.log('update token');
        try {
          token.accessToken = await refreshAccessToken(token.refreshToken);
        } catch (error) {
          //TODO: logout 처리
          token.roleError = '토큰 갱신 실패';
        }
      }
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        // 여기서 추가 정보를 가져옵니다
        try {
          // 이때는 session이 없으므로 token 직접 주입
          const response = await getLastConnectRole(user.accessToken);

          const { trackId, trackRole, trackName, period } = response.data.data;
          token.trackId = trackId;
          token.trackRole = trackRole;
          token.trackName = trackName;
          token.loginPeriod = period;
        } catch (error) {
          // 권한이 없을때
          // 권한 신청이 있는지 조회
          // 여기도 마찬가지로 session이 없음.
          const roleResponse = await getRoleApplyStatus(user.accessToken);
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
      try {
        console.log('signout 진행');

        const response = await logout(token.accessToken);
        console.log('signout 완료');
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.response);
        }
      }
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
