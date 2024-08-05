import { setServerCookieLogin } from '@/utils/auth.server.util';
import { serverAPI } from '@/utils/serverAPI';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const response = await serverAPI.post('/api/v1/users/login', {
      username: data.username,
      password: data.password,
    });
    const accessToken = response.headers.authorization.replace('Bearer ', '');
    if (response?.status === 200) {
      setServerCookieLogin(accessToken);

      return new NextResponse('로그인 성공', { status: 200 });
    } else {
      return new NextResponse('로그인 실패', { status: response.status });
    }
  } catch (error) {
    console.log(error, '로그인 오류');
  }
}
