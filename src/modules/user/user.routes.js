import { Router } from "express";
import { signin, signup, verifyEmail } from "./user.controllers.js";
import checkEmailExists from "./../../middleware/checkEmailExists.middleware.js";
import sendMails from "../../utils/Emails/sendEmail.js";

const userRouter = Router();

/*
* signup steps:
^ 1. pass on the checkEmailExists middleware, to check if the email is already found or not
^    if the email is not found, then hash the password and add the value in the userName field, 
^    then go to the next step

^ 2. in the sign up fn ==> save the user data in the collection, and send a verification email
*/
userRouter.post("/signup", checkEmailExists, signup);

/*
* verifyEmail steps:
^ 1. create the email transporter in sendMails fn and also create a new token to be used 
^    in email verification

^ 2. when the user click on the verification link, this will make a get request that verifies 
^    the user token

^ 3. if the token is valid, we find the user email and mark it as confirmed in the database
*/
userRouter.get("/verify/:token", sendMails, verifyEmail);
userRouter.post("/signin", signin);

export default userRouter;
