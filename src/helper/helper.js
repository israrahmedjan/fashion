
import { NextResponse } from "next/server";
//import bcryptjs from 'bcryptjs';

import bcryptjs  from "bcryptjs"; 
import jwt from 'jsonwebtoken';



const sendMail = async ({email,emailType,userId}) => {

  try {
   if (email !== "" && emailType === "VERIFY" && userId !== "") {


      const hashVerifyToken = await bcryptjs.hash(email,10)
      const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: {
        verifyToken:hashVerifyToken,
        verifyTokenExpiry:Date.now()
      } },
      { new: true } // returns the updated document
    );
        return { success: true, message: "Email sent successfully", updatedUser };


    }
    else
    {
       return { success: false, message: "Failed to send email" };
    }
  } catch (error) {
    console.log("Send Email Error", error.message)
  }
  
}


const getDataFromToken = (request)=>
{
 try {
  
  const token = request.cookies.get("token")?.value || "";
  const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
  return decodedToken.id;
 } catch (error) {
  console.log("Get Token section", error.message)
 }
  
}
// const addToCart = (product)=>
//   {
//  const { add } = useCart();
//   add({productId:product._id,productName:product.name,qty:1,...item});
//    //add(item);
// console.log("Item added");
//   }  
export {sendMail,getDataFromToken}


  