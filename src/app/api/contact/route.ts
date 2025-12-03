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

    // Log the contact form submission
    console.log('New Contact Form Submission:', sanitizedData);

    // Send form data to Web3Forms
    const web3formData = new FormData();
    web3formData.append("access_key", process.env.WEB3FORMS_ACCESS_KEY || "c8c3d846-a53f-45a2-8b94-fe96d415f4c6");
    web3formData.append("name", sanitizedData.name);
    web3formData.append("email", sanitizedData.email);
    web3formData.append("message", sanitizedData.message);
    web3formData.append("from_name", "Fares Bermak Portfolio");
    web3formData.append("subject", `New message from ${sanitizedData.name}`);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: web3formData
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Web3Forms API error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to send message. Please try again." },
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

    return NextResponse.json(
      { error: 'Failed to send message. Please email me directly at faresbermak97@gmail.com' },
      { status: 500 }
    );
  }
}
