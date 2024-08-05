// middleware.ts
import { serverLogout } from '@/api/authApi';
import { deleteCookie, getCookie } from 'cookies-next';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const token = getCookie('AT', { res, req });
  const role = getCookie('trackRole', { res, req });
  const { pathname } = req.nextUrl;

  // 로그인 정보와 권한이 필요한 페이지
  // 필요한 페이지 아래와 같이 if문에 추가.
  if (pathname === '/' || pathname.startsWith('/posts')) {
    if (!token || !role) {
      await serverLogout(req);
      deleteCookie('AT', { res, req });
      deleteCookie('loginId', { res, req });
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // 로그인 정보는 필요하지만 권한이 필요없는 페이지
  // 필요한 페이지 아래와 같이 if문에 추가.
  if (pathname === '/role/result') {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets/icons).*)'],
};
