// * class created in order to inherit the Error class & to be able to customize the status code
// * so we can send the error message with the code
export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
