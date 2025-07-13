// app/api/checkout/route.js
import Stripe from "stripe";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
//  const { items,customerData } = await req.json();
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN || "";
    const body = await req.json();
    const {items,customerData} = body
  console.log("Customer Data is ", body);
  

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

     return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
