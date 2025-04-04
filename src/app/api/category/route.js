import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";

import { ObjectId } from "mongodb"; // Yeh import zaroori hai!
import { split } from "lodash";



export async function GET(request) {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend domain for better security
        "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    try {
        const { searchParams } = new URL(request.url);
      const categorySlugs = searchParams.get("categorySlugs"); 
      const minPrice = searchParams.get("minPrice"); 
      const maxPrice = searchParams.get("maxPrice"); 
      const sort = searchParams.get("sort");
      //console.log("Category slugs",JSON.parse(sort));
      // set sort query
    //   let sortQuery = {}; 
    // if (request.query.sort) {
    //   sortQuery = JSON.parse(req.query.sort); // Convert string back to object
    // }
       
        const conn = await connectToDatabase();
        const ProductsCollection = conn.collection("Products");
            const data = await ProductsCollection
            .aggregate(
              [
                {
                  $lookup: {
                    from: 'Categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'Categories'
                  }
                },
                {
                  $lookup: {
                    from: 'ProductGallery',
                    localField: 'galleryId',
                    foreignField: '_id',
                    as: 'Gallery'
                  }
                },
                { $unwind: { path: '$Categories' } },
                {
                  $match: {
                    'Categories.slug': { $in: categorySlugs.split(",") }
                  }
                },
                {
                  $lookup: {
                    from: 'ProductVariants',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'ProductVariants'
                  }
                },
                {
                  $project: {
                    productName: '$name',
                    productSlug: '$slug',
                    price: {
                      $arrayElemAt: [
                        '$ProductVariants.price',
                        0
                      ]
                    },
                    categoryName: '$Categories.name',
                    categorySlug: '$Categories.slug',
                    image: {
                      $arrayElemAt: ['$Gallery.image', 0]
                    }
                  }
                }
              ],
              { maxTimeMS: 60000, allowDiskUse: true }
            ).toArray();




       // console.log("api is called!:", data);

        if (data.length === 0) {
            // If data is empty, return a response indicating no products were found
            return NextResponse.json(
                { message: "No Products available!", data: [] },
                { status: 404 }
            );
        }

        // If data is not empty, return the data
        return NextResponse.json(
            { message: "Products Available!", data },
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

