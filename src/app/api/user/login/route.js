import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function POST(request) {

    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        await connectToDatabase();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                message: "Invalid email",
                success: false,
                status: 404,
            });
        }

        const validPassword = await bcryptjs.compare(password,user.password);

        if(!validPassword){
        return NextResponse.json({ message: "Invalid Creditionals", success: false, status: 200 })    
        }

         const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
         }   
         const token = await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'1d'});
         const response = NextResponse.json({
            message:"Log  In Success",
            success: true
         })
         response.cookies.set("token",token,{
            httpOnly:true
         })
            return response;
       // return NextResponse.json({ message: "User login successfully", success: true, user, status: 200 })

    } catch (error) {

        console.log("Error in login operations", error.message)

    }
}