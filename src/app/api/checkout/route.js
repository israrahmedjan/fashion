// app/api/checkout/route.js
import Stripe from "stripe";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function generateRandomPassword(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

export const createUserWithAutoPassword = async ({ firstName, lastName, email }) => {
  try {
    // 🔍 Check if user with email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User with this email already exists. Skipping...");
      //return { success: false, message: "User already exists" };

      return {
      success: true,
      user: {
        message:"User already exist",
        username: existingUser.name,
        email: existingUser.email,
        password: ""
      },
    };

    }

    const username = `${firstName}${lastName}`.toLowerCase();
    const plainPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = new User({
      name:username,
      email:email,
      password: hashedPassword,
    });

    await user.save();

    console.log("User created successfully");
    return {
      success: true,
      user: {
        message:"New User created",
        username: username,
        email: email,
        password: plainPassword
      },
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, error: error.message };
  }
};



export async function POST(req) {
//  const { items,customerData } = await req.json();
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN || "";
    const body = await req.json();
    const {items,customerData} = body
  //console.log("Customer Data is ", body);
  

  try {
    // console.log("Customer Data is ", await req.json())

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customerData.email, 
      line_items: items.map(item => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productName,
          },
          unit_amount: item.price * 100, // amount in cents
        },
        quantity: item.qty,
      })),
      success_url: `${domain}success`,
      cancel_url: `${domain}cancel`,
      metadata: {
      customer: JSON.stringify(customerData),
    items: JSON.stringify(
      items.map(item => ({
        id: item.productId,
        name:item.productName,
        qty: item.qty,
        price: item.price
      }))
    ),
    },
    });
const userData = await createUserWithAutoPassword({firstName:customerData?.firstName,lastName:customerData?.lastName,email:customerData?.email});
    
//console.log(userData);
return new Response(JSON.stringify({ url: session.url,userData }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
