import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] || character);

const asTrimmedString = (value: unknown) => typeof value === "string" ? value.trim() : "";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = asTrimmedString(body.name);
    const email = asTrimmedString(body.email).toLowerCase();
    const phone = asTrimmedString(body.phone);
    const message = asTrimmedString(body.message);
    const category = asTrimmedString(body.category) || "Not specified";
    const subCategory = asTrimmedString(body.subCategory) || "Not specified";

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ success: false, error: "Please complete all required fields." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    if (name.length > 120 || phone.length > 60 || message.length > 5000 || category.length > 160 || subCategory.length > 220) {
      return NextResponse.json({ success: false, error: "One or more fields are too long." }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const inbox = process.env.CONTACT_INBOX || "support@quicksquad.live";
    const from = process.env.EMAIL_FROM || emailUser;

    if (!emailUser || !emailPass || !from) {
      console.error("Contact email is not configured.");
      return NextResponse.json({ success: false, error: "Contact email is temporarily unavailable. Please email support@quicksquad.live directly." }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    });

    const safe = { name: escapeHtml(name), email: escapeHtml(email), phone: escapeHtml(phone), message: escapeHtml(message).replace(/\n/g, "<br />"), category: escapeHtml(category), subCategory: escapeHtml(subCategory) };
    const brandFrom = `"QuickSquad" <${from}>`;

    await transporter.sendMail({
      from: brandFrom,
      to: inbox,
      replyTo: email,
      subject: `New QuickSquad consultation request from ${name}`,
      text: `New consultation request\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCategory: ${category}\nSub-category: ${subCategory}\n\nMessage:\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;color:#1e293b;line-height:1.55"><h2 style="color:#1d4ed8">New QuickSquad consultation request</h2><p>Submitted through quicksquad.live.</p><table cellpadding="6"><tr><td><strong>Name</strong></td><td>${safe.name}</td></tr><tr><td><strong>Email</strong></td><td>${safe.email}</td></tr><tr><td><strong>Phone</strong></td><td>${safe.phone}</td></tr><tr><td><strong>Category</strong></td><td>${safe.category}</td></tr><tr><td><strong>Sub-category</strong></td><td>${safe.subCategory}</td></tr></table><h3>Message</h3><p>${safe.message}</p></div>`,
    });

    await transporter.sendMail({
      from: brandFrom,
      to: email,
      subject: "We received your QuickSquad consultation request",
      text: `Hello ${name},\n\nWe received your consultation request. QuickSquad provides general consumer guidance and consultation. Our support team will review your message.\n\nCategory: ${category}\n\nThank you,\nQuickSquad`,
      html: `<div style="font-family:Arial,sans-serif;color:#1e293b;line-height:1.55"><h2 style="color:#1d4ed8">We received your request</h2><p>Hello ${safe.name},</p><p>Thank you for contacting QuickSquad. We provide general consumer guidance and consultation.</p><p><strong>Category:</strong> ${safe.category}</p><p>Our customer-support team will review your message.</p><p>Thank you,<br /><strong>QuickSquad</strong></p></div>`,
    }).catch((error) => console.error("Confirmation email failed:", error));

    return NextResponse.json({ success: true, message: "Your consultation request has been sent." });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json({ success: false, error: "We could not send your request. Please try again or email support@quicksquad.live." }, { status: 500 });
  }
}
