// src/app/api/insider-signup/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    console.log('POST /api/insider-signup called')

    const body = await req.json()
    console.log('Request body:', body)

    const { name, email } = body

    if (!name || !email) {
      console.warn('Missing name or email')
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }

    // Create transporter for Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // use TLS: false for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send email to contact@divvyfi.com
    const info = await transporter.sendMail({
      from: `"DivvyFi Insider" <${process.env.SMTP_USER}>`,
      to: 'contact@divvyfi.com',
      subject: 'New Insider Signup',
      text: `New Insider Signup:\nName: ${name}\nEmail: ${email}`,
      html: `<p>New Insider Signup:</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`,
    })

    console.log('Email sent:', info)

    return NextResponse.json({ success: true, message: 'Signup successful' })
  } catch (err: any) {
    console.error('Signup error:', err)
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 })
  }
}

// Optional: GET for health check
export async function GET() {
  console.log('GET /api/insider-signup called')
  return NextResponse.json({ status: 'ok', message: 'Insider API live' })
}
