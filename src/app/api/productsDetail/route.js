import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";
import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB

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
    const productSlug = searchParams.get('productSlug') || "";
    const categorySlug = searchParams.get('categorySlug') || "";
console.log("Product Slug and categor", productSlug,categorySlug);
    const conn = await connectToDatabase();


    const productsCollection = conn.collection("Products");

const data = await productsCollection
.aggregate(
  [
    {
      $match: {
        //_id: new ObjectId("679cbe77d93b0fc5971acf51"), 
        slug: productSlug, 
      },
    },
    {
      $lookup: {
        from: 'Categories',
        localField: 'category_id',
        foreignField: '_id',
        as: 'Category'
      }
    },
    {
      $lookup: {
        from: 'ProductVariants',
        localField: '_id',
        foreignField: 'product_id',
        as: 'varrations'
      }
    },
    { $unwind: { path: '$varrations' } },
    {
      $lookup: {
        from: 'ProductGallery',
        localField: 'varrations.image_gallery',
        foreignField: '_id',
        as: 'ProductImage.main_image'
      }
    },
    {
      $addFields: {
        filteredCategory: {
          $filter: {
            input: '$Category',
            as: 'cat',
            cond: {
              $eq: ['$$cat.slug', categorySlug]
            }
          }
        }
      }
    },
    {
      $project: {
        id: 1,
        name: 1,
        Category: "$filteredCategory", 
        'allvarrations':'$varrations',
        size: '$varrations.size',
        color:'$varrations.color',
        'varrations.color': 1,
        'varrations.size': 1,
        'varrations.price': 1,
        'mainImage' : '$ProductImage.main_image.main_image',
        'galleryImages' : '$ProductImage.main_image.gallery_images'
      }
    }
  ],
).toArray(); // Convert the aggregation cursor to an array
  
    //console.log("Dat:", data);
  
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

