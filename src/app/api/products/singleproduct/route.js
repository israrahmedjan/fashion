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

    const slug = searchParams.get('slug') || "blue_dress";   // Default to 1 if not provided
 console.log("Search params", slug);
        const conn = await connectToDatabase();
  const productsCollection = conn.collection("Products");


 // const searchQuery = ""; // Yeh woh search term hai jo aap dhoondhna chahte hain
const pipleine =  [
    { $match: { slug: slug } },
    {
      $lookup: {
        from: 'Variations',
        localField: 'variationsId',
        foreignField: '_id',
        as: 'Variations'
      }
    },
    {
      $lookup: {
        from: 'Galleries',
        localField: 'galleryId',
        foreignField: '_id',
        as: 'Galleries'
      }
    },
        {
      $lookup: {
        from: 'Categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'Category'
      }
    }
  ];
const data = await productsCollection
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
        { message: "No products available!", data: [] },
        { status: 404 }
      );
    }
  //console.log("API product ", data)
    // If data is not empty, return the data
    return NextResponse.json(
      { message: "Products Available!", data },
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

