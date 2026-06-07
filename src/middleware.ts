import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const host = request.headers.get('host');

  if (host === 'gateioreferralcode.com' || host === 'www.gateioreferralcode.com') {
    const url = new URL(request.url);
    url.protocol = 'https:';
    url.hostname = 'exchangebonuscode.com';
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)', '/sitemap.xml', '/robots.txt']
};
