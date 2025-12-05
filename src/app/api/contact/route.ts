import { NextRequest, NextResponse } from 'next/server';

// Force dynamic to prevent caching issues
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // 1. Parse request body
    const body = await request.json();
    const { name, email, message } = body;

    // 2. Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // 3. Get Form ID from environment
    const formId = process.env.FORMSPREE_FORM_ID;

    if (!formId) {
      console.error('FORMSPREE_FORM_ID is not configured');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact the administrator.' },
        { status: 500 }
      );
    }
    
    // 4. Send to Formspree endpoint
    const formspreeUrl = `https://formspree.io/f/${formId}`;
    
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _subject: `Website Contact from ${name.trim()}`,
      }),
    });

    // 5. Check if submission was successful
    if (response.ok) {
      // FIXED: Return proper success response
      return NextResponse.json(
        { 
          success: true, 
          message: 'Thank you for your message! I will get back to you soon.' 
        },
        { status: 200 }
      );
    } else {
      // Handle Formspree errors
      let errorMessage = 'Failed to send message. Please try again.';
      
      try {
        const result = await response.json();
        if (result.error) {
          errorMessage = result.error;
        }
        console.error('Formspree API Error:', result);
      } catch {
        console.error('Formspree returned non-JSON error, status:', response.status);
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

  } catch (error) {
    console.error('API Route Error:', error);
    
    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format.' },
        { status: 400 }
      );
    }

    // Check for network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Network error. Please check your connection and try again.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}