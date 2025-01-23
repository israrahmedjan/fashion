import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";
import users from "@/models/users";
export async function GET(request) {
  const dbconn = await connectToDatabase();
    return NextResponse.json({"msg":"Hello world!"})
  
  }


  export async function POST(request) {
    try
    {
      const conn = await connectToDatabase();
      const Userdata = await request.json();
      const { name, email, password } = Userdata;
      //const { name, email, password } = req.body;
      const newUser = new users({ name, email, password });
      const savedUser = await newUser.save();
      //res.status(201).json({ message: 'User created successfully', user: savedUser });
    //  console.log("Hello world");
    return NextResponse.json({status:"User Saved Successfully!",data:Userdata})
      
    
    }
    catch(error)
    {
   // console.log("Some Thing wrong in database operations",error);
    NextResponse.json({error:error});
    }
      
    //return NextResponse.json({status:"User Saved Successfully!",data:Userdata})
    }  
  