import { setServerCookieLogin } from '@/utils/auth.server.util';
import axiosInstance from '@/utils/axiosAPI';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const cookieStore = cookies();

  try {
    const response = await axiosInstance.post('/apis/v1/users/login', {
      username: data.username,
      password: data.password,
    });

    const setCookie = response.headers['set-cookie'] as string[];
    const refreshToken = setCookie[0].split('=')[1].split(';')[0];
    cookieStore.set('Refresh', refreshToken, { secure: true, httpOnly: true });

    const accessToken = response.headers.authorization.replace('Bearer ', '');
    if (response?.status === 200) {
      await setServerCookieLogin(accessToken);

      const res = new NextResponse();

      getCookie('refresh', { req, res });
      return new NextResponse('로그인 성공', { status: 200 });
    } else {
      return new NextResponse('로그인 실패', { status: response.status });
    }
  } catch (error) {
    console.log(error, '로그인 오류');
  }
}
