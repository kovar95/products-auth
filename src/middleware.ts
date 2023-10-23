import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  // take token from next-auth session
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  // check if logged in
  if (token) {
    // redirects user to home page
    return NextResponse.redirect(new URL("/", request.url));
  }
  return res;
}

// paths that will be checked with this middleware
export const config = {
  matcher: ["/login", "/signup"],
};
