// ^ express global error handle middleware to send an error response with status code
export default function globalErrorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message, statusCode });
}
