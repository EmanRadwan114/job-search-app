import { Router } from "express";
import {
  addCompany,
  deleteCompany,
  getApplicationsForJob,
  getCompanyData,
  searchCompany,
  updateCompany,
} from "./company.controllers.js";

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
* searchCompany steps:
^ 1. check if the searcher is a company hr or user (signed up) or not registered 
^    (if he is authorized to search a company) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. find the company by its name (apply regex with i flag to cancel case sensitivity) that is sent in 
^    the query param to check if it is already existed or not and handle errors if there is any

^ 3. if there is no error, send the data of the searched company in the response
*/
companyRouter.get("/search", searchCompany);

/* 
* getApplicationsForJob steps:
^ 1. check if the user is a company hr (if he is authorized to add a company) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. find the company by its id that is sent in the req.params, then check if the companyHR the 
^    same person trying to access that application or not and handle any errors

^ 3. find job by id that is sent in the req.params in order to use it to get its specific applications

^ 4. find application by its assiociated job id and populate with company and user to get their info in the results

^ 5. update the name of userId & jobId keys and send the response
*/
companyRouter.get(
  "/:companyId/jobs/:jobId/applications",
  getApplicationsForJob
);

/* 
* updateCompany steps:
^ 1. check if the user is a company hr (if he is authorized to update a company) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. find the company by its id that is sent in the params to check if it is already existed or not and handle errors if there is any

^ 3. if there is no error, check that if the user is the company owner by comparing 
^    the ids of both the company owner and the user trying to update it, 
^    if both is the same, the user can update the company and see the response
*/
/* 
* deleteCompany steps:
^ 1. check if the user is a company hr (if he is authorized to update a company) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. find the company by its id that is sent in the params to check if it is already existed or not and handle errors if there is any

^ 3. if there is no error, check that if the user is the company owner by comparing 
^    the ids of both the company owner and the user trying to delet it, 
^    if both is the same, the user can delete the company and see the response
*/

/* 
* getCompanyData steps:
^ 1. check if the user is a company hr (if he is authorized to get a company data) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. find the company by its id that is sent in the params to check if it is already existed or not and handle errors if there is any

^ 3. if there is no error, send the data in the response
*/

companyRouter
  .route("/:companyId")
  .put(updateCompany)
  .delete(deleteCompany)
  .get(getCompanyData);

export default companyRouter;
