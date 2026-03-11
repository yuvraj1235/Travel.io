import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Optional: Add custom logic here (e.g., checking user roles)
    return NextResponse.next();
  },
  {
    callbacks: {
      // The middleware only runs if the token exists
      authorized: ({ token }) => !!token,
    },
    // If not authorized, redirect to this page:
    pages: {
      signIn: "/login",
    },
  }
);

// --- CRUCIAL: WHICH ROUTES TO PROTECT ---
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/profile/:path*", 
    "/trips/:path*",
    "/api/proxy/:path*" // Protect your internal proxy if you have one
  ],
};