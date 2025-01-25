import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";
import users from "@/models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend domain for better security
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  try {
    const conn = await connectToDatabase();
    const Userdata = await request.json();
    const { email, password } = Userdata;
    const secretKey = process.env.JWT_SECRET; // Store in .env file

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please enter values" }
      );
    }

      // Find user by email in the database
      const user = await users.findOne({ email });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

         // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    } 

      // Generate a JWT token for the authenticated user
      const token = jwt.sign({ email: user.email, id: user._id }, secretKey, {
        expiresIn: "1h",
      });
  
      return NextResponse.json(
        { message: "Login successful", token },
        { headers: corsHeaders }
      );
  } catch (error) {
    return NextResponse.json(
      { message: "Database error", error: error.message }
    );
  }

  return NextResponse.json(
    { message: "Unexpected Error" }
  );
}

// export function OPTIONS() {
//   const corsHeaders = {
//     "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend domain for better security
//     "Access-Control-Allow-Methods": "POST, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Authorization",
//   };

//   return NextResponse.json(null, { headers: corsHeaders });
// }
