import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ================= ADMIN EMAIL =================
const adminMail = {
  from: `"QuickSquad" <${process.env.EMAIL_USER}>`,
  to: "devs@digipants.com",
  subject: "New Subscriber – QuickSquad",
  html: `
  <div style="background:#eaf1ff;padding:40px;font-family:Segoe UI,sans-serif">
    <div style="max-width:650px;margin:auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.12)">

      <div style="background:#1e40af;padding:30px;text-align:center;color:white">
        <h1 style="margin:0;font-size:28px;">🚀 New Subscriber</h1>
        <p style="margin-top:10px;font-size:16px;opacity:0.9">
          Someone just subscribed to QuickSquad
        </p>
      </div>

      <div style="padding:40px;">
        <p style="font-size:18px;margin-bottom:25px;">
          A new user has joined your QuickSquad mailing list:
        </p>

        <div style="background:#f1f5ff;border-radius:12px;padding:25px;text-align:center">
          <p style="font-size:22px;font-weight:700;color:#1e40af;margin:0">
            ${name}
          </p>
          <p style="font-size:18px;margin-top:10px;color:#334155">
            📧 ${email}
          </p>
        </div>

        <p style="margin-top:30px;font-size:16px;color:#334155;">
          This subscriber will now receive updates, tech tips, and promotions.
        </p>
      </div>

      <div style="background:#f8fafc;padding:18px;text-align:center;font-size:13px;color:#64748b">
        QuickSquad © ${new Date().getFullYear()} • quicksquad.live
      </div>
    </div>
  </div>
  `,
};


    // ================= USER EMAIL =================
const userMail = {
  from: `"QuickSquad" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "🎉 Welcome to QuickSquad",
  html: `
  <div style="background:#eaf1ff;padding:40px;font-family:Segoe UI,sans-serif">
    <div style="max-width:650px;margin:auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.12)">

      <div style="background:#2563eb;padding:30px;text-align:center;color:white">
        <h1 style="margin:0;font-size:28px;">Welcome to QuickSquad 🚀</h1>
        <p style="margin-top:10px;font-size:16px;opacity:0.9">
          You're officially part of our tech community
        </p>
      </div>

      <div style="padding:40px;">
        <p style="font-size:20px;">
          Hi <strong>${name}</strong>,
        </p>

        <p style="font-size:18px;margin-top:15px;line-height:1.6;">
          Thank you for subscribing to <strong>QuickSquad</strong>!  
          You’ll now receive expert tech tips, troubleshooting guides,
          and exclusive offers directly in your inbox.
        </p>

        <div style="background:#f1f5ff;border-radius:12px;padding:25px;margin-top:30px">
          <p style="font-size:18px;font-weight:600;color:#1e40af;margin:0;">
            What you’ll receive:
          </p>
          <ul style="margin-top:15px;font-size:16px;color:#334155">
            <li>🔧 Easy-to-follow tech fixes</li>
            <li>💡 Tips to speed up and protect your devices</li>
            <li>🎁 Special QuickSquad deals</li>
          </ul>
        </div>

        <p style="margin-top:30px;font-size:18px;">
          Need help right now?  
          Visit 👉 <a href="https://quicksquad.live" style="color:#2563eb;font-weight:600">quicksquad.live</a>
        </p>

        <p style="margin-top:30px;font-size:16px;">
          — Team <strong>QuickSquad</strong> 💙
        </p>
      </div>

      <div style="background:#f8fafc;padding:18px;text-align:center;font-size:13px;color:#64748b">
        You subscribed on quicksquad.live
      </div>

    </div>
  </div>
  `,
};


    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
