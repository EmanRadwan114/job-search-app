import bcrypt from "bcrypt";
import User from "../../database/models/user.model.js";
import AppError from "../utils/Handle Errrors/AppError.js";
import catchError from "../utils/Handle Errrors/catchError.js";

// ^a middleware to check if email is already found or not, if it is found hash password and add userName and go to next step
const checkEmailExists = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) return next(new AppError("email is already found", 409));
  req.body.userName = `${req.body.firstName} ${req.body.lastName}`;
  req.body.password = bcrypt.hashSync(
    req.body.password,
    +process.env.SALT_ROUND
  );
  next();
});

export default checkEmailExists;
