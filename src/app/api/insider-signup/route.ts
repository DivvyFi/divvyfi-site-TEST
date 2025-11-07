import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json()

    // 📨 Create transporter with Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: process.env.SMTP_USER, // e.g. 9ab2a7001@smtp-brevo.com
        pass: process.env.SMTP_PASS, // your Brevo SMTP key
      },
    })

    // 📨 Send mail
    await transporter.sendMail({
      from: `"DivvyFi Insider" <${process.env.SMTP_USER}>`,
      to: 'contact@divvyfi.com',
      subject: 'New Insider Signup',
      text: `New insider joined!\n\nName: ${name}\nEmail: ${email}`,
    })

    console.log('✅ Email sent:', name, email)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('❌ API error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
