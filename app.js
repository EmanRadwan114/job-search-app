process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// ^handle programming err
process.on("uncaughtException", (err) =>
  console.log("there is a programming error", err)
);
// ^config .env
import dotenv from "dotenv";
dotenv.config();

// ^imports
import express from "express";
import "./database/dbConnection.js";
import bootstrap from "./src/utils/bootstrap.js";

// ^creates an app server
const app = express();
const PORT = process.env.PORT || 3000;

// ^includes any app.use()
bootstrap(app);

// ^handle err outside express
process.on("unhandledRejection", (err) =>
  console.log("there is an error outside express", err)
);

// ^listen on any connection on the specified PORT
app.listen(PORT, (err) => {
  if (err) console.log("there is an error in the server", err);
});
