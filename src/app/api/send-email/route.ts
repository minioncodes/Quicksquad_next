import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, category, subCategory } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ----------- 1️⃣  EMAIL TO ADMIN  ------------
    const adminMail = {
      from: `"QuickSquad Support" <${process.env.EMAIL_USER}>`,
      to: "aman@digipants.com",
      subject: `💻 New Support Inquiry from ${name}`,
      html: `
      <div style="background:#f0f5ff; padding:32px; font-family:'Segoe UI', Tahoma, sans-serif; color:#1e293b;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.08);">

          <!-- Header -->
          <div style="background:#2563eb; padding:20px 30px;">
            <h2 style="color:#ffffff; margin:0; font-size:22px;">🧠 New Remote Support Request</h2>
            <p style="color:#bfdbfe; margin-top:6px; font-size:14px;">Sent via QuickSquad Contact Form</p>
          </div>

          <!-- Body -->
          <div style="padding:28px 30px;">
            <p style="margin-bottom:12px;">A new inquiry was submitted on your website:</p>

            <table cellpadding="6" cellspacing="0" width="100%" style="margin-top:10px; border-collapse:collapse;">
              <tr><td style="font-weight:600; width:150px; color:#2563eb;">👤 Name:</td><td>${name}</td></tr>
              <tr><td style="font-weight:600; color:#2563eb;">📧 Email:</td><td>${email}</td></tr>
              <tr><td style="font-weight:600; color:#2563eb;">📞 Phone:</td><td>${phone}</td></tr>
              <tr><td style="font-weight:600; color:#2563eb;">📂 Category:</td><td>${category || "Not specified"}</td></tr>
              <tr><td style="font-weight:600; color:#2563eb;">🧩 Sub-Category:</td><td>${subCategory || "Not specified"}</td></tr>
            </table>

            <div style="margin-top:20px;">
              <p style="font-weight:600; margin-bottom:6px; color:#2563eb;">📝 Message:</p>
              <div style="background:#f8fafc; border-left:4px solid #2563eb; padding:12px 16px; border-radius:6px; font-size:15px;">
                ${message}
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#f1f5f9; padding:18px 30px; text-align:center; font-size:13px; color:#475569;">
            <p style="margin:0;"><b>QuickSquad Remote Tech Support</b> — 24/7 Assistance Across Devices</p>
            <p style="margin-top:6px; color:#64748b;">
              Visit us at <a href="https://quicksquad.live" style="color:#2563eb; text-decoration:none;">https://quicksquad.live</a>
            </p>
          </div>
        </div>
      </div>`,
    };

    // ----------- 2️⃣  CONFIRMATION EMAIL TO USER  ------------
    const userMail = {
      from: `"QuickSquad Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `✅ Your Support Request Has Been Received`,
      html: `
      <div style="background:#f0f5ff; padding:32px; font-family:'Segoe UI', Tahoma, sans-serif; color:#1e293b;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.08);">

          <!-- Header -->
          <div style="background:#2563eb; padding:20px 30px;">
            <h2 style="color:#ffffff; margin:0; font-size:22px;">🙌 Thank You, ${name}!</h2>
            <p style="color:#bfdbfe; margin-top:6px; font-size:14px;">We’ve received your support inquiry.</p>
          </div>

          <!-- Body -->
          <div style="padding:28px 30px;">
            <p>We’ve received your message and one of our tech specialists will reach out to you shortly.</p>
            <p style="margin-top:12px;">Here’s a copy of your submission:</p>

            <div style="background:#f8fafc; border-left:4px solid #2563eb; padding:12px 16px; border-radius:6px; font-size:15px;">
              <p><strong>Category:</strong> ${category || "Not specified"}</p>
              <p><strong>Sub-Category:</strong> ${subCategory || "Not specified"}</p>
              <p><strong>Message:</strong><br>${message}</p>
            </div>

            <p style="margin-top:16px; color:#334155;">
              Our team operates <strong>24×7</strong>, so expect a reply soon.
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#f1f5f9; padding:18px 30px; text-align:center; font-size:13px; color:#475569;">
            <p style="margin:0;"><b>QuickSquad Remote Tech Support</b> — Always Here to Help</p>
            <p style="margin-top:6px; color:#64748b;">
              Visit us at <a href="https://quicksquad.live" style="color:#2563eb; text-decoration:none;">https://quicksquad.live</a>
            </p>
          </div>
        </div>
      </div>`,
    };

    // Send both emails
    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}
