import React from 'react'
import axios from 'axios';
async function getCategoriesAPI(slug="") {

  const response = await axios.get('/api/categories',
    
  );
  return response.data.data;
}


async function productDetail(categorySlug="",productSlug="") {
//console.log("My slug",productSlug);
  const response = await axios.get('/api/productsDetail', {
    params: {
      productSlug: productSlug,
      categorySlug: categorySlug
    },
  });
  return response.data.data;
}

async function productByCategoryAPI(categorySlugs = "", minPrice=10,maxPrice=500, limit="", sort={}) {
  try {
    console.log("No my slugs is that:", sort);

    const response = await axios.get('/api/category', {
      params: {
        categorySlugs: categorySlugs,
        minPrice:minPrice,
        maxPrice:maxPrice,
        limit: 6,
        sort: JSON.stringify(sort), // Include sort if needed
      },
    });

    console.log("Response in Help:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null; // Return null or an empty array if there's an error
  }
}



  export {getCategoriesAPI,productDetail,productByCategoryAPI}