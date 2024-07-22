import { AuthToken, LoginUser } from '@/types/login.types';
import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: LoginUser | undefined) {
        if (!credentials) {
          throw new Error('Credentials are required');
        }

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

          if (res.ok) {
            const authorizationHeader = res.headers.get('authorization');
            const accessToken = authorizationHeader
              ? authorizationHeader.replace('Bearer ', '')
              : '';

            const cookies = res.headers.get('set-cookie');
            const refreshToken = cookies
              ? cookies.split(';')[0].split('=')[1]
              : '';

            return { accessToken, refreshToken };
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: AuthToken }) {
      if (user) {
        token.accessToken = user?.accessToken;
        token.refreshToken = user?.refreshToken;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.accessToken = token?.accessToken;
        session.refreshToken = token?.refreshToken;
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
