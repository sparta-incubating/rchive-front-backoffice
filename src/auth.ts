import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password,
              }),
            },
          );

          if (res.status === 401 || res.status === 403) {
            throw new Error('Authentication failed');
          }

          const user = await res.json();
          console.log(user);
          return user || null;
        } catch (error) {
          throw new Error('error');
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = 'admin';
      }
      return token;
    },
    session: async ({ session, token }) => {
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});
