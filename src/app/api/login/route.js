import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";
import users from "@/models/users";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Cookies from 'js-cookie';


  export async function POST(request) {
    try
    {
      const conn = await connectToDatabase();
      const Userdata = await request.json();
      const { email, password } = Userdata;
      const secretKey = process.env.JWT_SECRET; // Store in .env file
    
      const hashedPassword = await bcrypt.hash(password,10);
      //const newUser = new users({ "email":email, "password":hashedPassword });
      if(email == "" || password == "")
      {
        return NextResponse.json({emtyvlues:"Please enter values"});
      }
      const userexist = await users.findOne({ email }); // Query the database
      if (email=="israr@gmail.com") {
        //return { exists: true, message: 'Email already exists' };
       // console.log("Already exist");
       const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
    //   Cookies.set('auth_token', token, { expires: 7 }); // Expires in 7 days
   
       return NextResponse.json({status:"User Saved Successfully!",token:token})
      }

    
    
      
    
    }
    catch(error)
    {
    //console.log("Some Thing wrong in database operations",error);
    return NextResponse.json({ message: 'Database error', error: error.message }, { status: 500 });
    }
      
    //return NextResponse.json({status:"User Saved Successfully!",data:Userdata})
    }  
  