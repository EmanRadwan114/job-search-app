// ^handle programming err
process.on("uncaughtException", (err) =>
  console.log("there is a programming error", err)
);

import express from "express";
import { globalErrorHandler } from "./src/middleware/errorHandling.middleware.js";
import { handleNotFoundError } from "./src/middleware/notfoundError.middleware.js";

// ^creates an app server
const app = express();
const PORT = process.env.PORT || 3000;

// ^parses the body of the request that includes JSON payload
app.use(express.json());

// ^handles not found error by passing the error to the globalErrorHandler
app.use("*", handleNotFoundError);

// ^handles the response of any error in the app server
app.use(globalErrorHandler);

// ^handle err outside express
process.on("unhandledRejection", (err) =>
  console.log("there is an error outside express", err)
);

// ^listen on any connection on the specified PORT
app.listen(PORT, (err) => {
  if (err) console.log("there is an error in the server", err);
});
