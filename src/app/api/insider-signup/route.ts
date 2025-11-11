// src/app/api/insider-signup/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface RequestBody {
  name: string
  email: string
}

export async function POST(req: Request) {
  try {
    const { name, email } = (await req.json()) as RequestBody

    if (!name || !email) {
      console.log('Validation failed:', { name, email })
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    console.log('Received signup:', { name, email })

    // Create transporter using Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // smtp-relay.brevo.com
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true if 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Define email options
    const mailOptions = {
      from: `"DivvyFi Insider" <${process.env.SMTP_USER}>`,
      to: 'contact@divvyfi.com', // where you want to receive the email
      subject: 'New Insider Signup',
      text: `New Insider Signup\nName: ${name}\nEmail: ${email}`,
      html: `<h2>New Insider Signup</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`,
    }

    // Send the email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)

    return NextResponse.json({ success: true, message: 'Signup email sent' })
  } catch (err: any) {
    console.error('Error in insider-signup API:', err)
    return NextResponse.json({ error: 'Failed to send signup email', details: err.message }, { status: 500 })
  }
}

// Optional: handle unsupported methods
export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Insider API live' })
}
