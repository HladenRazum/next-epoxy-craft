import { loginSchema } from "@/lib/schemas"
import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import { serialize } from "cookie"
import { AUTH_COOKIE, JTW_MAX_AGE } from "@/lib/constants"
import { userExistsInFirebase } from "@/lib/firebaseUserExits"

export async function POST(req: Request) {
  const body = await req.json()
  const validatedData = loginSchema.safeParse(body)

  if (validatedData.success) {
    const { username, password } = validatedData!.data

    // Compare the user
    if (await userExistsInFirebase({ username, password })) {
      const secret = process.env.NEXT_PUBLIC_JWT_SECRET || ""
      const token = sign(
        {
          username,
          password,
        },
        secret,
        {
          expiresIn: JTW_MAX_AGE,
        }
      )

      const serialized = serialize(AUTH_COOKIE, token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: JTW_MAX_AGE,
      })

      return new Response(
        JSON.stringify({
          message: "Успешно влизане в системата",
          status: "success",
          statusCode: 200,
        }),
        {
          headers: {
            "Set-Cookie": serialized,
          },
          status: 200,
        }
      )
    } else {
      return NextResponse.json({
        message: "Невалидни данни за потребител/парола",
        status: "error",
        statusCode: 401,
      })
    }
  } else {
    return NextResponse.json({
      message: JSON.parse(validatedData.error.message),
      status: "error",
      statusCode: 401,
    })
  }
}
