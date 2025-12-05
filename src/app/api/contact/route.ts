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
    
    // 4. Send to Formspree endpoint (using the unique form ID)
    const formspreeUrl = `https://formspree.io/f/${formId}`;
    
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        // Formspree payload structure
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _subject: `Website Contact from ${name.trim()}`, // Formspree field for subject
      }),
    });

    // 5. Check if submission was successful
    if (response.ok) {
      // Successful submission
      return NextResponse.json(
        { success: true, message: 'Message sent successfully! Your submission has been received.' },
        { status: 200 }
      );
    } else {
      // Handle non-successful Formspree response
      let result;
      try {
        result = await response.json();
      } catch {
        // Fallback for non-JSON error pages (the original error cause)
        return NextResponse.json(
          { error: `Formspree returned status ${response.status}. Please check your Formspree dashboard for issues.` },
          { status: 500 }
        );
      }
      
      console.error('Formspree API Error:', result);
      return NextResponse.json(
        { error: result.error || 'Failed to send message. Please try again.' },
        { status: response.status }
      );
    }

  } catch (error) {
    // Catch any unexpected errors (e.g., network issues)
    console.error('API Route Error:', error);
    
    // Check if it's a JSON parsing error on your end
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format from the client.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}