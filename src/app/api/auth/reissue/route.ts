import axiosInstance from '@/utils/axiosAPI';
import axios from 'axios';
import { NextResponse } from 'next/server';

interface ReissueResponse {
  status: number;
  message: string;
}

export async function POST() {
  try {
    const response = await axiosInstance.post<ReissueResponse>(
      '/apis/v1/users/reissue',
    );
    return new NextResponse(response.data.message, { status: response.status });
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
