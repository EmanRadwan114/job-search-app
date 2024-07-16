import nodemailer from "nodemailer";
import jwt from "jwt";
// ^config .env
import dotenv from "dotenv";
dotenv.config();

export default async function sendMails(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  jwt.sign({ email }, process.env.VERIFY_EMAIL_KEY, async (err, token) => {
    const info = await transporter.sendMail({
      from: `"Eman Alaa 😊" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Verify Your Email",
      html: `
        <div style='width:70%; padding:10px'>
        <p style='font-weight:700; color:blue; margin-bottom:5px'>Verify Your Email</p>
        <a href= "${process.env.VERCEL_BASEURL}/verify/${token} "></a>
        </div>
        `,
    });
  });
}
