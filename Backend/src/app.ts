import express from "express";
import cors from "cors";
// import cors from "cors";
// import {connectDB} from "./config/db"
import path from "path";


import authRoutes from "./routes/authRoutes";
import fileRoutes from "./routes/fileRoutes";
const app = express();
// connectDB();

app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "public", "uploads")
  )
);
// app.use("", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);




export default app;