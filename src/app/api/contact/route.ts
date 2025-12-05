import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('=== CONTACT FORM ROUTE CALLED ===');
  
  try {
    const body = await request.json();
    console.log('Received data:', body);

    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      console.log('Validation failed: missing fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Get API key
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    console.log('API Key exists:', !!accessKey);
    
    if (!accessKey) {
      console.error('WEB3FORMS_ACCESS_KEY not found in environment');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('Sending to Web3Forms...');

    // Send to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        subject: `New message from ${name.trim()}`
      })
    });

    console.log('Web3Forms response status:', response.status);

    const data = await response.json();
    console.log('Web3Forms response data:', data);

    if (!response.ok || !data.success) {
      console.error("Web3Forms error:", data);
      return NextResponse.json(
        { 
          error: data.message || "Failed to send message",
          debug: data
        },
        { status: 500 }
      );
    }

    console.log('Message sent successfully!');
    return NextResponse.json(
      {
        message: 'Message sent successfully!',
        success: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('=== ERROR IN CONTACT ROUTE ===');
    console.error('Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Server error occurred',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}