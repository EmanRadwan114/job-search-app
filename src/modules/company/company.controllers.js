import catchError from "./../../utils/Handle Errrors/catchError.js";
import Company from "./../../../database/models/company.model.js";
import AppError from "./../../utils/Handle Errrors/AppError.js";
import Application from "../../../database/models/application.model.js";
import Job from "./../../../database/models/job.model.js";

// ^add company
export const addCompany = catchError(async (req, res, next) => {
  if (req.user.role === "Company_HR") {
    let company = await Company.findOne({ companyName: req.body.companyName });
    if (company) return next(new AppError("Company is already found.", 409));

    const result = await Company.insertMany(req.body);

    return res.status(201).json({
      message: "company is added successfully",
      result,
    });
  }
  return next(new AppError("Your Access is Denied", 403));
});

// ^ update company
export const updateCompany = catchError(async (req, res, next) => {
  if (req.user.role === "Company_HR") {
    const company = await Company.findById(req.params.companyId);

    if (!company) return next(new AppError("company is not found", 404));

    if (company.companyHR.toString() !== req.user.userId)
      return next(new AppError("Your Access is Denied", 403));

    const result = await Company.findOneAndUpdate(
      {
        companyName: company.companyName,
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

// ^ delete company
export const deleteCompany = catchError(async (req, res, next) => {
  if (req.user.role === "Company_HR") {
    const company = await Company.findById(req.params.companyId);

    if (!company) return next(new AppError("company is not found", 404));

    if (company.companyHR.toString() !== req.user.userId)
      return next(new AppError("Your Access is Denied", 403));

    const result = await Company.findOneAndDelete({
      companyName: company.companyName,
    });
    return res.json({ message: "success", result });
  }
  return next(new AppError("Your Access is Denied", 403));
});

// ^getcompany data
export const getCompanyData = catchError(async (req, res, next) => {
  if (req.user.role === "Company_HR") {
    const company = await Company.findById(req.params.companyId).populate(
      "companyHR",
      ["userName", "email"]
    );

    if (!company) return next(new AppError("company is not found", 404));

    return res.json({ message: "success", company });
  }
  return next(new AppError("Your Access is Denied", 403));
});

// ^ Search Compny
export const searchCompany = catchError(async (req, res, next) => {
  const { name } = req.query;

  if (req.user.role === "User" || req.user.role === "Company_HR") {
    const companies = await Company.find({
      companyName: new RegExp(name, "i"),
    });

    if (!companies || companies.length === 0)
      return next(new AppError("no companies found", 404));

    return res.json({ message: "success", companies });
  }
  return next(new AppError("Your Access is Denied", 403));
});

// ^ get all applications of a specific job
export const getApplicationsForJob = catchError(async (req, res, next) => {
  if (req.user.role === "Company_HR") {
    const company = await Company.findById(req.params.companyId);

    if (!company) return next(new AppError("company is not found", 404));

    if (company.companyHR.toString() !== req.user.userId)
      return next(new AppError("Your Access is Denied", 403));

    const job = await Job.findById(req.params.jobId);
    if (!job) return next(new AppError("job is not found", 404));

    let applications = await Application.find({ jobId: job._id })
      .populate("jobId", ["jobTitle"])
      .populate("userId", ["userName", "email"]);

    if (!applications || applications.length === 0)
      return next(new AppError("no applications found", 404));

    applications = applications.map((app) => {
      const application = {
        userData: app.userData,
        jobData: app.jobData,
        app: app,
      };
      app.jobId = undefined;
      app.userId = undefined;
      return application;
    });

    return res.json({ message: "success", applications });
  }
  return next(new AppError("Your Access is Denied", 403));
});
