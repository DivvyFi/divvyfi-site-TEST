// src/app/api/insider-signup/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json()

    // Create transporter for Brevo
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_HOST,
      port: Number(process.env.BREVO_PORT),
      secure: false, // use TLS
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    })

    // Send the email
    const info = await transporter.sendMail({
      from: `"DivvyFi Insider" <${process.env.BREVO_USER}>`,
      to: 'contact@divvyfi.com',
      subject: `New Insider Signup: ${name}`,
      text: `New signup from ${name} (${email})`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p>`,
    })

    console.log('✅ Brevo sendMail response:', info)

    return NextResponse.json({ success: true, message: 'Email sent successfully!' })
  } catch (error: any) {
    console.error('❌ Email send error:', error)
    return NextResponse.json({ success: false, error: error.message })
  }
}
