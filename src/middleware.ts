// middleware.ts
import { auth } from '@/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append('Access-Control-Allow-Origin', '*');
  res.headers.append(
    'Access-Control-Allow-Methods',
    'GET,DELETE,PATCH,POST,PUT',
  );
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/backoffice/admin', req.url));
  }

  // /login 페이지는 항상 접근 가능
  if (pathname === '/login') {
    return NextResponse.next();
  }

  const session = await auth();
  const accessToken = session?.user.accessToken;
  const trackRole = session?.user.trackRole;
  const roleApply = session?.user.roleApply;
  const role = trackRole;

  // AccessToken이 없는 경우, /login으로 리다이렉트 (루트 경로 포함)
  if (!accessToken && pathname !== '/login') {
    return NextResponse.redirect(new URL('/backoffice/login', req.url));
  }

  // /role, /role/result는 AccessToken이 있으면 접근 가능
  if ((pathname === '/role' || pathname === '/role/result') && accessToken) {
    return NextResponse.next();
  }

  // AccessToken과 Role이 모두 있는 경우, 모든 페이지 접근 허용
  if (accessToken && role) {
    return NextResponse.next();
  }

  // AccessToken은 있지만 Role이 없는 경우
  if (accessToken && !role) {
    if (roleApply) {
      return NextResponse.redirect(new URL('/backoffice/role/result', req.url));
    } else {
      return NextResponse.redirect(new URL('/backoffice/role', req.url));
    }
  }

  // 기본적으로 로그인 페이지로 리다이렉트
  return NextResponse.redirect(new URL('/backoffice/login', req.url));
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|assets/icons).*)',
  ],
};
