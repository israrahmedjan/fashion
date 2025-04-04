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


    const productsCollection = conn.collection("ProductVariants");
   
const data = await productsCollection
.aggregate(
  [
    {
      $lookup: {
        from: 'Products',
        localField: 'product_id',
        foreignField: '_id',
        as: 'Products'
      }
    },
    {
      $addFields: {
        Products: {
          $filter: {
            input: '$Products',
            as: 'prod',
            cond: {
              $eq: [
                '$$prod.slug',
                productSlug
              ]
            }
          }
        }
      }
    },
    {
      $match: { 'Products.0': { $exists: true } }
    },
    {
      $lookup: {
        from: 'ProductGallery',
        localField: 'image_gallery',
        foreignField: '_id',
        as: 'Image'
      }
    },
    {
      $lookup: {
        from: 'Categories',
        localField: 'Products.categoryId',
        foreignField: '_id',
        as: 'Category'
      }
    },
    { $unwind: { path: '$Products' } },
    {
      $addFields: {
        image: {
          $arrayElemAt: ['$Image.image', 0]
        }
      }
    },
    {
      $addFields: {
        Category: {
          $filter: {
            input: '$Category',
            as: 'cat',
            cond: { $eq: ['$$cat.slug', categorySlug] }
          }
        }
      }
    },
    {
      $project: {
        ProductName: '$Products.name',
        color: 1,
        size: 1,
        price: 1,
        image: 1,
        Category: 1
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
).toArray(); // Convert the aggregation cursor to an array
  
    //console.log("Category Detail Page:", data);
  
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

