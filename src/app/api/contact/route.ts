import { NextRequest, NextResponse } from 'next/server';

// CRITICAL: Forces the route to be dynamic to prevent Vercel caching issues
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // 2. Key Handling (The Fix)
    // We try to get the key from the Environment. 
    // If it fails (undefined), we use the hardcoded key you provided as a backup.
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || 'c8c3d846-a53f-45a2-8b94-fe96d415f4c6';

    if (!accessKey) {
      return NextResponse.json(
        { error: 'Configuration Error: Access Key is missing.' },
        { status: 500 }
      );
    }

    // 3. Send to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        message: message,
        subject: `Website Message from ${name}`
      }),
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({ success: true, message: "Email sent successfully!" }, { status: 200 });
    } else {
      console.error("Web3Forms API Error:", result);
      return NextResponse.json({ error: result.message || "Failed to send email." }, { status: 500 });
    }

  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
}