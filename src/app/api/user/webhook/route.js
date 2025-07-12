import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectToDatabase from "@/lib/dbconfig";
import User from "@/models/userModel";

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

      const result = await newUser.save();

      console.log("✅ Payment successful:", paymentIntent.id);
      console.log("👤 New user saved:", result);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }
}
