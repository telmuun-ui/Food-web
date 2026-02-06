import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL, 
    pass: process.env.AUTH_PASS,  
  },
});


export const sendVerifyCodeEmail = async (to: string, code: string) => {
  await transporter.sendMail({
    from: `"Food Delivery" <${process.env.AUTH_EMAIL}>`,
    to,
    subject: "Your 6-digit verification code",
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family:Arial; background:#f4f4f4; padding:24px;">
          <div style="max-width:420px; margin:auto; background:#fff; border-radius:8px; padding:24px;">
            <h2 style="margin:0 0 12px 0;">Food Delivery</h2>
            <p>Таны баталгаажуулах код:</p>
            <div style="
              font-size:32px;
              font-weight:bold;
              letter-spacing:6px;
              margin:16px 0;
            ">
              ${code}
            </div>
            <p style="color:#777; font-size:12px;">
              Энэ код 5 минутын хугацаанд хүчинтэй.
            </p>
          </div>
        </body>
      </html>
    `,
  });
};
