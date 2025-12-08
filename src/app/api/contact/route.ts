// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

// ============================================================================
// RATE LIMITING
// ============================================================================
const rateLimiter = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimiter.get(ip);

  // Reset if time window passed
  if (!limit || now > limit.resetTime) {
    rateLimiter.set(ip, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  // Check if under limit (3 requests per minute)
  if (limit.count < 3) {
    limit.count++;
    return true;
  }

  return false;
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimiter.entries()) {
    if (now > data.resetTime) {
      rateLimiter.delete(ip);
    }
  }
}, 300000);

// ============================================================================
// VALIDATION
// ============================================================================
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateInput(name: string, email: string, message: string) {
  const errors: string[] = [];

  // Name validation
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (name.length > 100) {
    errors.push('Name is too long');
  }
  if (!/^[a-zA-Z\s\-']+$/.test(name)) {
    errors.push('Name contains invalid characters');
  }

  // Email validation
  if (!email || !emailRegex.test(email)) {
    errors.push('Invalid email address');
  }
  if (email.length > 254) {
    errors.push('Email is too long');
  }

  // Message validation
  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  if (message.length > 2000) {
    errors.push('Message is too long');
  }

  // Spam detection
  const spamKeywords = ['viagra', 'casino', 'lottery', 'prize', 'click here', 'buy now'];
  const lowerMessage = message.toLowerCase();
  if (spamKeywords.some(keyword => lowerMessage.includes(keyword))) {
    errors.push('Message contains prohibited content');
  }

  // Check for suspicious patterns
  const urlCount = (message.match(/https?:\/\//g) || []).length;
  if (urlCount > 3) {
    errors.push('Too many URLs in message');
  }

  return errors;
}

function sanitizeInput(text: string): string {
  return text
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
}

// ============================================================================
// MAIN HANDLER
// ============================================================================
export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    // 2. Parse and validate body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // Validate inputs
    const validationErrors = validateInput(name, email, message);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: validationErrors[0] },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanMessage = sanitizeInput(message);

    // 3. Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      );
    }

    // 4. Configure transporter with security
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Security options
      secure: true,
      requireTLS: true,
      tls: {
        rejectUnauthorized: true,
        minVersion: 'TLSv1.2'
      }
    });

    // 5. Verify transporter before sending
    try {
      await transporter.verify();
    } catch (error) {
      console.error('Email transporter verification failed:', error);
      return NextResponse.json(
        { error: 'Email service is temporarily unavailable' },
        { status: 503 }
      );
    }

    // 6. Prepare email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: cleanEmail,
      subject: `New Contact from ${cleanName}`,
      text: `
Name: ${cleanName}
Email: ${cleanEmail}
IP: ${ip}
Time: ${new Date().toISOString()}

Message:
${cleanMessage}
      `,
      html: `
<div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <h2 style="color: #4D64FF; margin: 0 0 20px 0;">New Contact Form Submission</h2>
    
    <div style="margin-bottom: 15px;">
      <strong style="color: #333;">Name:</strong>
      <p style="margin: 5px 0; color: #666;">${cleanName}</p>
    </div>
    
    <div style="margin-bottom: 15px;">
      <strong style="color: #333;">Email:</strong>
      <p style="margin: 5px 0;"><a href="mailto:${cleanEmail}" style="color: #4D64FF;">${cleanEmail}</a></p>
    </div>
    
    <div style="margin-bottom: 15px;">
      <strong style="color: #333;">Message:</strong>
      <div style="margin: 10px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #4D64FF; border-radius: 4px;">
        <p style="margin: 0; color: #333; white-space: pre-wrap;">${cleanMessage}</p>
      </div>
    </div>
    
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
      <p style="margin: 5px 0;">IP: ${ip}</p>
      <p style="margin: 5px 0;">Time: ${new Date().toLocaleString()}</p>
    </div>
  </div>
</div>
      `
    };

    // 7. Send email
    await transporter.sendMail(mailOptions);

    // 8. Log success (don't log sensitive data in production)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Contact form submitted by ${cleanName} (${cleanEmail})`);
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      },
      { status: 200 }
    );

  } catch (error) {
    // Log error (use proper logging service in production)
    console.error('Contact form error:', error instanceof Error ? error.message : 'Unknown error');
    
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later or email me directly.' },
      { status: 500 }
    );
  }
}