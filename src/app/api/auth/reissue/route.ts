import { setServerAccessTokenCookie } from '@/utils/auth.server.util';
import axiosInstance from '@/utils/axiosAPI';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface ReissueResponse {
  status: number;
  message: string;
}

export async function POST() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('Refresh')?.value || '';
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
      await setServerAccessTokenCookie(accessToken);

      return new NextResponse(response.data.message, {
        status: response.status,
      });
    } else {
      return new NextResponse('갱신 실패', { status: response.status });
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data, '로그인 오류');
      return new NextResponse(
        (error.response?.data as ReissueResponse)?.message || 'Unknown error',
        {
          status: error.response?.status || 500,
        },
      );
    }

    console.error('Unexpected error:', (error as Error).message);
    return new NextResponse(
      (error as Error).message || 'An unexpected error occurred',
      { status: 500 },
    );
  }
}
