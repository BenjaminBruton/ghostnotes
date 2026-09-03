import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Add contact to SendFox
    try {
      const sendfoxResponse = await fetch("https://api.sendfox.com/contacts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SENDFOX_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          first_name: name || "",
          lists: process.env.SENDFOX_LIST_ID
            ? [parseInt(process.env.SENDFOX_LIST_ID)]
            : undefined,
        }),
      });

      const sendfoxData = await sendfoxResponse.json();

      // SendFox returns 422 if contact already exists - this is okay
      if (!sendfoxResponse.ok && sendfoxResponse.status !== 422) {
        console.error("SendFox API error:", sendfoxData);
        // Continue with email notifications even if SendFox fails
      } else {
        console.log("Contact added to SendFox:", sendfoxData);
      }
    } catch (sendfoxError) {
      console.error("Error adding to SendFox:", sendfoxError);
      // Continue with email notifications even if SendFox fails
    }

    // Send notification email to the film team
    const notificationMsg = {
      to: process.env.RECIPIENT_EMAIL || "your-email@example.com",
      from: process.env.SENDER_EMAIL || "your-verified-sender@example.com",
      subject: `New Newsletter Subscription - Ghost Notes`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #e5e5e5;">
          <div style="background-color: #1e3a5f; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="color: #ffffff; margin: 0;">New Newsletter Subscription</h1>
            <p style="color: #8b2e2e; font-size: 18px; margin: 10px 0 0 0;">Ghost Notes</p>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #1e3a5f;">
            <h2 style="color: #8b2e2e; margin-top: 0;">Subscriber Information</h2>
            
            ${name ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Name:</strong><br/>
              <span style="color: #e5e5e5;">${name}</span>
            </div>
            ` : ''}
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Email:</strong><br/>
              <span style="color: #e5e5e5;">${email}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Subscribed On:</strong><br/>
              <span style="color: #e5e5e5;">${new Date().toLocaleString()}</span>
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #1e3a5f; background-opacity: 0.2; border-radius: 8px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              This email was sent from the Ghost Notes newsletter signup form.
            </p>
          </div>
        </div>
      `,
    };

    // Send confirmation email to the subscriber
    const confirmationMsg = {
      to: email,
      from: process.env.SENDER_EMAIL || "your-verified-sender@example.com",
      subject: "Welcome to Ghost Notes Updates",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #e5e5e5;">
          <div style="background-color: #1e3a5f; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="color: #ffffff; margin: 0;">Ghost Notes</h1>
            <p style="color: #8b2e2e; font-size: 18px; margin: 10px 0 0 0;">An Indie Short Film</p>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #1e3a5f;">
            <h2 style="color: #8b2e2e; margin-top: 0;">Thank You for Subscribing!</h2>
            
            <p style="color: #e5e5e5; line-height: 1.6;">
              ${name ? `Hi ${name},<br/><br/>` : ''}
              Thank you for subscribing to Ghost Notes updates! You'll now receive the latest news about our production journey, including:
            </p>
            
            <ul style="color: #e5e5e5; line-height: 1.8;">
              <li>Production milestones and behind-the-scenes updates</li>
              <li>Casting announcements</li>
              <li>Film festival submissions and screenings</li>
              <li>Exclusive content and insights</li>
            </ul>
            
            <p style="color: #e5e5e5; line-height: 1.6;">
              <em>"The whole picture comes last."</em>
            </p>
            
            <p style="color: #e5e5e5; line-height: 1.6;">
              We're excited to have you along for the journey!
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1e3a5f;">
              <p style="color: #8b2e2e; font-weight: bold; margin-bottom: 10px;">The Story</p>
              <p style="color: #9ca3af; font-style: italic; line-height: 1.6;">
                A police officer haunted by cryptic photographs of murdered men struggles to decipher their meaning, unaware the answers lie in a story unfolding somewhere else entirely.
              </p>
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #1e3a5f; background-opacity: 0.2; border-radius: 8px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0 0 10px 0;">
              © 2026 Ghost Notes. All rights reserved.
            </p>
            <p style="color: #9ca3af; font-size: 11px; margin: 0;">
              Don't want to receive these emails? 
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/unsubscribe" style="color: #8b2e2e; text-decoration: underline;">
                Unsubscribe here
              </a>
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await sgMail.send(notificationMsg);
    await sgMail.send(confirmationMsg);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
