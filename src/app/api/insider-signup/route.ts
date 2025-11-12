import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, assetClass, netWorth } = await req.json()

    const fullName = `${firstname || ''} ${lastname || ''}`.trim() || 'Anonymous'

    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_HOST,
      port: Number(process.env.BREVO_PORT),
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    })

    await transporter.verify()

    const info = await transporter.sendMail({
      from: `"DivvyFi Insider Signup" <contact@divvyfi.com>`,
      to: process.env.BREVO_TO,
      subject: `New Insider Signup: ${fullName}`,
      html: `
        <h3>New Insider Signup Submission</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email || "(not provided)"}</p>
        <p><strong>Interested Asset Class:</strong> ${assetClass || "(not provided)"}</p>
        <p><strong>Net Worth:</strong> ${netWorth || "(not provided)"}</p>
      `,
    })

    console.log('Insider signup email sent:', info)

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Insider signup error:', error)
    let message = 'Unknown error'
    if (error instanceof Error) message = error.message
    else if (typeof error === 'string') message = error

    return NextResponse.json({ success: false, error: message })
  }
}
