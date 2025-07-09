import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";
import User from "@/models/userModel";

export async function POST(request) {
    
    try {
        const reqBody = await request.json()
        const { token } = reqBody;
       //console.log("Token is", token);
        await connectToDatabase();
       
    const user = await User.findOne({ verifyToken: token });

    if (!user) {
      return NextResponse.json({
        message: "Invalid or expired token",
        success: false,
        status: 404,
      });
    }

    user.isVarified = true;
    user.verifyToken = "";
    user.verifyTokenExpiry = "";

    await user.save();

        return NextResponse.json({message:"Token Verify Successfully",success:true,user,status:200})

    } catch (error) {

        console.log("Error in verify email",error.message)
        
    }
}