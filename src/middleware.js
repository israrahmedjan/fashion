import { NextResponse } from 'next/server';
import useMessageStore from './store/useMessageStore';
export function middleware(request) {
  const token = request.cookies.get('token')?.value; // Check for the token in cookies


  // If token does not exist and user tries to visit /profile
  if (!token && request.nextUrl.pathname.startsWith('/profile')) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/?login=1', request.url));
  }
 if (!token && request.nextUrl.pathname.startsWith('/orders')) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/?login=1', request.url));
  }

  // Otherwise allow the request to continue
  return NextResponse.next();
}

// Define routes that should run the middleware
export const config = {
  matcher: [
    '/profile/:path*',
    '/orders/:path*',
    '/', 
  ], // Apply middleware to `/dashboard` and its subpaths
};
