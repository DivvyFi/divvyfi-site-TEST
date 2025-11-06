// src/app/api/insider-signup/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  const { name, email } = await req.json()
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })
  await transporter.sendMail({
    from: `"DivvyFi Insider" <${process.env.SMTP_USER}>`,
    to: 'contact@divvyfi.com',
    subject: `New Insider Signup: ${name}`,
    text: `Name: ${name}\nEmail: ${email}`
  })
  return NextResponse.json({ success: true })
}
