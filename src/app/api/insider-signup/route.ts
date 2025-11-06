import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// This route runs on the server — safe to use secrets here
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json()

    // Validate inputs
    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 })
    }

    // Create transporter — you can use Gmail, Mailgun, or any SMTP provider
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send email
    await transporter.sendMail({
      from: '"DivvyFi Insider" <contact@divvyfi.com>',
      to: 'contact@divvyfi.com',
      subject: '🔥 New DivvyFi Insider Signup',
      text: `A new user joined the Insider list.\n\nName: ${name}\nEmail: ${email}`,
      html: `
        <h2>New Insider Signup 🚀</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email sending error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
  }
}
