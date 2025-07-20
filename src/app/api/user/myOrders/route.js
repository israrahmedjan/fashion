import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";
// import users from "@/models/users";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";


export async function GET(request) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend domain for better security
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  
  try {

     const { searchParams } = new URL(request.url);

    const email = searchParams.get('email').toString() || "israr@gmail.com";   
  
    const conn = await connectToDatabase();
  const ordersCollection = conn.collection("orders");



 // const searchQuery = ""; // Yeh woh search term hai jo aap dhoondhna chahte hain
const pipleine =    [
    {
      $lookup: {
        from: 'customers',
        localField: 'customerId',
        foreignField: '_id',
        as: 'customers'
      }
    },
    { $unwind: { path: '$customers' } },
    {
      $lookup: {
        from: 'orderitems',
        localField: '_id',
        foreignField: 'orderId',
        as: 'result'
      }
    },
    {
      $match: {
        'customers.email': 'israr@gmail.com'
      }
    }
  ];
const data = await ordersCollection
  .aggregate(
 pipleine
    ,
  { maxTimeMS: 60000, allowDiskUse: true }
).toArray(); // Convert the aggregation cursor to an array
  
    //console.log("Dat:", data);
   // console.log("New Gallery Added",data);
  
    if (data.length === 0) {
      // If data is empty, return a response indicating no products were found
      return NextResponse.json(
        { message: "No Orders available!", data: [] },
        { status: 404 }
      );
    }
  //console.log("API product ", data)
    // If data is not empty, return the data
    return NextResponse.json(
      { message: "Orders Available!", data },
      { status: 200 }
    );
  
  } catch (error) {
    console.error("Error during aggregation:", error);
  
    // Return an error response if something went wrong
    return NextResponse.json(
      { message: "An error occurred while fetching products!", error: error.message },
      { status: 500 }
    );
  }


}

