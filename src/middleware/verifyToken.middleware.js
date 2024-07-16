import jwt from "jsonwebtoken";
import catchError from "../utils/Handle Errrors/catchError.js";
// ^config .env
import dotenv from "dotenv";
dotenv.config();

// ^ used to make sure that the user is authorized by verifying its token that should be sent in the headers with any made request
const verifyToken = catchError((req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, process.env.SIGNIN_KEY, async (err, decoded) => {
      if (err) return new AppError("error in token validation", 409);

      req.user = decoded;
      next();
    });
  }
});

export default verifyToken;
