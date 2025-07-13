import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";
import User from "@/models/userModel"
import { sendMail } from "@/helper/helper";
// import users from "@/models/users";
 import bcryptjs from 'bcryptjs';
import Customer from "@/models/customerModel";
import Order from "@/models/orderModel";
import OrderItem from "@/models/orderItemModel";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

// import jwt from "jsonwebtoken";



  export async function POST(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend domain for better security
      "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };
    try
    {

      const stripeData = {
  id: 'cs_test_b1W61CVYF0SIgW66gnDEJZGlDZKamHoN7G8yQXPrZXnrMAw1JNQhex3wOx',
  object: 'checkout.session',
  adaptive_pricing: { enabled: true },
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 19900,
  amount_total: 19900,
  automatic_tax: { enabled: false, liability: null, provider: null, status: null },
  billing_address_collection: null,
  cancel_url: 'http://localhost:3000/cancel',
  client_reference_id: null,
  client_secret: null,
  collected_information: { shipping_details: null },
  consent: null,
  consent_collection: null,
  created: 1752393456,
  currency: 'usd',
  currency_conversion: null,
  custom_fields: [],
  custom_text: {
    after_submit: null,
    shipping_address: null,
    submit: null,
    terms_of_service_acceptance: null
  },
  customer: null,
  customer_creation: 'if_required',
  customer_details: {
    address: {
      city: null,
      country: 'PK',
      line1: null,
      line2: null,
      postal_code: null,
      state: null
    },
    email: 'ahmedjan@example.com',
    name: 'Israr Ahmed',
    phone: null,
    tax_exempt: 'none',
    tax_ids: []
  },
  customer_email: 'ahmedjan@example.com',
  discounts: [],
  expires_at: 1752479856,
  invoice: null,
  invoice_creation: {
    enabled: false,
    invoice_data: {
      account_tax_ids: null,
      custom_fields: null,
      description: null,
      footer: null,
      issuer: null,
      metadata: {},
      rendering_options: null
    }
  },
  livemode: false,
  locale: null,
  metadata: {
    items: '[{"id":"685956cc99f5b95b2719eb47","name":"Men Shirt","qty":1,"price":"89"},{"id":"68595f4699f5b95b2719eb49","name":"Red Dress","qty":1,"price":"45"},{"id":"685d6d66bc1ed45de5435541","name":"Classic t-shirt","qty":1,"price":"65"}]',
    customer: '{"firstName":"Ahmed","lastName":"Jan","country":"Pakistan","address":"House #45, Street 10, Model Town","city":"Lahore","state":"Punjab","zip":"54000","phone":"+92-300-1234567","email":"ahmedjan@example.com","createAccount":false,"cheque":false,"paypal":false}'
  },
  mode: 'payment',
  origin_context: null,
  payment_intent: 'pi_3RkKnFEQEoKC642W19lX3FcY',
  payment_link: null,
  payment_method_collection: 'if_required',
  payment_method_configuration_details: null,
  payment_method_options: { card: { request_three_d_secure: 'automatic' } },
  payment_method_types: [ 'card' ],
  payment_status: 'paid',
  permissions: null,
  phone_number_collection: { enabled: false },
  presentment_details: { presentment_amount: 5872060, presentment_currency: 'pkr' },
  recovered_from: null,
  saved_payment_method_options: null,
  setup_intent: null,
  shipping_address_collection: null,
  shipping_cost: null,
  shipping_options: [],
  status: 'complete',
  submit_type: null,
  subscription: null,
  success_url: 'http://localhost:3000/success',
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
  ui_mode: 'hosted',
  url: null,
  wallet_options: null
}

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
    
    }
    catch(error)
    {
    //console.log("Some Thing wrong in database operations",error);
    return NextResponse.json({ message: 'Database error', error: error.message }, { status: 500 });
    }
      
    //return NextResponse.json({status:"User Saved Successfully!",data:Userdata})
    }  
  