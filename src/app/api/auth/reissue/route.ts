import axiosInstance from '@/utils/axiosAPI';
import { serverSession } from '@/utils/nextOptions/nextAuth.util';
import nextAuthOptions from '@/utils/nextOptions/nextAuthOptions';
import axios from 'axios';
import { NextApiRequest } from 'next';
import { getServerSession } from 'next-auth';
import { getToken, JWT } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

interface ReissueResponse {
  status: number;
  message: string;
}

export async function POST(req: NextApiRequest) {
  const { refreshToken } = await serverSession();
  try {
    const response = await axiosInstance.post<ReissueResponse>(
      '/apis/v1/users/reissue',
      {},
      {
        headers: {
          Cookie: `Refresh=${refreshToken}`,
        },
      },
    );

    const accessToken = response.headers.authorization.replace('Bearer ', '');
    if (response?.status === 200) {
      console.log(
        '----------------------------------갱신좀 해봐 ㅠㅠ----------------------------------',
      );
      const token = (await getToken({ req })) as JWT;
      if (token) {
        token.accessToken = accessToken;

        // 세션 업데이트
        const session = await getServerSession(nextAuthOptions);
        if (session && session.user) {
          session.user.accessToken = accessToken;
        }
      }
      console.log(
        '----------------------------------갱신좀 해봐 ㅠㅠ----------------------------------',
      );

      return new NextResponse(
        JSON.stringify({ message: response.data.message, accessToken }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: '갱신 실패', accessToken: '' }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data, '로그인 오류');
      return new NextResponse(
        JSON.stringify({
          message:
            (error.response?.data as ReissueResponse)?.message ||
            'Unknown error',
        }), // Stringify the object
        {
          status: error.response?.status || 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    console.error('Unexpected error:', (error as Error).message);
    return new NextResponse(
      JSON.stringify({
        message: (error as Error).message || 'An unexpected error occurred',
      }), // Stringify the object
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
