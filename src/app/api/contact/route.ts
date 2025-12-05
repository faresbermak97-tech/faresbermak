import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 1000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 1000 characters' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim().replace(/[<>]/g, ''),
      email: email.trim().toLowerCase(),
      message: message.trim().replace(/[<>]/g, ''),
      timestamp: new Date().toISOString(),
    };

    // Get API key from environment variable
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    
    if (!accessKey) {
      console.error('WEB3FORMS_ACCESS_KEY is not configured');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Log the contact form submission (for debugging)
    console.log('New Contact Form Submission:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      timestamp: sanitizedData.timestamp
    });

    // Send form data to Web3Forms using JSON (not FormData)
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: sanitizedData.name,
        email: sanitizedData.email,
        message: sanitizedData.message,
        from_name: "Fares Bermak Portfolio",
        subject: `New message from ${sanitizedData.name}`,
        // Optional: Add these for better email formatting
        replyto: sanitizedData.email,
        redirect: false
      })
    });

    const data = await response.json();

    // Log the response for debugging
    console.log('Web3Forms Response:', {
      status: response.status,
      success: data.success,
      message: data.message
    });

    if (!response.ok || !data.success) {
      console.error("Web3Forms API error:", data);
      return NextResponse.json(
        { 
          error: data.message || "Failed to send message. Please try again.",
          details: data
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: 'Thank you! Your message has been sent successfully.',
        success: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    // More specific error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);

    return NextResponse.json(
      { 
        error: 'Failed to send message. Please email me directly at faresbermak97@gmail.com',
        technical: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}