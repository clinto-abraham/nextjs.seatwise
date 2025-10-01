
import { NextResponse, type NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/events', '/booking', '/admin'];
  let session = null;

  if (sessionCookie) {
    try {
      session = JSON.parse(sessionCookie.value);
    } catch (error) {
      // Invalid JSON in cookie, treat as no session
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Redirect to login if trying to access protected routes without a full session
  if (!session?.isLoggedIn && protectedRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If user is logged in, redirect away from public pages
  if (session?.isLoggedIn && (pathname === '/' || pathname === '/signup' || pathname === '/login/verify')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is pending 2FA, only allow access to the verify page
  if (session?.pending2FA && pathname !== '/login/verify') {
    return NextResponse.redirect(new URL('/login/verify', request.url));
  }

  // If user is not pending 2FA, do not allow access to the verify page
  if (!session?.pending2FA && pathname === '/login/verify') {
     return NextResponse.redirect(new URL('/dashboard', request.url));
  }
 
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
