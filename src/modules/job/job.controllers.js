import catchError from "./../../utils/Handle Errrors/catchError.js";
import Job from "../../../database/models/job.model.js";
import AppError from "./../../utils/Handle Errrors/AppError.js";
import Company from "../../../database/models/company.model.js";

// ^ add job
export const addJob = catchError(async (req, res, next) => {
  if (req.user.role === "Company_HR") {
    const job = await Job.insertMany(req.body);
    return res.status(201).json({
      message: "job is added successfully",
      job,
    });
  }
  return next(new AppError("Your Access is Denied", 403));
});

// ^ Update Job
export const updateJob = catchError(async (req, res, next) => {
  if (req.user.role === "Company_HR") {
    const job = await Job.findById({ _id: req.params.jobId });

    if (!job) return next(new AppError("job is not found", 404));

    if (job.addedBy !== req.user.userId)
      return next(new AppError("Your Access is Denied", 403));

    const result = await Job.findByIdAndUpdate(
      {
        _id: job._id,
      },
      req.body,
      {
        new: true,
      }
    );
    return res.json({ message: "success", result });
  }
  return next(new AppError("Your Access is Denied", 403));
});

// ^ Delete Job
export const deleteJob = catchError(async (req, res, next) => {
  if (req.user.role === "Company_HR") {
    const job = await Job.findById({ _id: req.params.jobId });

    if (!job) return next(new AppError("job is not found", 404));

    if (job.addedBy !== req.user.userId)
      return next(new AppError("Your Access is Denied", 403));

    const result = await Job.findByIdAndDelete({
      _id: job._id,
    });
    return res.json({ message: "success", result });
  }
  return next(new AppError("Your Access is Denied", 403));
});

// ^ Get all Jobs with their company’s information
export const getAllJobs = catchError(async (req, res, next) => {
  if (req.user.role === "User" || req.user.role === "Company_HR") {
    const jobs = await Job.find().populate("addedBy");

    if (!jobs) return next(new AppError("no jobs are found", 404));

    return res.json({ message: "success", jobs });
  }
  return next(new AppError("Your Access is Denied", 403));
});

// ^ Get all Jobs for a specific company
export const getCompanyJobs = catchError(async (req, res, next) => {
  if (req.user.role === "User" || req.user.role === "Company_HR") {
    const company = await Company.findOne({
      companyName: req.query.companyName,
    });

    if (!company) return next(new AppError("no companies are found", 404));

    const jobs = await Job.find({
      addedBy: company.companyHR,
    });

    if (!jobs) return next(new AppError("no jobs are found", 404));

    return res.json({ message: "success", jobs });
  }
  return next(new AppError("Your Access is Denied", 403));
});

// ^ Get all Jobs that match the following filters
export const filterJobs = async (req, res) => {
  const {
    workingTime,
    jobLocation,
    seniorityLevel,
    jobTitle,
    technicalSkills,
  } = req.query;

  if (req.user.role === "User" || req.user.role === "Company_HR") {
    const filters = {};

    if (workingTime) filters.workingTime = workingTime;
    if (jobLocation) filters.jobLocation = jobLocation;
    if (seniorityLevel) filters.seniorityLevel = seniorityLevel;
    if (jobTitle) filters.title = new RegExp(jobTitle, "i");
    if (technicalSkills)
      filters.technicalSkills = { $all: technicalSkills.split(",") };

    const jobs = await Job.find(filters);
    if (!jobs) return next(new AppError("no jobs are found", 404));
    return res.json({ message: "success", jobs });
  }
  return next(new AppError("Your Access is Denied", 403));
};
