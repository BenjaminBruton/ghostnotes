import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, organization, proposal } = body;

    // Send email using SendGrid
    const msg = {
      to: process.env.RECIPIENT_EMAIL || "your-email@example.com",
      from: process.env.SENDER_EMAIL || "your-verified-sender@example.com",
      subject: `New In-Kind Meal Donation Proposal: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #e5e5e5;">
          <div style="background-color: #1e3a5f; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="color: #ffffff; margin: 0;">New In-Kind Donation Proposal</h1>
            <p style="color: #8b2e2e; font-size: 18px; margin: 10px 0 0 0;">Ghost Notes - Meal Support</p>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #1e3a5f;">
            <h2 style="color: #8b2e2e; margin-top: 0;">Donor Information</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Full Name:</strong><br/>
              <span style="color: #e5e5e5;">${name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Email:</strong><br/>
              <span style="color: #e5e5e5;">${email}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Phone:</strong><br/>
              <span style="color: #e5e5e5;">${phone}</span>
            </div>
            
            ${organization ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Business/Organization:</strong><br/>
              <span style="color: #e5e5e5;">${organization}</span>
            </div>
            ` : ''}
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Proposal Details:</strong><br/>
              <span style="color: #e5e5e5; white-space: pre-wrap;">${proposal}</span>
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #8b2e2e; background-opacity: 0.2; border-radius: 8px;">
            <p style="color: #ffffff; margin: 0; font-weight: bold;">Reward Tier: Executive Producer ($500+)</p>
            <p style="color: #e5e5e5; margin: 10px 0 0 0; font-size: 14px;">
              If approved, donor receives: Executive Producer credit, set visit, t-shirt, and HD download.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #1e3a5f; background-opacity: 0.2; border-radius: 8px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              This email was sent from the Ghost Notes in-kind donation form.
            </p>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
