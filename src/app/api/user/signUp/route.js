import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";
import User from "@/models/userModel"
import { sendMail } from "@/helper/helper";
// import users from "@/models/users";
 import bcryptjs from 'bcryptjs';
// import jwt from "jsonwebtoken";



  export async function POST(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend domain for better security
      "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
    try
    {
      await connectToDatabase();
      const Userdata = await request.json();
      const { username, email, password } = Userdata;

      const hassPassword = await bcryptjs.hash(password,10)
      const newUser = User({
        name:username,
        email,
        password:hassPassword,
      })
      const checkEmail = await User.findOne({email})
      if(checkEmail)
      {
        return NextResponse.json({
            message :  "Email already exist",
            success:false,
            status:400
          })
      }
     const result =  await newUser.save();
       
     
        if(!result)
        {
          
          return NextResponse.json({
            message :  "Sometning wrong t durring the data ",
            success:false,
            status:400
          })
          
        }
      
      const sendResult = await sendMail({ email: result.email, emailType: "VERIFY", userId: result._id })

      console.log("Send Email is", sendResult)

        return NextResponse.json(
          { message: "User Register successfully", success:true, Userdata },
          { status: 200 }
        );
    
      
    
    }
    catch(error)
    {
    //console.log("Some Thing wrong in database operations",error);
    return NextResponse.json({ message: 'Database error', error: error.message }, { status: 500 });
    }
      
    //return NextResponse.json({status:"User Saved Successfully!",data:Userdata})
    }  
  