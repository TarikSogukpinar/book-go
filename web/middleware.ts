import { NextResponse, NextRequest } from "next/server";
import { verifyJwtToken } from "@/app/utils/auth";

const AUTH_PAGES = ["/login", "/register"];
const PROTECTED_PAGES = ["/dashboard", "/settings"]; // Protected pages

const isAuthPages = (url: string) =>
  AUTH_PAGES.some((page) => page.startsWith(url));
const isProtectedPage = (url: string) =>
  PROTECTED_PAGES.some((page) => page.startsWith(url));

export default async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;
  const token = cookies.get("JWT")?.value ?? null;

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);
  const isProtectedPageRequested = isProtectedPage(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("JWT");
      return response;
    }
    return NextResponse.redirect(new URL(`/`, url));
  }

  // Access control for protected pages
  if (isProtectedPageRequested && !hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    const response = NextResponse.redirect(
      new URL(`/login?${searchParams}`, url)
    );
    response.cookies.delete("JWT");

    return response;
  }

  return NextResponse.next();
}
