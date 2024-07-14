import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const AUTH_PAGES = ['/', '/login'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const { origin, pathname } = nextUrl;
  const accessToken = cookies.get(ACCESS_TOKEN_KEY);

  return NextResponse.redirect(new URL('/', request.url));
}

//특정 path로만 해당 미들웨어가 동작
// matcher: ['/about/:path*', '/dashboard/:path*'],
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
