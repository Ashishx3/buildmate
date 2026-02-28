import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
  
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyEmail";

  const token = request.cookies.get("token")?.value;

  // Logged in user trying to access login/signup
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/Home", request.url));
  }

  // Not logged in user trying to access protected routes
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Home",
   "/dashboard/:path*",
    "/login",
    "/signup",
    "/verifyEmail",
  ],
};
