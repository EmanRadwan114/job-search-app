import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    companyName: {
      type: String,
      required: [true, "company name is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    industry: {
      type: String,
      required: [true, "industry is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    numberOfEmployees: {
      type: String,
      required: [true, "number Of Employees is required"],
      enem: [
        "1-10",
        "11-20",
        "21-50",
        "51-100",
        "101-200",
        "201-500",
        "501-1000",
        "1001+",
      ],
    },
    companyEmail: {
      type: String,
      required: [true, "company email is required"],
      unique: true,
    },
    companyHR: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Company HR Id is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", schema);

export default Company;
