import dotenv from "dotenv";
dotenv.config(); // MUST be first

import app from "./app";
import { connectDB } from "./config/db";

const startServer = async () => {
  await connectDB();

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
};

startServer();