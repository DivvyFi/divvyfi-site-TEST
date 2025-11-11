import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    if (!name || !email) return NextResponse.json({ error: "Name and email required" }, { status: 400 });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"DivvyFi" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_RECEIVER,
      subject: "New Insider Signup",
      text: `Name: ${name}\nEmail: ${email}`,
    });

    return NextResponse.json({ message: "Signup successful" });
  } catch (err: any) {
    console.error("Insider signup error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

