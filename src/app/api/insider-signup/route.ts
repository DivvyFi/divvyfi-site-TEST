import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  console.log('📩 [API] Insider signup endpoint hit')

  try {
    const { name, email } = await req.json()
    console.log('🧾 [API] Parsed body:', { name, email })

    if (!name || !email) {
      console.error('❌ [API] Missing name or email')
      return NextResponse.json({ success: false, error: 'Missing name or email' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.verify()
    console.log('✅ [API] SMTP connection verified')

    const info = await transporter.sendMail({
      from: `"DivvyFi Insider" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_FROM,
      subject: `🚀 New Insider Signup: ${name}`,
      text: `New Insider joined the list!\n\nName: ${name}\nEmail: ${email}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p>`,
    })

    console.log('✅ [API] Email sent successfully:', info.messageId)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('❌ [API] Error sending email:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
