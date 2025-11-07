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

    // Create transporter
    let transporter
    try {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
      console.log('🔧 [SMTP] Transporter created')
    } catch (err) {
      console.error('❌ [SMTP] Error creating transporter:', err)
      return NextResponse.json({ success: false, error: 'Error creating SMTP transporter' }, { status: 500 })
    }

    // Verify connection
    try {
      await transporter.verify()
      console.log('✅ [SMTP] SMTP connection verified')
    } catch (err) {
      console.error('❌ [SMTP] Verification failed:', err)
      return NextResponse.json({ success: false, error: 'SMTP verification failed' }, { status: 500 })
    }

    // Send email
    try {
      const info = await transporter.sendMail({
        from: `"DivvyFi Insider" <${process.env.SMTP_FROM}>`,
        to: process.env.SMTP_FROM,
        subject: `🚀 New Insider Signup: ${name}`,
        text: `New Insider joined!\nName: ${name}\nEmail: ${email}`,
        html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p>`,
      })
      console.log('📤 [SMTP] Email sent successfully:', info.messageId)
      return NextResponse.json({ success: true })
    } catch (err) {
      console.error('❌ [SMTP] Sending email failed:', err)
      return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
    }

  } catch (err: any) {
    console.error('❌ [API] Unexpected error:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
