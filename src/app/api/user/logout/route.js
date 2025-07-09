import { NextResponse } from "next/server";



export async function GET(request) {

    try {
      
         const response = NextResponse.json({
            message:"Log Out Success",
            success: true
         })
         response.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(0)
         })
            return response;
       // return NextResponse.json({ message: "User login successfully", success: true, user, status: 200 })

    } catch (error) {

        console.log("Error in logout operations", error.message)

    }
}