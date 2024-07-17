import { Router } from "express";
import {
  addJob,
  applyForJob,
  deleteJob,
  filterJobs,
  getAllJobs,
  getCompanyJobs,
  updateJob,
} from "./job.controllers.js";
import { uploadSingleFile } from "../../utils/File Uploads/fileUpload.js";

const jobRouter = Router();

/* 
* addJob steps:
^ 1. check if the user is a company hr (if he is authorized to add a company) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. handle any error

^ 3. add the job as a collection in the database, then send the response
*/

/*
* getAllJobs steps:
^ 1. check if the searcher is a company hr or user (signed up) or not registered 
^    (if he is authorized to search a company) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. get all jobs and populate it with the addedBy field in order to get the job's company info

^ 3. errors are handled and the user can see the response
*/

jobRouter.route("/").post(addJob).get(getAllJobs);

/*
* getCompanyJobs steps:
^ 1. check if the searcher is a company hr or user (signed up) or not registered 
^    (if he is authorized to search a company) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. search in Company model by name in which the name is provide in the query params, then handle any error when found

^ 3. after getting company details, find all jobs that are posted by the Company (using HR id) and hand;le any error when found

^ 4. send the response
*/

jobRouter.get("/company", getCompanyJobs);

/*
* filterJobs steps:
^ 1. check if the searcher is a company hr or user (signed up) or not registered 
^    (if he is authorized to filter jobs) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. get all filteration queries from the query param to find the matched job

^ 3. find any matched jobs and handle errors if there is any

^ 4. send the response
*/
jobRouter.get("/filter", filterJobs);

/*
* filterJobs steps:
^ 1. check if the searcher is a user  or not by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. allow multer to handle file storage and data parsing by applying the uploadSingleFile middleware

^ 4. add the filename (added to req.file by multer) to the userResume field in the dadatabase schema, 
^    so we save only the filename in the database

^ 5. insert the application in the database and handle errors if there is any

^ 6. send the response
*/
jobRouter.post("/apply", uploadSingleFile("resume"), applyForJob);

/* 
* updateJob steps:
^ 1. check if the user is a company hr (if he is authorized to update a company) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. find the job by its id that is sent in the params to check if it is already existed or not and handle errors if there is any

^ 3. if there is no error, check that if the user is the job owner by comparing 
^    the ids of both the job owner and the user trying to update it, 
^    if both is the same, the user can update the job and see the response
*/
/* 
* deleteJob steps:
^ 1. check if the user is a company hr (if he is authorized to update a company) by checking the role added 
^    to the req.user at the verify token middleware after token verification

^ 2. find the job by its id that is sent in the params to check if it is already existed or not and handle errors if there is any

^ 3. if there is no error, check that if the user is the job owner by comparing 
^    the ids of both the job owner and the user trying to delete it, 
^    if both is the same, the user can delete the job and see the response
*/

jobRouter.route("/:jobId").put(updateJob).delete(deleteJob);

export default jobRouter;
