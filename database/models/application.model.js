import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
      required: [true, "job id is required"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user id is required"],
    },
    userTechSkills: {
      type: [String],
      required: [true, "user technical skills are required"],
    },
    userSoftSkills: {
      type: [String],
      required: [true, "user soft skills are required"],
    },
    userResume: {
      type: String,
      required: [true, "user resume is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", schema);

export default Application;
