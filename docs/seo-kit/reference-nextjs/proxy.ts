/** Next.js 16 proxy reference. Use only after verifying Vercel deployment and www ownership. */
import { NextRequest, NextResponse } from 'next/server';
const CANONICAL = 'bharathjansewalabs.com';
export function proxy(request: NextRequest) {
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  const production = process.env.VERCEL_ENV === 'production' || process.env.DEPLOYMENT_STAGE === 'production';
  if (!production) {
    const next = NextResponse.next();
    next.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return next;
  }
  if (host === 'www.bharathjansewalabs.com') {
    const u = request.nextUrl.clone();
    u.host = CANONICAL;
    u.protocol = 'https:';
    // Preserve inbound attribution; rel=canonical omits all query parameters.
    return NextResponse.redirect(u, 301);
  }
  return NextResponse.next();
}
export const config = { matcher: ['/((?!api/|_next/static|_next/image|favicon.ico).*)'] };
