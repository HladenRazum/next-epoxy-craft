import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, Routes } from "./lib/constants";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE);

  if (token && token.value) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL(Routes.FORBIDDEN, req.url));
  }
}

export const config = {
  matcher: "/control-panel/:path*",
};
