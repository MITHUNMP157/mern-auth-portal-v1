import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
connectDB();

//app.use(cors());
app.use(
  cors({
    origin: ["https://login-user-managements-system-client.onrender.com"], // your deployed frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Server running on 5000"));
