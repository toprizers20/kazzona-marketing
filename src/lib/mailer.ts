import nodemailer from "nodemailer";

export async function sendOTP(email: string, otp: string) {
  // Create a test account on Ethereal Email for local development
  // In production, you would replace this with actual SMTP credentials
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  const info = await transporter.sendMail({
    from: '"Kazzona Security" <security@kazzona.com>',
    to: email,
    subject: "Your Password Reset OTP",
    text: `Your OTP for changing your password is: ${otp}. It will expire in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; border-radius: 10px; background-color: #0a0a0a; color: #fff;">
        <h2 style="color: #047857; text-align: center;">Kazzona OS Security</h2>
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">We received a request to change your dashboard password. Please use the following One-Time Password (OTP) to complete the process:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #10b981; padding: 10px 20px; background-color: #1a1a1a; border-radius: 8px;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #a1a1aa;">This code will expire in 10 minutes. If you did not request this change, please ignore this email.</p>
        <hr style="border-color: #333; margin-top: 30px;" />
        <p style="font-size: 12px; color: #52525b; text-align: center;">&copy; Kazzona Marketing Agency</p>
      </div>
    `,
  });

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  const previewUrl = nodemailer.getTestMessageUrl(info);
  console.log("Preview URL: %s", previewUrl);

  return previewUrl;
}
