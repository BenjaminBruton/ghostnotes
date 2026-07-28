import { NextResponse } from "next/server";
import Stripe from "stripe";
import sgMail from "@sendgrid/mail";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-06-24.dahlia",
});

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const donationTierNames: Record<string, string> = {
  tier_10: "Supporter",
  tier_50: "Fan",
  tier_100: "VIP",
  tier_500: "Executive Producer",
};

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Get customer details
    const customerEmail = session.customer_details?.email || "";
    const customerName = session.customer_details?.name || "";
    const customerPhone = session.customer_details?.phone || "";
    const shippingAddress = session.shipping_details?.address;
    const amount = (session.amount_total || 0) / 100; // Convert cents to dollars
    const tierId = session.metadata?.tierId || "";
    const tierName = donationTierNames[tierId] || "Unknown Tier";

    // Format address
    const addressString = shippingAddress
      ? `${shippingAddress.line1}${shippingAddress.line2 ? ', ' + shippingAddress.line2 : ''}\n${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postal_code}\n${shippingAddress.country}`
      : "No shipping address provided";

    try {
      // Send confirmation email to donor
      await sgMail.send({
        to: customerEmail,
        from: process.env.SENDER_EMAIL || "your-verified-sender@example.com",
        subject: "Thank You for Supporting Ghost Notes!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #e5e5e5;">
            <div style="background-color: #1e3a5f; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h1 style="color: #ffffff; margin: 0;">Thank You for Your Support!</h1>
              <p style="color: #8b2e2e; font-size: 18px; margin: 10px 0 0 0;">Ghost Notes Indie Short Film</p>
            </div>
            
            <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #1e3a5f; margin-bottom: 20px;">
              <h2 style="color: #8b2e2e; margin-top: 0;">Donation Confirmed</h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #8b2e2e;">Amount:</strong><br/>
                <span style="color: #e5e5e5; font-size: 24px;">$${amount}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #8b2e2e;">Support Tier:</strong><br/>
                <span style="color: #e5e5e5;">${tierName}</span>
              </div>

              <div style="margin-bottom: 15px;">
                <strong style="color: #8b2e2e;">Your Rewards:</strong><br/>
                <ul style="color: #e5e5e5; margin: 10px 0;">
                  ${tierId === "tier_10" ? '<li>HD download of the short film</li>' : ''}
                  ${tierId === "tier_50" ? '<li>Exclusive Ghost Notes t-shirt</li><li>HD download of the short film</li>' : ''}
                  ${tierId === "tier_100" ? '<li>Visit the set during production</li><li>Exclusive Ghost Notes t-shirt</li><li>HD download of the short film</li>' : ''}
                  ${tierId === "tier_500" ? '<li>Executive Producer credit in the film</li><li>Visit the set during production</li><li>Exclusive Ghost Notes t-shirt</li><li>HD download of the short film</li>' : ''}
                </ul>
              </div>
            </div>

            <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #1e3a5f;">
              <h3 style="color: #ffffff; margin-top: 0;">What Happens Next?</h3>
              <p style="color: #e5e5e5; margin: 10px 0;">
                We'll keep you updated on the production progress! Physical rewards (t-shirts, set visits) will be coordinated as we move into production. Digital rewards (HD downloads, credits) will be delivered upon film completion (estimated late 2026).
              </p>
              <p style="color: #e5e5e5;">
                We may reach out to you at <strong>${customerEmail}</strong> to coordinate your rewards.
              </p>
            </div>

            <div style="margin-top: 20px; padding: 15px; background-color: #8b2e2e; background-opacity: 0.2; border-radius: 8px; text-align: center;">
              <p style="color: #ffffff; margin: 0; font-size: 18px; font-weight: bold;">
                You're making Ghost Notes possible!
              </p>
            </div>

            <div style="margin-top: 20px; padding: 15px; background-color: #1e3a5f; background-opacity: 0.2; border-radius: 8px; text-align: center;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                This is your donation confirmation for Ghost Notes indie short film.<br/>
                Questions? Reply to this email.
              </p>
            </div>
          </div>
        `,
      });

      // Send notification email to production team
      await sgMail.send({
        to: process.env.RECIPIENT_EMAIL || "your-email@example.com",
        from: process.env.SENDER_EMAIL || "your-verified-sender@example.com",
        subject: `New $${amount} Donation - ${tierName} Tier`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #e5e5e5;">
            <div style="background-color: #1e3a5f; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h1 style="color: #ffffff; margin: 0;">New Donation Received!</h1>
              <p style="color: #8b2e2e; font-size: 18px; margin: 10px 0 0 0;">Ghost Notes Crowdfunding</p>
            </div>
            
            <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #1e3a5f;">
              <h2 style="color: #8b2e2e; margin-top: 0;">Donation Details</h2>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #8b2e2e;">Amount:</strong><br/>
                <span style="color: #e5e5e5; font-size: 24px; font-weight: bold;">$${amount}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #8b2e2e;">Support Tier:</strong><br/>
                <span style="color: #e5e5e5;">${tierName}</span>
              </div>

              <div style="margin-bottom: 15px;">
                <strong style="color: #8b2e2e;">Donor Name:</strong><br/>
                <span style="color: #e5e5e5;">${customerName}</span>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #8b2e2e;">Email:</strong><br/>
                <span style="color: #e5e5e5;">${customerEmail}</span>
              </div>
              
              ${customerPhone ? `
              <div style="margin-bottom: 15px;">
                <strong style="color: #8b2e2e;">Phone:</strong><br/>
                <span style="color: #e5e5e5;">${customerPhone}</span>
              </div>
              ` : ''}
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #8b2e2e;">Shipping Address:</strong><br/>
                <span style="color: #e5e5e5; white-space: pre-line;">${addressString}</span>
              </div>

              <div style="margin-top: 20px; padding: 15px; background-color: #8b2e2e; background-opacity: 0.2; border-radius: 8px;">
                <strong style="color: #ffffff;">Rewards to Fulfill:</strong>
                <ul style="color: #e5e5e5; margin: 10px 0;">
                  ${tierId === "tier_10" ? '<li>HD download of the short film</li>' : ''}
                  ${tierId === "tier_50" ? '<li>Mail t-shirt to address above</li><li>HD download of the short film</li>' : ''}
                  ${tierId === "tier_100" ? '<li>Coordinate set visit</li><li>Mail t-shirt to address above</li><li>HD download of the short film</li>' : ''}
                  ${tierId === "tier_500" ? '<li>Add Executive Producer credit to film</li><li>Coordinate set visit</li><li>Mail t-shirt to address above</li><li>HD download of the short film</li>' : ''}
                </ul>
              </div>
            </div>
          </div>
        `,
      });

      console.log("Donation confirmation emails sent successfully");
    } catch (error) {
      console.error("Error sending donation confirmation emails:", error);
    }
  }

  return NextResponse.json({ received: true });
}
