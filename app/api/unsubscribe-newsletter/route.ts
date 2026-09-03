import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Unsubscribe from SendFox
    try {
      const sendfoxResponse = await fetch(
        "https://api.sendfox.com/contacts/unsubscribe",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${process.env.SENDFOX_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      if (!sendfoxResponse.ok) {
        const errorData = await sendfoxResponse.json();
        console.error("SendFox unsubscribe error:", errorData);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to unsubscribe. Please try again or contact us.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "You have been successfully unsubscribed.",
      });
    } catch (sendfoxError) {
      console.error("Error unsubscribing from SendFox:", sendfoxError);
      return NextResponse.json(
        { success: false, error: "Failed to unsubscribe. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing unsubscribe:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    );
  }
}
