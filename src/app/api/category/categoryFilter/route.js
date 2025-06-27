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
        //.log("Filter Object", filter);

        const matchStage = {};
        if (filter.color && filter.color.length > 0) {
            matchStage['Variations.color'] = { $in: filter.color };
        }
        if (filter.size && filter.size.length > 0) {
            matchStage['Variations.size'] = { $in: filter.size };
        }
        if (filter.price && filter.price.miniMum > 0) {

            matchStage['Variations.price'] = { $gte: filter.price.miniMum, $lte: filter.price.maximum, }
        }
        if(filter.category && filter.category.length>0)
        {
            const categorySlug = filter.category.map((item,i)=>item.slug);
            matchStage['Category.slug'] = { $in : categorySlug}
           // console.log("Now category Slug is",categorySlug);
        }


        console.log("Match Stages", matchStage);
        const conn = await connectToDatabase();
        const productsCollection = conn.collection("Products");

        const pipeline = [
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
      from: 'Categories',
      localField: 'categoryId',
      foreignField: '_id',
      as: 'Category'
    }
  },
  { $unwind: { path: '$Variations' } },
  { $unwind: { path: '$Category' } },
  { $match: matchStage },
  
  {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        slug: { $first: '$slug' },
        image: { $first: '$image' },
        imageThumb: { $first: '$imageThumb' },
        Price: { $first: '$Variations.price' },
        Color: { $first: '$Variations.color' },
        CategoryName: {
          $first: '$Category.name'
        },
        CategorySlug: { $first: '$Category.slug' }
      }
    },
    // {$count : 'total'}
];

//console.log(JSON.stringify(pipeline, null, 2));

        const data = await productsCollection.aggregate(
        pipeline,
            { maxTimeMS: 60000, allowDiskUse: true }
        ).toArray();


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

