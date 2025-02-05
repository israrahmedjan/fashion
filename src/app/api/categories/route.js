import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";

import { ObjectId } from "mongodb"; // Yeh import zaroori hai!



export async function GET(request) {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend domain for better security
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    try {
 
        const conn = await connectToDatabase();
        const CategoriesCollection = conn.collection("Categories");
            const data = await CategoriesCollection
            .aggregate(
                [{ $match: {} }],
              ).toArray();




        //console.log("Dat:", data);

        if (data.length === 0) {
            // If data is empty, return a response indicating no products were found
            return NextResponse.json(
                { message: "No Category available!", data: [] },
                { status: 404 }
            );
        }

        // If data is not empty, return the data
        return NextResponse.json(
            { message: "Categories Available!", data },
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

