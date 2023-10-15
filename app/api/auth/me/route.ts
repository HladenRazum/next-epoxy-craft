import { AUTH_COOKIE } from "@/lib/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE);

  if (!authCookie) {
    return NextResponse.json({
      message: "Не сте влезли в системата",
      status: "error",
      statusCode: 401,
    });
  }

  const { value } = authCookie;
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET || "";

  try {
    verify(value, secret);
    return NextResponse.json({
      message: "Вие сте влезли в системата",
      status: "success",
      statusCode: 200,
    });
  } catch (_err) {
    return NextResponse.json({
      message: "Не сте влезли в системата",
      status: "error",
      statusCode: 401,
    });
  }
}
