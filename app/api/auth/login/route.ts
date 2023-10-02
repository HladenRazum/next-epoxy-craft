import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const body = await req.json();

  const { username, password } = body;

  if (username !== "admin" || password !== "admin") {
    return NextResponse.json({
      message: "unauthorized",
      status: 401,
    });
  }
}

// export async function GET(req: Request) {
//    console.log(req);
// }
