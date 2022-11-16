// This middleware is to protect the proxied api to be called only by the same host
// In the future it could get more logic, for example JWT tokens, etc.

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface CustomHeaders extends Headers {
  referer?: string[];
}

interface CustomNextRequest extends NextRequest {
  headers: CustomHeaders;
}

export function middleware(req: CustomNextRequest) {
  const res = NextResponse.next();

  if (!process.env.NEXT_PUBLIC_MULTIVERSX_API) return res;

  if (req.nextUrl.pathname.startsWith(process.env.NEXT_PUBLIC_MULTIVERSX_API)) {
    const definedHost = process.env.API_ALLOWED_DAPP_HOST;

    if (!definedHost) return res;

    const referer = req.headers.get('referer');

    if (!referer?.includes(definedHost)) {
      return NextResponse.redirect(
        new URL('/api/dapp-api-access-denied', req.url)
      );
    }
    return res;
  }
}
