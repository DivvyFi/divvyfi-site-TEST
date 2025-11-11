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
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"DivvyFi Insider" <${process.env.SMTP_USER}>`,
      to: 'contact@divvyfi.com',
      subject: 'New Insider Signup',
      text: `New signup\nName: ${name}\nEmail: ${email}`,
      html: `<p>New signup</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`,
    })

    return NextResponse.json({ success: true, message: 'Signup email sent' })
  } catch (err: any) {
    console.error('Error sending insider signup email:', err)
    return NextResponse.json({ error: 'Failed to send signup email', details: err.message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Insider API live' })
}
