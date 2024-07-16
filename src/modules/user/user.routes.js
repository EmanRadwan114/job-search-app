import { Router } from "express";
import { signin, signup, verifyEmail } from "./user.controllers.js";
import checkEmailExists from "./../../middleware/checkEmailExists.middleware.js";
import sendMails from "../../utils/Emails/sendEmail.js";
import validateSchema from "./../../utils/validation/validate.js";
import { signInVal, signUpVal } from "./user.validation.js";

const userRouter = Router();

/*
* signup steps:
^ 1. validate data

^ 2. pass on the checkEmailExists middleware, to check if the email is already found or not
^    if the email is not found, then hash the password and add the value in the userName field, 
^    then go to the next step

^ 3. in the sign up fn ==> save the user data in the collection, and send a verification email
*/
userRouter.post("/signup", validateSchema(signUpVal), checkEmailExists, signup);

/*
* verifyEmail steps:
^ 1. create the email transporter in sendMails fn and also create a new token to be used 
^    in email verification

^ 2. when the user click on the verification link, this will make a get request that verifies 
^    the user token

^ 3. if the token is valid, we find the user email and mark it as confirmed in the database
*/
userRouter.get("/verify/:token", sendMails, verifyEmail);

/*
* signin steps:
^ 1. validate data

^ 2. search for the user by email provioded by req.body

^ 3. if user is not found, return unauthorized error msg

^ 4. if the user is found, create a token and send it in the response
*/
userRouter.post("/signin", validateSchema(signInVal), signin);

export default userRouter;
