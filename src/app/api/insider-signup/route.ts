import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    // Nodemailer transporter using BREVO (or SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_HOST,
      port: Number(process.env.BREVO_PORT),
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.BREVO_FROM,
      to: email,
      subject: 'Welcome to DivvyFi Insider',
      text: `Hi ${name},\n\nWelcome to DivvyFi Insider!`,
    });

    return NextResponse.json({ status: 'ok', message: '✅ You’re on the list!' });
  } catch (error: any) {
    console.error('Insider signup error:', error);
    return NextResponse.json(
      { error: 'Failed to sign up. Please try again later.' },
      { status: 500 }
    );
  }
}
