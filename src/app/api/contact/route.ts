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
    // Changed from WEB3FORMS_ACCESS_KEY to FORMSPREE_FORM_ID
    const formId = process.env.FORMSPREE_FORM_ID;

    if (!formId) {
      console.error('FORMSPREE_FORM_ID is not configured');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact the administrator.' },
        { status: 500 }
      );
    }
    
    // 4. Send to Formspree endpoint
    // Endpoint updated to use the unique form ID
    const formspreeUrl = `https://formspree.io/f/${formId}`;
    
    const response = await fetch(formspreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        // Formspree requires the input fields directly.
        // It uses '_subject' for the email subject line.
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _subject: `Website Contact from ${name.trim()}`,
      }),
    });

    // 5. Check if submission was successful
    // Formspree returns status 200 on success.
    if (response.ok) {
      // Formspree saves the submission and sends you an email.
      return NextResponse.json(
        { success: true, message: 'Message sent successfully!' },
        { status: 200 }
      );
    } else {
      // If Formspree returns an error (4xx or 5xx status)
      // We try to parse the error body if available, or fall back to a generic message.
      let result;
      try {
        result = await response.json();
      } catch {
        // Fallback for non-JSON error pages (like the one you experienced with Web3Forms)
        return NextResponse.json(
          { error: `Formspree returned status ${response.status}. Please check your Formspree dashboard.` },
          { status: 500 }
        );
      }
      
      console.error('Formspree API Error:', result);
      return NextResponse.json(
        { error: result.error || 'Failed to send message via Formspree. Please try again.' },
        { status: response.status }
      );
    }

  } catch (error) {
    // Catch any unexpected errors (e.g., network issues, parsing failures)
    console.error('API Route Error:', error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}