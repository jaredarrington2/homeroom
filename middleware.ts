// middleware.ts — the fast redirect for signed-out visitors hitting study routes.
//
// It only checks that a session cookie is PRESENT; it does not verify the JWT. That keeps
// the middleware on the edge runtime without dragging next-auth (and bcrypt) into it. The
// real enforcement is server-side: every gated route group runs requireAccount() in its
// layout, and /api/progress resolves the user from the verified session. A forged cookie
// therefore buys a redirect it would have got anyway, and no data.
import { NextResponse, type NextRequest } from 'next/server';

const GATED = ['/learn', '/practice', '/study', '/flashcards', '/glossary', '/settings', '/admin'];

const SESSION_COOKIES = [
  'authjs.session-token',
  '__Secure-authjs.session-token',
  // Auth.js chunks large tokens; the first chunk is enough to know a session exists.
  'authjs.session-token.0',
  '__Secure-authjs.session-token.0',
];

export function middleware(req: NextRequest) {
  // Accounts not configured — behave exactly as the app did before they existed.
  if (!process.env.AUTH_SECRET) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (!GATED.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }

  if (SESSION_COOKIES.some((name) => req.cookies.has(name))) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.search = '';
  url.searchParams.set('callbackUrl', pathname + req.nextUrl.search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/learn/:path*', '/practice/:path*', '/study/:path*', '/flashcards/:path*', '/glossary/:path*', '/settings/:path*', '/admin/:path*'],
};
