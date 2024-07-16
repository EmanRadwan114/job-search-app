import catchError from "./../../utils/Handle Errrors/catchError.js";
import Company from "./../../../database/models/company.model.js";
import AppError from "./../../utils/Handle Errrors/AppError.js";

export const addCompany = catchError(async (req, res, next) => {
  if (req.user.role !== "User") {
    let company = await Company.findOne({ companyName: req.body.companyName });
    if (company) return next(new AppError("Company is already found.", 409));

    const result = await Company.insertMany(req.body);

    return res.status(201).json({
      message: "company is added successfully",
      result,
    });
  }
  return next(
    new AppError("you are a user and you cannot not add a company.", 401)
  );
});

// ^ update company
export const updateCompany = catchError(async (req, res, next) => {
  if (req.user.role !== "User") {
    const company = await Company.findById({ _id: req.params.companyId });

    if (!company) return next(new AppError("company is not found", 404));

    if (company.companyHR !== req.user.userId)
      return next(
        new AppError("you are not authorized to update the company", 401)
      );

    const result = await Company.findByIdAndUpdate(
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
  return next(
    new AppError("you are a user and you cannot not update a company.", 401)
  );
});

// ^ delete company
export const deleteCompany = catchError(async (req, res, next) => {
  if (req.user.role !== "User") {
    const company = await Company.findById({ _id: req.params.companyId });

    if (!company) return next(new AppError("company is not found", 404));

    if (company.companyHR !== req.user.userId)
      return next(
        new AppError("you are not authorized to delete the company", 401)
      );

    const result = await Company.findByIdAndDelete({
      companyName: company.companyName,
    });
    return res.json({ message: "success", result });
  }
  return next(
    new AppError("you are a user and you cannot not delete a company.", 401)
  );
});

// ^getcompany data
export const getCompanyData = catchError(async (req, res, next) => {
  if (req.user.role !== "User") {
    const company = await Company.findById({
      _id: req.params.companyId,
    }).populate("jobs");
    if (!company) return next(new AppError("company is not found", 404));

    return res.json({ message: "success", company });
  }
  return next(
    new AppError("you are a user and you cannot not get the company data", 401)
  );
});

// ^ Search Compny
export const searchCompany = catchError(async (req, res, next) => {
  const { name } = req.query;

  if (req.user.role === "User" || req.user.role === "Company_HR") {
    const companies = await Company.find({
      companyName: new RegExp(name, "i"),
    });

    return res.json({ message: "success", companies });
  }
  return next(
    new AppError("Your Role cannot allow you to search for a company", 401)
  );
});
