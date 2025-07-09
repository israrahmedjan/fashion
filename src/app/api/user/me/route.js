import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDataFromToken } from "@/helper/helper";
import connectToDatabase from "@/lib/dbconfig";
import User from "@/models/userModel";

export async function POST(request) {

    try {
      
        const userId = getDataFromToken(request);
        if(!userId)
        {
            return NextResponse.json({ message: "Token not Found", success: false, status: 400 })     
        }
        const user = await User.findOne({_id:userId})
       return NextResponse.json({ message: "Token is verifyied", success: true, user, status: 200 })

    } catch (error) {

        console.log("Error in logout operations", error.message)

    }
}