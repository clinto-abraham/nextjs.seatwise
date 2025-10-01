
import { NextResponse, type NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/events', '/booking', '/admin', '/my-bookings', '/donation', '/support', '/privacy', '/terms', '/grievances', '/community'];
  let session = null;

  const isPublicAsset = pathname.startsWith('/_next/') || pathname.startsWith('/images/') || pathname.includes('.');

  // Allow public assets to pass through
  if (isPublicAsset) {
      return NextResponse.next();
  }

  if (sessionCookie) {
    try {
      session = JSON.parse(sessionCookie.value);
    } catch (error) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  // Redirect to login if trying to access protected routes without a full session
  if (!session?.isLoggedIn && protectedRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in, redirect away from public-only pages like login/signup
  if (session?.isLoggedIn && (pathname === '/login' || pathname === '/signup' || pathname === '/login/verify')) {
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
