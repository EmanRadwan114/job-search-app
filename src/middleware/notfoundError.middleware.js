import AppError from "../utils/Handle Errrors/AppError.js";

// ^ handle unfound routes
export default function handleNotFoundError(req, res, next) {
  next(new AppError(`route is not found ${req.originalUrl}`, 404));
}
