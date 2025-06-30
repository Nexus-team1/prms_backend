import nodemailer from "nodemailer";

interface SendStyledEmailOptions {
  to: string;
  subject: string;
  otp: string;
  newPassword: string;
  fullName: string;
}

export async function sendStyledEmail(options: SendStyledEmailOptions) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
      <h2 style="color: #2d7ff9;">Password Reset Request</h2>
      <p>Hi <b>${options.fullName}</b>,</p>
      <p>You requested to reset your password. Use the OTP below to verify your request:</p>
      <div style="font-size: 24px; font-weight: bold; color: #2d7ff9; margin: 16px 0;">${options.otp}</div>
      <p>Your new temporary password is:</p>
      <div style="font-size: 20px; font-weight: bold; color: #333; margin: 12px 0;">${options.newPassword}</div>
      <p style="color: #888;">Please log in and change your password as soon as possible.</p>
      <hr style="margin: 24px 0;">
      <p style="font-size: 12px; color: #aaa;">If you did not request this, please ignore this email.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"PRMS Support" <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    html,
  });
}
