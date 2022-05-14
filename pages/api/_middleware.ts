// This middleware is to protect the proxied api to be called only by the same host
// In the future it could get more logic, for example JWT tokens, etc.

import { NextRequest, NextResponse } from 'next/server';

interface CustomHeaders extends Headers {
  referer?: string[];
}

interface CustomNextRequest extends NextRequest {
  headers: CustomHeaders;
}

export function middleware(req: CustomNextRequest) {
  const definedHost = process.env.API_ALLOWED_DAPP_HOST;
  const errorRes = new NextResponse(JSON.stringify({ error: 'Not allowed!' }), {
    headers: {
      'content-type': 'application/json',
    },
    status: 403,
  });

  if (!definedHost) return NextResponse.next();

  let referer = req.headers.get('referer');

  if (!referer?.includes(definedHost)) {
    return errorRes;
  }

  return NextResponse.next();
}
