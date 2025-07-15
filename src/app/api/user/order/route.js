import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";
import Customer from "@/models/customerModel";
import Order from "@/models/orderModel";
import OrderItem from "@/models/orderItemModel";
import { ObjectId } from "mongodb";

// Dummy Stripe Data for testing
const getStripeData = () => {
  return {
    customer_email: 'ahmedjan@example.com',
    id: 'cs_test_b1W61CVYF0SIgW66gnDEJZGlDZKamHoN7G8yQXPrZXnrMAw1JNQhex3wOx',
    amount_total: 19900,
    metadata: {
      items: '[{"id":"685956cc99f5b95b2719eb47","name":"Men Shirt","qty":1,"price":"89"},{"id":"68595f4699f5b95b2719eb49","name":"Red Dress","qty":1,"price":"45"},{"id":"685d6d66bc1ed45de5435541","name":"Classic t-shirt","qty":1,"price":"65"}]',
      customer: '{"firstName":"Ahmed","lastName":"Jan","country":"Pakistan","address":"House #45, Street 10, Model Town","city":"Lahore","state":"Punjab","zip":"54000","phone":"+92-300-1234567","email":"ahmedjan@example.com","createAccount":false,"cheque":false,"paypal":false}'
    },
    status: 'complete'
  };
};

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
  await OrderItem.insertMany(formattedItems);
};

// 🚀 Main handler
export async function POST(request) {
  try {
    await connectToDatabase();
    const stripeData = getStripeData();
    const { customer, items } = parseMetadata(stripeData.metadata);
    const customerId = await saveOrUpdateCustomer(customer);
    const order = await saveOrder(stripeData, customerId);
    if (order) {
      await saveOrderItems(order, items);
    }

    return NextResponse.json(
      { message: "Order placed successfully", success: true, customerId },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Database error', error: error.message },
      { status: 500 }
    );
  }
}
