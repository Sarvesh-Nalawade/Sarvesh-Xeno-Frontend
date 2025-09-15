import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For MVP, fake auth: check for a custom cookie, or always redirect if not already on /auth/sign-in
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth/sign-in');

  // (Optional: Check for a real auth cookie here)
  // For now, always redirect to sign-in unless already there
  if (!isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/sign-in';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|images|api).*)'],
};

