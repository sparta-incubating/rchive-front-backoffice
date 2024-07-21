import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Origin: 'http://localhost:3000',
              },
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
              }),
            },
          );

          if (res.status === 401) {
            console.log('아이디 및 비밀번호를 확인하세요');
            throw new Error('로그인 실패');
          } else {
            const user = res;

            const accessToken = res.headers.get('authorization');
            const refreshToken = res.headers
              .get('set-cookie')
              ?.split(';')[0]
              .split('=')[1];

            return { ...user, accessToken, refreshToken };
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  //   debug: true,
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log('유저유저유저입미다아앙2222', user);

    //   // 여기서 추가적인 검증을 수행할 수 있습니다.
    //   return true; // 로그인 허용
    // },
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        console.log(user, 'user');
        token.authToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        console.log('토큰', token.authToken);
      }
      return { ...token, ...user };
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.accessToken = token.accessToken;
      console.log('세션', session.accessToken);
      return { ...token, ...session };
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
