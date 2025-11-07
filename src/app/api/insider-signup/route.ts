import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  console.log('📩 [API] Insider signup endpoint hit')

  try {
    const { name, email } = await req.json()
    console.log('🧾 [API] Parsed body:', { name, email })

    // 🧱 Validate input
    if (!email || !name) {
      console.error('❌ [API] Missing name or email')
      return NextResponse.json({ success: false, error: 'Missing name or email' }, { status: 400 })
    }

    console.log('⚙️ [API] Creating transporter with Brevo SMTP...')
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      auth: {
        user: process.env.SMTP_USER, // e.g. 9ab2a7001@smtp-brevo.com
        pass: process.env.SMTP_PASS, // your Brevo SMTP key
      },
    })

    console.log('🔍 [API] Verifying SMTP connection...')
    await transporter.verify()
    console.log('✅ [API] SMTP connection verified successfully')

    console.log('✉️ [API] Sending email to contact@divvyfi.com...')
    const info = await transporter.sendMail({
      from: `"DivvyFi Insider" <${process.env.SMTP_USER}>`,
      to: 'contact@divvyfi.com',
      subject: '🚀 New DivvyFi Insider Signup',
      text: `New Insider joined the list!\n\nName: ${name}\nEmail: ${email}`,
    })

    console.log('✅ [API] Email sent successfully:', info.messageId)
    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('❌ [API] Error in insider-signup route:', err)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
