import { Router } from "express";
import { addCompany, updateCompany } from "./company.controllers.js";

const companyRouter = Router();

/* 
* addCompany steps:
^ 1. check if the user is a company hr (if he is authorized to add a company) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. find the company by its name to check if it is already existed or not and handle errors if there is any

^ 3. if there is no error, and the user is authorized, then add the company to the database and send the response
*/

companyRouter.post("/", addCompany);
/* 
* updateCompany steps:
^ 1. check if the user is a company hr (if he is authorized to update a company) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. find the company by its name to check if it is already existed or not and handle errors if there is any

^ 3. if there is no error, check that the user is the company owner by comparing 
^    the ids of both the company owner and the user trying to update it, 
^    if both is the same, the user can update the company and see the response
*/

companyRouter.put("/:companyName", updateCompany);

export default companyRouter;
