// middleware.ts
import { auth } from '@/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append('Access-Control-Allow-Origin', '*'); // replace this your actual origin
  res.headers.append(
    'Access-Control-Allow-Methods',
    'GET,DELETE,PATCH,POST,PUT',
  );
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );

  const session = await auth();

  const accessToken = session?.user.accessToken;
  const trackId = session?.user.trackId;
  const trackRole = session?.user.trackRole;
  const trackName = session?.user.trackName;
  const loginPeriod = session?.user.loginPeriod;
  const roleApply = session?.user.roleApply;

  console.log('this is middle ware');

  const role = trackRole;
  const { pathname } = req.nextUrl;

  // /login 페이지는 아무 조건 없이 접근 가능
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // /role, /role/result는 AccessToken이 있어야 접근 가능
  if ((pathname === '/role' || pathname === '/role/result') && accessToken) {
    return NextResponse.next();
  }

  // 1. AccessToken과 Role이 모두 있는 경우, 모든 페이지 접근 허용
  if (accessToken && role) {
    return NextResponse.next();
  }

  // 2. AccessToken은 있지만 Role이 없는 경우, /role로 리다이렉션
  if (accessToken && !role) {
    if (roleApply) {
      // 3. AccessToken은 있지만 Role이 없고, roleApply가 있다면 /role/result로 리다이렉션
      return NextResponse.redirect(new URL('/role/result', req.url));
    } else {
      return NextResponse.redirect(new URL('/role', req.url));
    }
  }

  // 기타 경우: 로그인 페이지로 리다이렉션
  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets/icons).*)'],
};
