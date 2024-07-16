import AppError from "../utils/Handle Errrors/AppError.js";

export default function handleNotFoundError(req, res, next) {
  next(new AppError(`route is not found ${req.originalUrl}`, 404));
}
