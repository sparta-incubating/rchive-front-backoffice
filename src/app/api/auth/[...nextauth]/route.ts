import NextAuth from 'next-auth';
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
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
            headers: {
              'Content-Type': 'application/json',
              Origin: 'http://localhost:3000',
            },
          },
        );

        const user = await res.json();
        console.log(user, 'user');
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  debug: true,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.accessToken = user.token;
      }
      return { ...token, ...user };
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.accessToken = token.accessToken;
      return { ...token, ...session };
    },
  },
  pages: {
    signIn: '/signin',
  },
});

export { handler as GET, handler as POST };
