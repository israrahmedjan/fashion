import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";

import { ObjectId } from "mongodb"; // Yeh import zaroori hai!
import { split } from "lodash";



export async function GET(request) {
    // const corsHeaders = {
    //     "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend domain for better security
    //     "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    //     "Access-Control-Allow-Headers": "Content-Type, Authorization",
    // };

  const { searchParams } = new URL(request.url);
  const filterStr = searchParams.get('filter');

  let filter = {};
  try {
    if (filterStr) {
      filter = JSON.parse(filterStr); // 👈 Convert back to object
    }
    console.log("Filter Object",filter);

    const conn = await connectToDatabase();
        const productsCollection = conn.collection("Products");


     const data = await productsCollection.aggregate(
  [
    {
      $lookup: {
        from: 'Variations',
        localField: 'variationsId',
        foreignField: '_id',
        as: 'Variations'
      }
    },
    { $unwind: { path: '$Variations' } },
    {
      $match: {
        'Variations.color': { $in: ['Red'] },
        'Variations.price': { $gte: 40, $lte: 80 }
      }
    },
    {
      $project: {
        name: 1,
        Price: '$Variations.price',
        Color: '$Variations.color'
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
).toArray();


  
        // If data is not empty, return the data
        return NextResponse.json(
            { message: "Products Available!",data },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error during aggregation:", error.message);

        // Return an error response if something went wrong
        return NextResponse.json(
            { message: "An error occurred while fetching products!", error: error.message },
            { status: 500 }
        );
    }


}

