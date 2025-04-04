import { NextResponse } from "next/server";

export async function POST() {
  
  return NextResponse.json(
    { message: "Logged out successfully" },
    {
      status: 200,
      headers: {
        "Set-Cookie": "auth_token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
        "Content-Type": "application/json",
      },
    }
  );
}
