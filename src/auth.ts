import { getLastConnectRole, getRoleApplyStatus } from '@/api/server/authApi';
import { authConfig } from '@/auth.config';
import { trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';
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
      console.log('signOut이 진행되고있어요.');
    },
  },
});
