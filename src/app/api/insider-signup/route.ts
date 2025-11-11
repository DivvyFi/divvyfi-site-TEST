import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    // create transporter using Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DivvyFi Insider" <${process.env.SMTP_USER}>`,
      to: "contact@divvyfi.com",
      subject: "New Insider Signup",
      text: `Name: ${name}\nEmail: ${email}`,
    });

    return NextResponse.json({ message: "Signup successful" });
  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
