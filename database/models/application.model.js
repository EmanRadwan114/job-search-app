import mongoose, { Schema } from "mongoose";
// ^config .env
import dotenv from "dotenv";
dotenv.config();

const schema = new Schema(
  {
    jobId: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
      required: [true, "job id is required"],
      alias: "jobData",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user id is required"],
      alias: "userData",
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

schema.post("init", (doc) => {
  doc.userResume = `${process.env.VERCEL_BASEURL}/uploads/${doc.userResume}`;
});

const Application = mongoose.model("Application", schema);

export default Application;
