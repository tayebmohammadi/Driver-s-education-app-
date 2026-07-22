import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER);
}

async function sendEmail(options: SendEmailOptions): Promise<void> {
  if (!isSmtpConfigured()) {
    console.info("[email:dev]", {
      to: options.to,
      subject: options.subject,
      text: options.text,
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? "Driver Education <noreply@example.com>",
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
}

function getAppUrl(): string {
  return process.env.APP_URL ?? "http://localhost:3000";
}

export async function sendVerificationEmail(
  email: string,
  token: string
): Promise<void> {
  const verifyUrl = `${getAppUrl()}/api/auth/verify-email?token=${encodeURIComponent(token)}`;

  await sendEmail({
    to: email,
    subject: "Verify your email — Driver Education",
    text: `Verify your email by visiting: ${verifyUrl}`,
    html: `
      <p>Welcome to Driver Education!</p>
      <p>Please verify your email address by clicking the link below:</p>
      <p><a href="${verifyUrl}">Verify Email</a></p>
      <p>This link expires in 24 hours.</p>
    `,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  token: string
): Promise<void> {
  const resetUrl = `${getAppUrl()}/reset-password?token=${encodeURIComponent(token)}`;

  await sendEmail({
    to: email,
    subject: "Reset your password — Driver Education",
    text: `Reset your password by visiting: ${resetUrl}`,
    html: `
      <p>You requested a password reset.</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>This link expires in 1 hour. If you did not request this, ignore this email.</p>
    `,
  });
}
