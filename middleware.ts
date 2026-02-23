import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for login page and API routes
  if (pathname.startsWith("/login") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authCookie = request.cookies.get("dashboard_auth");
  const expectedToken = generateAuthToken();

  if (authCookie?.value !== expectedToken) {
    // Redirect to login if not authenticated
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export function generateAuthToken(): string {
  const password = process.env.DASHBOARD_PASSWORD || "dermastil2024";
  // Simple token generation - in production use a more secure method
  return Buffer.from(`admin:${password}`).toString("base64");
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedPassword = process.env.DASHBOARD_PASSWORD || "dermastil2024";
  return username === "admin" && password === expectedPassword;
}

export const config = {
  matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
};
