import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import connectToDatabase from "@/lib/dbconfig";
import User from "@/models/userModel";

import { sendMail } from "@/helper/helper";
// import users from "@/models/users";
 import bcryptjs from 'bcryptjs';
import Customer from "@/models/customerModel";
import Order from "@/models/orderModel";
import OrderItem from "@/models/orderItemModel";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Required for raw body handling — already done in App Router (no need for bodyParser)

export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  try {
    // ✅ Step 1: Verify Stripe webhook event
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

if (event.type === "checkout.session.completed") {
  //const session = event.data.object;

const stripeData = event.data.object;
      await connectToDatabase();
   const metadataRaw = stripeData?.metadata;
const customer = JSON.parse(metadataRaw?.customer);
const items = JSON.parse(metadataRaw?.items);

await connectToDatabase();

const existingCustomer = await Customer.findOne({ email: customer.email });
let customerId;

if (existingCustomer) {
  const updatedCustomer = await Customer.findOneAndUpdate(
    { email: customer.email },
    customer,
    { new: true, upsert: true }
  );
  customerId = updatedCustomer._id;
} else {
  const newCustomer = new Customer(customer);
  const savedCustomer = await newCustomer.save();
  customerId = savedCustomer._id;
}

const newOrder = new Order({
  stripeSessionId: stripeData.id,
  status: 'paid',
  totalAmount: stripeData.amount_total,
  customerId,
});

const order = await newOrder.save();

if (order) {
  const orderItemsToSave = items.map((item) => ({
    orderId: order._id,
    productId: new ObjectId(item.id),
    quantity: item.qty,
    price: parseFloat(item.price),
    name: item.name,
  }));

  await OrderItem.insertMany(orderItemsToSave);
}

return NextResponse.json(
  { message: "Order placed successfully", success: true, customerId },
  { status: 200 }
); 


  console.log("✅ Checkout Session Data:", session);
}

    // ✅ Step 2: Handle payment success
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      // ✅ Step 3: Connect to DB and save user
      await connectToDatabase();

      const newUser = new User({
        name: "test",
        email: "test@gmail.com",
        password: "test123",
      });

      //const result = await newUser.save();

      //console.log("✅ Payment successful:", paymentIntent.id);
      //console.log("✅ Payment successful:", paymentIntent);
    //  console.log("✅ Payment successful:", paymentIntent);
      
     // console.log("👤 New user saved:", result);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }
}
