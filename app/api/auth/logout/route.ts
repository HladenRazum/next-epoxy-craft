import { AUTH_COOKIE } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function POST(req: NextRequest) {
  const cookieStore = cookies();

  if (cookieStore.get(AUTH_COOKIE)) {
    cookieStore.delete(AUTH_COOKIE);
  }

  return NextResponse.json({
    status: "success",
    statusCode: 200,
    message: "Успешен изход от системата",
  });
}
