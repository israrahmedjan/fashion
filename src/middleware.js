import { NextResponse } from 'next/server';

export function middleware(req) {
  // const token = req.cookies.get('auth_token'); // Check for the token in cookies

  // // Protect routes starting with `/dashboard` or any other path you want to secure
  // if (req.nextUrl.pathname.startsWith('/dashboard') && !token) {
  //   return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if no token
  // }
  //  // Protect routes starting with `/dashboard` or any other path you want to secure
  //  if (req.nextUrl.pathname.startsWith('/') && !token) {
  //   return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if no token
  // }

  // Allow access if token is present or not a protected route
  return NextResponse.next();
}

// Define routes that should run the middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/', 
  ], // Apply middleware to `/dashboard` and its subpaths
};
