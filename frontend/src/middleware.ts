import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/register',
  '/_next',
  '/favicon.ico',
  '/api/auth',
];

// List of API routes that don't require authentication
const publicApiRoutes = [
  '/api/auth',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  );

  // Allow public routes to be accessed without authentication
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check if it's an API route
  const isApiRoute = pathname.startsWith('/api/');
  
  // Check if it's a public API route
  const isPublicApiRoute = publicApiRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Allow public API routes
  if (isApiRoute && isPublicApiRoute) {
    return NextResponse.next();
  }

  // For API routes, let the API handle authentication
  if (isApiRoute) {
    return NextResponse.next();
  }

  // For all other routes, check authentication
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('cookie') || '',
      },
    });

    // If not authenticated, redirect to login
    if (!response.ok) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Continue with the request if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
