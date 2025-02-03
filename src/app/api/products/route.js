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
    console.log("Search Params", searchParams);
    const conn = await connectToDatabase();
  const productsCollection = conn.collection("Products");
    const data = await productsCollection
      .aggregate(
        [
          {
            $lookup: {
              from: 'Categories',
              localField: 'category_id',
              foreignField: '_id',
              as: 'category_details'
            }
          },
          { $unwind: '$category_details' },
          {
            $project: {
              productName: '$name',
              categoryName: '$category_details.name',
              Descriptions: '$category_details.description',
              price: 1,
              _id: 0
            }
          }
        ]
      )
      .toArray(); // Convert the aggregation cursor to an array
  
    console.log("Data from aggregation:", data);
  
    if (data.length === 0) {
      // If data is empty, return a response indicating no products were found
      return NextResponse.json(
        { message: "No products available!", data: [] },
        { status: 404 }
      );
    }
  
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

