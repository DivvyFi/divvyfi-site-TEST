import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type RequestBody = {
  name: string;
  email: string;
};

// Only POST requests allowed
export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Setup Nodemailer transporter using Vercel env variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: `Welcome to DivvyFi Insider, ${name}!`,
      text: `Hi ${name},\n\nThanks for signing up for DivvyFi Insider!`,
      html: `<p>Hi <strong>${name}</strong>,</p><p>Thanks for signing up for <strong>DivvyFi Insider</strong>!</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ status: 'ok', message: '✅ You’re on the list! Welcome to DivvyFi Insider.' });
  } catch (err: any) {
    console.error('Insider signup error:', err);

    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method Not Allowed' },
    { status: 405 }
  );
}


