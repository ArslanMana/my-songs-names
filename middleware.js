import { NextResponse } from "next/server";

// Paths that don't require authentication
const PUBLIC_PATHS = ["/login", "/signup", "/api/auth"];

export function middleware(req) {
  const token = req.cookies.get("next-auth.session-token")?.value;
  const path = req.nextUrl.pathname;

  // If user visits `/` and is not authenticated, redirect to `/login`
  if (path === "/" && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except _next/static and favicon
export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
