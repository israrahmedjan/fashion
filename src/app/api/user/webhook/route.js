import { NextResponse } from "next/server";
import Stripe from "stripe";

// Stripe secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Disable automatic body parsing (Next.js does this automatically in App Router)

export async function POST(req) {
  const rawBody = await req.text(); // Webhook requires raw text
  const signature = req.headers.get("stripe-signature");

  try {
    // ✅ Verify event using your webhook secret
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // ✅ Check for payment success event
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      console.log("✅ Payment successful:", paymentIntent.id);
      // 🔁 Yahan aap apna database update kar sakte hain
    }

    // ✅ Respond to Stripe to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }
}
