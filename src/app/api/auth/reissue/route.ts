import { auth, unstable_update } from '@/auth';
import { extractRefreshToken } from '@/utils/auth.util';
import axiosInstance from '@/utils/axiosAPI';
import axios from 'axios';
import { NextResponse } from 'next/server';

interface ReissueResponse {
  status: number;
  message: string;
}

export async function POST() {
  const session = await auth();
  const refreshToken = session?.user.refreshToken;
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

    // refresh token cookie에 저장
    const setCookie = response.headers['set-cookie'] as string[];

    let newRefreshToken = '';

    if (setCookie) {
      newRefreshToken = extractRefreshToken(setCookie);
    }

    const accessToken = response.headers.authorization.replace('Bearer ', '');
    if (response?.status === 200) {
      // 세션 업데이트
      const session = await auth();
      if (session && session.user) {
        await unstable_update({
          ...session,
          user: {
            ...session?.user,
            accessToken,
            refreshToken: newRefreshToken || session.user.refreshToken,
          },
        });
      }

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
