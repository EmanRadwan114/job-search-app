import joi from "joi";

const signUpVal = joi.object({
  firstName: joi.string().min(3).required(),
  lastName: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^[A-Za-z0-9]{6,}$/)
    .required(),
  recoveryEmail: joi.string().email().required(),
  DOB: joi
    .string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  mobileNumber: joi
    .string()
    .pattern(/^(\+2){0,1}01[0125][0-9]{8}$/)
    .required(),
  role: joi.string().required(),
  status: joi.string(),
});

const signInVal = joi.object({
  email: joi.string().email(),
  recoveryEmail: joi.string().email(),
  mobileNumber: joi.string().pattern(/^(\+2){0,1}01[0125][0-9]{8}$/),
  password: joi
    .string()
    .pattern(/^[A-Za-z0-9]{6,}$/)
    .required(),
});

export { signInVal, signUpVal };
