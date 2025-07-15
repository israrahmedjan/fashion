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


// 🧩 Parse metadata
const parseMetadata = (metadata) => {
  const customer = JSON.parse(metadata?.customer || "{}");
  const items = JSON.parse(metadata?.items || "[]");
  return { customer, items };
};

// 👤 Save or update customer
const saveOrUpdateCustomer = async (customer) => {
  const existing = await Customer.findOne({ email: customer.email });
  if (existing) {
    const updated = await Customer.findOneAndUpdate(
      { email: customer.email },
      customer,
      { new: true, upsert: true }
    );
    return updated._id;
  } else {
    const newCustomer = new Customer(customer);
    const saved = await newCustomer.save();
    return saved._id;
  }
};

// 🧾 Save order
const saveOrder = async (stripeData, customerId) => {
  const newOrder = new Order({
    stripeSessionId: stripeData.id,
    status: 'paid',
    totalAmount: stripeData.amount_total,
    customerId,
  });
  return await newOrder.save();
};

// 📦 Save order items
const saveOrderItems = async (order, items) => {
  const formattedItems = items.map((item) => ({
    orderId: order._id,
    productId: new ObjectId(item.id),
    quantity: item.qty,
    price: parseFloat(item.price),
    name: item.name,
  }));
  return await OrderItem.insertMany(formattedItems);
};




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
      const { customer, items } = parseMetadata(stripeData.metadata);
      const customerId = await saveOrUpdateCustomer(customer);
      const order = await saveOrder(stripeData, customerId);
      if (order) {
        await saveOrderItems(order, items);
      }
      console.log("Data saved successfull!");
      return NextResponse.json(
        { message: "Order placed successfully", success: true, customerId },
        { status: 200 }
      );
    }
     // ✅ Handle other Stripe event types or ignore
    return NextResponse.json({ message: "Event ignored" }, { status: 200 });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }
}
