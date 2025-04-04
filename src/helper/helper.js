import React from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import Login from '@/app/_components/user/Login';
import { useDispatch } from 'react-redux';
import { addUserInfo, addWishListItems, loadOldData, loginAction, LoginModelBoxAction } from '@/redux/slices/userSlice';

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
 // const isLogin = useSelector((state) => state.user.isUserLogin);
  //if(isClose) return isClose;
 //console.log("Close light box is", isClose);

  const token = document.cookie.includes('auth_token'); // Check if token exists
  
 
   if (!token) {
    //console.log("User is not login!")
    //setShowLoginModal(true); // Show login modal
    //return true;
 dispatch(LoginModelBoxAction(true))   
  } else {
   // console.log('user is login!');
    //return false;
    //console.log("User is login!");
    dispatch(addWishListItems(item))
    dispatch(LoginModelBoxAction(false))
    let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];

    // Ensure wishlistItems is always an array
    if (!Array.isArray(wishlistItems)) {
        wishlistItems = [];
    }
    
    // Add new item to the array
    wishlistItems.push(item);
    
    // Save updated wishlist back to localStorage
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    
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
  const wishlistItems = JSON.parse(localStorage.getItem("wishlistItems"));
  console.log("wishlistItems",wishlistItems);
  if(wishlistItems){
    dispatch(addWishListItems(wishlistItems))
  }
}
  export {getCategoriesAPI,productDetail,productByCategoryAPI,handleLoginFunc,UserLoginClose,addOldUserData}