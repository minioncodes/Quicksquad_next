import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, category, subCategory } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    // Create reusable transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"QuickSquad Support" <${process.env.EMAIL_USER}>`,
      to: "aman@digipants.com",
      subject: `💻 New Support Inquiry from ${name}`,
      html: `
      <div style="background-color:#f8fafc; padding:32px; font-family:'Segoe UI', Tahoma, sans-serif; color:#1f2937;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.1);">

          <!-- Header -->
          <div style="background:#1d4ed8; padding:20px 30px;">
            <h2 style="color:#ffffff; margin:0; font-size:22px; letter-spacing:0.5px;">
              🧠 New Remote Support Request
            </h2>
            <p style="color:#c7d2fe; margin-top:6px; font-size:14px;">
              Sent via QuickSquad Contact Form
            </p>
          </div>

          <!-- Body -->
          <div style="padding:28px 30px;">
            <p style="margin:0 0 12px 0; font-size:16px;">
              You’ve received a new inquiry. Below are the submitted details:
            </p>

            <table cellpadding="6" cellspacing="0" width="100%" style="margin-top:10px; border-collapse:collapse;">
              <tr>
                <td style="font-weight:600; width:150px; color:#1d4ed8;">👤 Name:</td>
                <td>${name}</td>
              </tr>
              <tr>
                <td style="font-weight:600; color:#1d4ed8;">📧 Email:</td>
                <td>${email}</td>
              </tr>
              <tr>
                <td style="font-weight:600; color:#1d4ed8;">📞 Phone:</td>
                <td>${phone}</td>
              </tr>
              <tr>
                <td style="font-weight:600; color:#1d4ed8;">📂 Category:</td>
                <td>${category || "Not specified"}</td>
              </tr>
              <tr>
                <td style="font-weight:600; color:#1d4ed8;">🧩 Sub-Category:</td>
                <td>${subCategory || "Not specified"}</td>
              </tr>
            </table>

            <!-- Message -->
            <div style="margin-top:20px;">
              <p style="font-weight:600; margin-bottom:6px; color:#1d4ed8;">📝 Message:</p>
              <div style="background:#f9fafb; border-left:4px solid #1d4ed8; padding:12px 16px; border-radius:6px; font-size:15px; line-height:1.6;">
                ${message}
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#f1f5f9; padding:18px 30px; text-align:center; font-size:13px; color:#475569;">
            <p style="margin:0;"><b>QuickSquad Remote Tech Support</b> — 24/7 Assistance Across Devices</p>
            <p style="margin-top:4px; color:#94a3b8;">Secure • Trusted • Instant</p>
          </div>

        </div>
      </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}
