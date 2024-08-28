import { getLastConnectRole, getRoleApplyStatus } from '@/api/server/authApi';
import { authConfig } from '@/auth.config';
import { trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';
import axiosAPI from '@/utils/axiosAPI';
import NextAuth from 'next-auth';

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
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

      // update 함수 호출시 실행되는 부분
      if (trigger === 'update' && session) {
        token = {
          ...token,
          accessToken: session.user.accessToken,
          sub: session.user.accessToken,
          refreshToken: session.user.refreshToken,
        };

        return token;
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
    async signOut(token) {
      let refreshToken;
      let accessToken;
      if (
        'session' in token &&
        token.session &&
        'refreshToken' in token.session
      ) {
        refreshToken = token.session.refreshToken;
      } else if (
        'token' in token &&
        token.token &&
        'refreshToken' in token.token
      ) {
        refreshToken = token.token.refreshToken;
      }

      if (
        'session' in token &&
        token.session &&
        'accessToken' in token.session
      ) {
        accessToken = token.session.accessToken;
      } else if (
        'token' in token &&
        token.token &&
        'accessToken' in token.token
      ) {
        accessToken = token.token.accessToken;
      }

      await axiosAPI.delete('/apis/v1/users/logout', {
        headers: {
          Cookie: `Refresh=${refreshToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
  },
});
