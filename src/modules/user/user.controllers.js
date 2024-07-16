import sendMails from "../../utils/Emails/sendEmail.js";
import AppError from "../../utils/Handle Errrors/AppError.js";
import User from "./../../../database/models/user.model.js";
import { catchError } from "./../../utils/Handle Errrors/catchError.js";

// ^sign up
export const signup = catchError(async (req, res, next) => {
  const user = User.insertMany(req.body);
  if (!user) return new AppError("there is an error in the sign up", 409);

  sendMails(req.body.email).catch(
    (err) =>
      new AppError("there is an error in sending the verification email", 409)
  );
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
export function signin() {}
