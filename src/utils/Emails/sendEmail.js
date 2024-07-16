import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import catchError from "./../Handle Errrors/catchError.js";
import AppError from "./../Handle Errrors/AppError.js";

// ^config .env
import dotenv from "dotenv";
dotenv.config();

// * is used to create a transport and define the email structure with info about the sender and the reciever
const sendMails = catchError(async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  jwt.sign({ email }, process.env.VERIFY_EMAIL_KEY, async (err, token) => {
    if (err) return next(new AppError("tojen cannot be created", 409));

    const info = await transporter.sendMail(
      {
        from: `"Eman Alaa 😊" <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "Verify Your Email",
        html: `
        <div style='width:70%; padding:10px'>
        <p style='font-weight:700; color:blue; margin-bottom:5px'>Verify Your Email</p>
        <a href= "${process.env.VERCEL_BASEURL}/verify/${token} ">Verify Email</a>
        </div>
        `,
      },
      (err, result) => {
        console.log(result, err);
      }
    );
  });
});

export default sendMails;
