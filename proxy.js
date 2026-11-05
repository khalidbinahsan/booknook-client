import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Pages that need a logged in user
const PRIVATE_PATHS = ["/add-book", "/my-books", "/my-borrows", "/profile"];
// Pages a logged in user does not need to see
const GUEST_ONLY_PATHS = ["/login", "/register"];

function isPrivate(pathname) {
  // /books is public, but a single book (/books/:id) is private
  if (/^\/books\/[^/]+\/?$/.test(pathname)) return true;
  return PRIVATE_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

// Runs on the server before the page renders, so reloading a private route
// never "kicks out" a logged in user: the session is checked from the cookie
// on every request, not from client state.
export async function proxy(request) {
  const { pathname, search } = request.nextUrl;

  const session = await auth.api.getSession({ headers: request.headers });

  if (isPrivate(pathname) && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (GUEST_ONLY_PATHS.includes(pathname) && session) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    const target =
      callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")
        ? callbackUrl
        : "/";
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
    "/profile/:path*",
    "/books/:id",
    "/login",
    "/register",
  ],
};
