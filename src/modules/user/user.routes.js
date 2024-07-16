import { Router } from "express";
import {
  deleteAccount,
  getAccountsByRecoveryEmail,
  getProfileData,
  getUserAccountData,
  updateAccount,
  updatePassword,
} from "./user.controllers.js";

const userRouter = Router();

// ? verifyToken middleware in used in the app.use in the bootstrap file to serve the whole application
/*
* updateAccount steps:
^ 1. verify token and send its payload in req.user

^ 2. find user by id, and check if the new email / mobile no will make a conflict with other accounts or 
^    not and handle any error if there is a conflict

^ 3. make sure that the user is only updating his account by comparing between the userId in the token passed to 
^    req.user from the verified token middleware, and if they are equal then update the account
*/

/*
* deletAccount steps:
^ 1. verify token and send its payload in req.user

^ 2. find user by id, and handle the errors if there is any

^ 3. make sure that the user is only deleting his account by find and delete only by 
^    the id sent in the verified token payload
*/

/*
* getUserAccountData steps:
^ 1. verify token and send its payload in req.user

^ 2. find user by id, and handle the errors if there is any

^ 3. make sure that the user is only getting his account by find only by 
^    the id sent in the verified token payload
*/

userRouter
  .route("/")
  .put(updateAccount)
  .delete(deleteAccount)
  .get(getUserAccountData);

/*
* getProfileData steps:
^ 1. send userId in the params

^ 2. find user by id, and handle the errors if there is any

^ 3. return the result in the response
*/
userRouter.get("profile/:userId", getProfileData);

/*
* updatePassword steps:
^ 1. verify token and send its payload in req.user

^ 2. find user by id, and handle the errors if there is any

^ 3. make sure that the user is only updating the password of his account by find only by 
^    the id sent in the verified token payload
*/

userRouter.put("/update-password", updatePassword);

/*
* getAccountsByRecoveryEmail steps:
^ 1. find user by recovery email which is sent in the params, and handle the errors if there is any

^ 2. send the response
*/

userRouter.get("/recovery-email/:recoveryEmail", getAccountsByRecoveryEmail);

export default userRouter;
