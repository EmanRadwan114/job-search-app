import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    jobTitle: {
      type: String,
      required: [true, "job title is required"],
    },
    jobLocation: {
      type: String,
      required: [true, "job location is required"],
      enem: ["onsite", "remotely", "hybrid"],
    },
    workingTime: {
      type: String,
      required: [true, "working time is required"],
      enem: ["part-time", "full-time"],
    },
    seniorityLevel: {
      type: String,
      required: [true, "seniority level is required"],
      enem: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"],
    },
    jobDescription: {
      type: String,
      required: [true, "job description is required"],
    },
    technicalSkills: {
      type: [String],
      required: [true, "technical skills are required"],
    },
    softSkills: {
      type: [String],
      required: [true, "soft skills are required"],
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Company HR Id is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", schema);

export default Job;
