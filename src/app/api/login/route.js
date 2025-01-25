import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";
import users from "@/models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend domain for better security
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  try {
    const conn = await connectToDatabase();
    const Userdata = await request.json();
    const { email, password } = Userdata;
    const secretKey = process.env.JWT_SECRET; // Store in .env file

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please enter values" },
        { headers: corsHeaders }
      );
    }

    const userexist = await users.findOne({ email }); // Query the database
    if (email === "israr@gmail.com") {
      const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
      return NextResponse.json(
        { status: "User Saved Successfully!", token },
        { headers: corsHeaders }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Database error", error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }

  return NextResponse.json(
    { message: "Unexpected Error" },
    { status: 500, headers: corsHeaders }
  );
}

export function OPTIONS() {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend domain for better security
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  return NextResponse.json(null, { headers: corsHeaders });
}
