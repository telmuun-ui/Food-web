// import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
import { Resend } from "resend";
configDotenv();
const { AUTH_EMAIL, AUTH_PASS } = process.env;
const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyUserEmail = async (receiver: string, verifyLink: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: receiver,
    subject: "Hello World",
    html: `
   <div style="
    width: 300px;
    height: 250px;
    border-radius: 8px;
    background-color: aquamarine;
  "
>
  <a href="${verifyLink}" style="font-size: 18px; color: red">Verify user</a>
</div>

`,
  });
};
