import catchError from "./../../utils/Handle Errrors/catchError.js";
import Company from "./../../../database/models/company.model.js";

export const addCompany = catchError(async (req, res, next) => {
  if (req.user.role === "Company_HR") {
    let company = await Company.findOne(req.body.companyName);
    if (company) next(new AppError("ompany is already found.", 409));

    const result = await Company.insertMany(req.body);

    res.status(201).json({
      message: "company is added successfully",
      result,
    });
  } else {
    next(new AppError("you are not authorized to add a company.", 401));
  }
});

// ^ update company
export const updateCompany = catchError(async (req, res, next) => {
  if (req.user.role === "Company_HR") {
    const company = await Company.findById(req.params.companyName);

    if (!company) next(new AppError("company is not found", 404));

    if (company.companyHR !== req.user.userId)
      return next(
        new AppError("you are not authorized to update a company", 401)
      );

    const result = await Company.findByIdAndUpdate(
      company.companyName,
      req.body,
      {
        new: true,
      }
    );
    res.json({ message: "success", result });
  }
});
