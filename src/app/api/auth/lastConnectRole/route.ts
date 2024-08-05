import { LastConnectRoleResponseType } from '@/types/auth.types';
import { setServerCookieRole } from '@/utils/auth.server.util';
import { createServerAPI } from '@/utils/serverAPI';
import { getCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const res = new NextResponse();
  const accessToken = getCookie('AT', { req, res });
  const serverAPI = createServerAPI(String(accessToken));
  try {
    const { data } = await serverAPI.get<LastConnectRoleResponseType>(
      '/api/v1/role/select/last',
    );

    await setServerCookieRole(data.data);

    return new NextResponse('마지막 권한 조회 성공', { status: 200 });
  } catch (error) {
    throw new Error('마지막 권한 조회에 실패했습니다.');
  }
};
