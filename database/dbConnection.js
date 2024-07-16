// ^config .env
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

// ^starting connection with the mongodb through mongoose
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error in database connection", err));
