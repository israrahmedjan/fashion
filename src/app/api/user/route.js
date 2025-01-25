import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";
import users from "@/models/users";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export async function GET(request) {
  //const dbconn = await connectToDatabase();
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash("israr1233", saltRounds);
  const ismatch = await bcrypt.compare("israr1233",hashedPassword);
  if(ismatch)
  {
    console.log("Maatch");
  }
  else
  {
    console.log("Not match!")
  }

  
    return NextResponse.json({"msg":hashedPassword})
  
  }


  export async function POST(request) {
    try
    {
      const conn = await connectToDatabase();
      const Userdata = await request.json();
      const { name, email, password } = Userdata;
      const secretKey = process.env.JWT_SECRET; // Store in .env file
      //console.log("Secret Key!",secretKey11);
      //const secretKey =  process.env.JWT_SECRET;
      //const secretKey =  "israr123456";
      //const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password,10);
      const newUser = new users({ "name":name, "email":email, "password":hashedPassword });
      if(name == "" || email == "" || password == "")
      {
        return NextResponse.json({emtyvlues:"Please enter values"});
      }
      const userexist = await users.findOne({ email }); // Query the database
      if (userexist) {
        //return { exists: true, message: 'Email already exists' };
       // console.log("Already exist");
       return NextResponse.json({email:email,status:"Email already exists!"})
      }

      const savedUser = await newUser.save();
      if(savedUser._id)
      {
        const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
        return NextResponse.json({status:"User Saved Successfully!",data:Userdata,token:token})
      }
    
    
      
    
    }
    catch(error)
    {
    //console.log("Some Thing wrong in database operations",error);
    return NextResponse.json({ message: 'Database error', error: error.message }, { status: 500 });
    }
      
    //return NextResponse.json({status:"User Saved Successfully!",data:Userdata})
    }  
  