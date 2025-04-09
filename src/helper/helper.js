import React from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import Login from '@/app/_components/user/Login';
import { useDispatch } from 'react-redux';
import { addUserInfo, addWishListItems, loadOldData, loginAction, LoginModelBoxAction } from '@/redux/slices/userSlice';
import { addToWishlist } from './whislist';

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
    //console.log("No my slugs is that:", sort);

    const response = await axios.get('/api/category', {
      params: {
        categorySlugs: categorySlugs,
        minPrice:minPrice,
        maxPrice:maxPrice,
        limit: 6,
        sort: JSON.stringify(sort), // Include sort if needed
      },
    });

    //console.log("Response in Help:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null; // Return null or an empty array if there's an error
  }
}

const handleLoginFunc = (dispatch,item) => {
  const token = document.cookie.includes('auth_token'); // Check if token exists
  
 
   if (!token) {
 dispatch(LoginModelBoxAction(true))   
  } else {
   
    dispatch(addWishListItems(item))
    dispatch(LoginModelBoxAction(false))
  
    addToWishlist(item);


  }
};


const isUserLogin = (dispatch) => {
   const token = document.cookie.includes('auth_token'); // Check if token exists
   
  
    if (!token) {
          return false;
     } else {
      return true;
     }
 };

const UserLoginClose = (dispatch)=>
{
  dispatch(LoginModelBoxAction(false))
}

const addOldUserData = (dispatch)=>
{
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log("user data",user);
  if(user){
    dispatch(addUserInfo(user))
  }
  const isUserLogin = JSON.parse(localStorage.getItem("isUserLogin"));
  //console.log("is user login",isUserLogin);
  if(isUserLogin){
    dispatch(loginAction(isUserLogin))
  }
  const wishlistItems = JSON.parse(localStorage.getItem("wishlist"));
  //dispatch(addWishListItems(wishlistItems));

  if (Array.isArray(wishlistItems)) {
    wishlistItems.forEach(item => {
      dispatch(addWishListItems(item));
    });
  }
  
}

  export {getCategoriesAPI,productDetail,productByCategoryAPI,handleLoginFunc,UserLoginClose,addOldUserData}