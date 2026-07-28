import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-06-24.dahlia",
});

const donationTiers: Record<string, { amount: number; name: string }> = {
  tier_10: { amount: 1000, name: "Supporter - HD Download" },
  tier_50: { amount: 5000, name: "Fan - T-Shirt + HD Download" },
  tier_100: { amount: 10000, name: "VIP - Set Visit + T-Shirt + HD Download" },
  tier_500: { amount: 50000, name: "Executive Producer - Credit + All Rewards" },
};

export async function POST(request: Request) {
  try {
    const { tierId } = await request.json();
    
    const tier = donationTiers[tierId];
    if (!tier) {
      return NextResponse.json(
        { error: "Invalid tier" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Ghost Notes - ${tier.name}`,
              description: "Support the production of Ghost Notes indie short film",
            },
            unit_amount: tier.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/crowdfunding/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/crowdfunding`,
      metadata: {
        tierId,
        tierName: tier.name,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
