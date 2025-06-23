import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";

export async function GET(request) {
    try {

        
        const conn = await connectToDatabase();
        const categoryCollection = conn.collection("Categories");


       const data = await categoryCollection.aggregate(
  [
    {
      $match: {
        slug: {
          $in: [
            'cosmetics',
            'accessories',
            'kidz_fashion',
            'mens_fashion',
            'women_fashion'
          ]
        }
      }
    },
    { $sort: { name: 1 } },
    {
      $lookup: {
        from: 'Products',
        localField: '_id',
        foreignField: 'categoryId',
        as: 'products'
      }
    },
    {
      $project: {
        name: 1,
        slug: 1,
        description: 1,
        image: 1,
        imageThumb: 1,
        total: { $size: '$products' },
        products: '$products'
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
).toArray();


 const productCollection = conn.collection("Products");

const productData = await productCollection.aggregate(
   [
    {
      $lookup: {
        from: 'Categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category'
      }
    },
    { $unwind: { path: '$category' } },
    {
      $project: {
        name: 1,
        price: 1,
        categoryName: '$category.name',
        productSlug: '$slug',
        image: 1,
        imageThumb: 1,
        category: '$category.slug',
        
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
).toArray()
            

        // ✅ 1. Data Found
       
        if ((data && data.length > 0) && (productData && productData.length > 0) ) {
            return NextResponse.json({ success: true, data  , productData}, { status: 200 });
        }

        // ✅ 2. Data Empty
        return NextResponse.json({ success: false, message: "No categories found." }, { status: 404 });

    } catch (error) {
        // ✅ 3. Error Occurred
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
