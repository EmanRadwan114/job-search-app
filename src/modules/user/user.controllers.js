import User from "./../../../database/models/user.model.js";
import catchError from "./../../utils/Handle Errrors/catchError.js";
import AppError from "./../../utils/Handle Errrors/AppError.js";

// ^update user
export const updateAccount = catchError(async (req, res, next) => {
  const { email, mobileNumber } = req.body;

  const user = await User.findById({ _id: req.user.userId });
  if (!user) return next(new AppError("User not found.", 404));

  if (email && (await User.findOne({ email, _id: { $ne: user._id } }))) {
    return next(new AppError("Email already in use", 409));
  }

  if (
    mobileNumber &&
    (await User.findOne({ mobileNumber, _id: { $ne: user._id } }))
  ) {
    return next(new AppError("Mobile number already in use.", 409));
  }

  const result = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    req.body,
    {
      new: true,
    }
  );
  res.json({ message: "success", result });
});

// ^delete user
export const deleteAccount = catchError(async (req, res, next) => {
  const user = await User.findByIdAndDelete({ _id: req.user.userId });
  if (!user) return next(new AppError("User not found.", 404));
  res.json({ message: "success", user });
});

// ^ get user account data
export const getUserAccountData = catchError(async (req, res, next) => {
  const user = await User.findById({ _id: req.user.userId }).select(
    "-password"
  );
  if (!user) return next(new AppError("User not found.", 404));

  res.json({ message: "success", user });
});

// ^ get profile data

export const getProfileData = catchError(async (req, res, next) => {
  const user = await User.findById({ _id: req.params.userId }).select(
    "-password"
  );
  if (!user) return next(new AppError("User not found.", 404));

  res.json({ message: "success", user });
});

// ^ update password
export const updatePassword = catchError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    req.body.password,
    {
      new: true,
    }
  );
  if (!user) return next(new AppError("User not found.", 404));

  user.password = undefined;
  res.json({ message: "success", user });
});

// ^ get all accouns associated with recovery email
export const getAccountsByRecoveryEmail = catchError(async (req, res, next) => {
  const { recoveryEmail } = req.params;

  const users = await User.find({ recoveryEmail }).select("-password");
  if (!users || users.length === 0)
    return next(new AppError("no accounts found.", 404));

  res.json({ message: "success", users });
});
