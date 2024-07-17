import axios from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

axios.defaults.baseURL = process.env.BACKEND_URL;

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: '이메일',
          type: 'email',
          placeholder: 'test@gmail.com',
        },
        password: { label: '비밀번호', type: 'password' },
      },

      async authorize(credentials, req) {
        try {
          const { data } = await axios.post(
            '/api/v1/users/login',
            credentials,
            { withCredentials: true },
          );
          if (data) {
            return data;
          }
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      {
        session.user = token as any;
        return session;
      }
    },
  },
  // 로그인페이지 설정
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
