// File: app/api/webhook/route.js

import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});

export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      console.log("✅ Payment successful:", paymentIntent.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }
}
