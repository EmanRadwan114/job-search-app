import express from "express";
import cors from "cors";
import userRouter from "./../modules/user/user.routes.js";
import jobRouter from "./../modules/job/job.routes.js";
import companyRouter from "./../modules/company/company.routes.js";
import ApplicationRouter from "./../modules/application/application.routes.js";
import handleNotFoundError from "./../middleware/notfoundError.middleware.js";
import globalErrorHandler from "./../middleware/errorHandling.middleware.js";

export default function bootstrap(app) {
  // ^allow any domain to access my app endpoints
  app.use(cors());

  // ^parses the body of the request that includes JSON payload
  app.use(express.json());

  // ^handle app routes
  app.use("/auth", userRouter);
  app.use("/job", jobRouter);
  app.use("/company", companyRouter);
  app.use("/application", ApplicationRouter);

  // ^handles the response of any error in the app server
  app.use(globalErrorHandler);

  // ^handles not found error by passing the error to the globalErrorHandler
  app.use("*", handleNotFoundError);
}
