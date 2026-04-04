import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE_NAME = 'auth_token';

const PROTECTED_ROUTES = ['/profile', '/url'];
const AUTH_ROUTES = ['/login'];

const isRouteMatch = (pathname: string, routes: string[]) => {
	return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
};

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
	const isAuthenticated = Boolean(token && token.trim().length > 0);

	if (isRouteMatch(pathname, PROTECTED_ROUTES) && !isAuthenticated) {
		const loginUrl = new URL('/login', request.url);
		loginUrl.searchParams.set('next', pathname);
		return NextResponse.redirect(loginUrl);
	}

	if (isRouteMatch(pathname, AUTH_ROUTES) && isAuthenticated) {
		return NextResponse.redirect(new URL('/profile', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/profile/:path*', '/url/:path*', '/login'],
};
