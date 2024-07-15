import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'user-credentials',
      name: 'Credentials',
      credentials: {
        username: {
          label: 'username',
          type: 'text',
          placeholder: '이메일을 입력하세요',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
            },
          );
          if (res.status === 401) {
            console.log('에러에러에러 없는 유저다');
            throw new Error('로그인 실패');
          } else {
            const user = await res.json();
            console.log(user, 'user');
            const jwt = user.accessToken;
            return { ...credentials, user, jwt };
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };
