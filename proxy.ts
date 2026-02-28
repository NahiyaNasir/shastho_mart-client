
import { NextRequest, NextResponse } from "next/server";


export async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;


  // Skip middleware for verify-email route

  if (pathname.startsWith("/verify-email")) {

    return NextResponse.next();

  }


  // Check for session token in cookies

  const sessionToken = request.cookies.get("better-auth.session_token");
console.log(sessionToken);

  //* User is not authenticated at all

  if (!sessionToken) {

    return NextResponse.redirect(new URL("/login", request.url));

  }


  // Allow access if session exists

  return NextResponse.next();

}


export const config = {

  matcher: ["/cart",
    "/checkout",
    "/checkout/:path*",
    "/orders",
    "/orders/:path*",
    "/profile/:path*",
    "/seller/:path*",
    "/admin/:path*",
    ],

}