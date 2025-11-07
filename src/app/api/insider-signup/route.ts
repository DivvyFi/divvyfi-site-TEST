import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  console.log('📩 [API] Insider signup endpoint hit.')

  try {
    const { name, email } = await req.json()
    console.log('➡️ Parsed request:', { name, email })

    if (!name || !email) {
      console.warn('⚠️ Missing name or email.')
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    console.log('🧩 Setting up transporter...')
    console.log('SMTP_HOST:', process.env.SMTP_HOST)
    console.log('SMTP_PORT:', process.env.SMTP_PORT)
    console.log('SMTP_USER:', process.env.SMTP_USER ? '[HIDDEN]' : 'undefined')

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // use TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    console.log('🧠 Verifying SMTP connection...')
    await transporter.verify()
    console.log('✅ SMTP verified successfully.')

    console.log('🚀 Sending email...')
    const info = await transporter.sendMail({
      from: `"DivvyFi Insider" <${process.env.SMTP_USER}>`,
      to: 'contact@divvyfi.com',
      subject: `New Insider Signup: ${name}`,
      text: `Name: ${name}\nEmail: ${email}`,
    })

    console.log('✅ Email sent successfully:', info.messageId)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('❌ Email sending failed:')
    console.error('Error name:', error.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
