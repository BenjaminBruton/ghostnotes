import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      age,
      location,
      experience,
      role,
      availability,
      additionalInfo,
    } = body;

    // Send email using SendGrid
    const msg = {
      to: process.env.RECIPIENT_EMAIL || "your-email@example.com",
      from: process.env.SENDER_EMAIL || "your-verified-sender@example.com",
      subject: `New Casting Submission: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #e5e5e5;">
          <div style="background-color: #1e3a5f; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="color: #ffffff; margin: 0;">New Casting Submission</h1>
            <p style="color: #8b2e2e; font-size: 18px; margin: 10px 0 0 0;">Ghost Notes</p>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; border: 1px solid #1e3a5f;">
            <h2 style="color: #8b2e2e; margin-top: 0;">Applicant Information</h2>
            
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
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Age:</strong><br/>
              <span style="color: #e5e5e5;">${age}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Location:</strong><br/>
              <span style="color: #e5e5e5;">${location}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Role Interest:</strong><br/>
              <span style="color: #e5e5e5;">${role}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Availability:</strong><br/>
              <span style="color: #e5e5e5;">${availability}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Acting Experience:</strong><br/>
              <span style="color: #e5e5e5; white-space: pre-wrap;">${experience}</span>
            </div>
            
            ${additionalInfo ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #8b2e2e;">Additional Information:</strong><br/>
              <span style="color: #e5e5e5; white-space: pre-wrap;">${additionalInfo}</span>
            </div>
            ` : ''}
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #1e3a5f; background-opacity: 0.2; border-radius: 8px; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              This email was sent from the Ghost Notes casting form.
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
