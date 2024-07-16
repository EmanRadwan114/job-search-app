import AppError from "./../Handle Errrors/AppError.js";

// * used to validate any created schema by passing the schema to it to only store
// * valid data or return the error if there is any
const validateSchema = (schema) => {
  return (req, res, next) => {
    let { error } = schema.validate(req.body, { abortEarly: false });

    if (!error) {
      next();
    } else {
      let errorMsgs = error.details.map((err) => err.message);
      next(new AppError(errorMsgs, 409));
    }
  };
};

export default validateSchema;
