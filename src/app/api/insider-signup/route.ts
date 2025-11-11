// src/app/api/insider-signup/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Brevo SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.BREVO_SMTP_USER, // 9ab2a7001@smtp-brevo.com
        pass: process.env.BREVO_SMTP_PASS, // your Brevo key
      },
    });

    // Send email
    await transporter.sendMail({
      from: '"DivvyFi" <contact@divvyfi.com>',
      to: "info.divvyfi@gmail.com",
      subject: "New Insider Signup",
      text: `Name: ${name}\nEmail: ${email}`,
    });

    console.log("✅ Email sent successfully:", name, email);

    return NextResponse.json(
      { message: "Signup successful" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Email send error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// Optional: Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: "Method Not Allowed" },
    { status: 405 }
  );
}
