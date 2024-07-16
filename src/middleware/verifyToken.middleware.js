import jwt from "jsonwebtoken";

// ^config .env
import dotenv from "dotenv";
dotenv.config();

import catchError from "../utils/Handle Errrors/catchError.js";
import AppError from "./../utils/Handle Errrors/AppError.js";

// ^ used to make sure that the user is authorized by verifying its token that should be sent in the headers with any made request
const verifyToken = catchError(async (req, res, next) => {
  const { token } = req.headers;

  jwt.verify(token, process.env.SIGNIN_KEY, async (err, decoded) => {
    if (err) return next(new AppError("error in token validation", 409));

    req.user = decoded;
    next();
  });
});

export default verifyToken;
