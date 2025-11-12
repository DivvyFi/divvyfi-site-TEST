import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { firstname, lastname, email, phnumber, message } = await req.json();

    const fullName = `${firstname?.trim() || ''} ${lastname?.trim() || ''}`.trim() || 'Anonymous';

    console.log("Form data received:", { fullName, email, phnumber, message });

    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_HOST,
      port: Number(process.env.BREVO_PORT),
      secure: false, // use STARTTLS
      auth: {
        user: process.env.BREVO_USER, // verified sender like 9ab2a7001@smtp-brevo.com
        pass: process.env.BREVO_PASS, // SMTP key
      },
    });

    await transporter.verify();
    console.log("SMTP connection verified successfully");

    const info = await transporter.sendMail({
      from: `"DivvyFi Contact Form" <contact@divvyfi.com>`,
      to: process.env.BREVO_TO,
      subject: `New message from ${fullName}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email || "(not provided)"}</p>
        <p><strong>Phone:</strong> ${phnumber || "(not provided)"}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "(no message provided)"}</p>
      `,
    });

    console.log("Email send info:", info);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Contact form error:", error);

    let message = "Unknown error";
    if (error instanceof Error) message = error.message;
    else if (typeof error === "string") message = error;

    return NextResponse.json({ success: false, error: message });
  }
}
