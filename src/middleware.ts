import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('nextjs');
  console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll();
  console.log(allCookies);

  request.cookies.has('nextjs'); // => true
  request.cookies.delete('nextjs');
  request.cookies.has('nextjs'); // => false

  return NextResponse.redirect(new URL('/', request.url));
}

//특정 path로만 해당 미들웨어가 동작
// matcher: ['/about/:path*', '/dashboard/:path*'],
export const config = {
  matcher: ['/my/:path*', '/login', '/signup'],
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  // '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
