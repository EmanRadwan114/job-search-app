import bcrypt from "bcrypt";
import User from "../../database/models/user.model.js";
import AppError from "../utils/Handle Errrors/AppError.js";

export default function checkEmailExists(req, res, next) {
  const user = User.findOne({ email: req.body.email });
  if (user) return next(new AppError("email is already found", 409));
  req.body.password = bcrypt.hashSync(
    req.body.password,
    +process.env.SALT_ROUND
  );
  req.body.userName = `${req.body.firstName} ${req.body.lastName}`;
  next();
}
