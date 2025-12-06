import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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

    // 3. Configure the Transporter using your Environment Variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // faresbermak97@gmail.com
        pass: process.env.EMAIL_PASS, // sbks wusb tsic oedo
      },
    });

    // 4. Set up the email structure
    const mailOptions = {
      from: `"My Site VA" <${process.env.EMAIL_USER}>`, // Sender Name: My Site VA
      to: process.env.EMAIL_USER,                        // Sends to yourself
      replyTo: email,                                    // Hitting "Reply" replies to the visitor
      subject: `New Contact: ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4D64FF;">New Message from My Site VA</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <br/>
          <p><strong>Message:</strong></p>
          <blockquote style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4D64FF;">
            ${message.replace(/\n/g, '<br>')}
          </blockquote>
        </div>
      `,
    };

    // 5. Send the email
    await transporter.sendMail(mailOptions);

    // 6. Return success (Matches your ContactSection.tsx expectations)
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! I will get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Nodemailer Error:', error);
    
    // Return error (Matches your ContactSection.tsx expectations)
    return NextResponse.json(
      { error: 'Failed to send message via email server. Please try again later.' },
      { status: 500 }
    );
  }
}