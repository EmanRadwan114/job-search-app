import mongoose, { Schema } from "mongoose";

function validateDOB(dob) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dob);
}

const schema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    useerName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, "password is required"],
    },
    recoveryEmail: {
      type: String,
      required: [true, "recovery email is required"],
    },
    DOB: {
      type: Date,
      required: [true, "date of birth is required"],
      validate: [validateDOB, "Date of birth must be in the format YYYY-MM-DD"],
    },
    mobileNumber: {
      type: String,
      required: [true, "mobile number is required"],
      unique: true,
    },
    role: {
      type: String,
      enem: ["User", "Company_HR"],
      required: [true, "role is required"],
    },
    status: {
      type: String,
      enem: ["online", "offline"],
      default: "offline",
    },
    isEmailConfirmend: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", schema);

export default User;
