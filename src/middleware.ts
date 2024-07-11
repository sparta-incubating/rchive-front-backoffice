import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url));
}

//특정 path로만 해당 미들웨어가 동작
export const config = {
  matcher: '/about/:path*',
};
