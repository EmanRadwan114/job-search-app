// ^ used to handle error in any endpoint controller by passing the error
// ^  to the global error handling middleware to send a proper response

export default function catchError(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
}
