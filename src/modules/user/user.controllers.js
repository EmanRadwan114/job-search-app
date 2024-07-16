import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// ^config .env
import dotenv from "dotenv";
dotenv.config();

import sendMails from "../../utils/Emails/sendEmail.js";
import AppError from "../../utils/Handle Errrors/AppError.js";
import User from "./../../../database/models/user.model.js";
import catchError from "./../../utils/Handle Errrors/catchError.js";

// ^sign up
export const signup = catchError(async (req, res, next) => {
  const user = await User.insertMany(req.body);
  sendMails(req.body.email);
  res.status(201).json({
    message:
      "user is signed up successfully, check your email for verification",
  });
});

// ^ verify email
export const verifyEmail = catchError(async (req, res, next) => {
  jwt.verify(
    req.params.token,
    process.env.VERIFY_EMAIL_KEY,
    async (err, payload) => {
      if (err)
        return new AppError("error in verify email token validation", 409);
      await User.findOneAndUpdate(
        { email: payload.email },
        { isEmailConfirmend: true }
      );
      res.json({
        message: "email verified successfully",
        email: payload.email,
      });
    }
  );
});

// ^sign in
export const signin = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError("incorrect email or passwod", 401));

  jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.SIGNIN_KEY,
    (err, token) => {
      res.json({ message: "signed in successfull", token });
    }
  );
});
