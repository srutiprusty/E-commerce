import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import productroutes from "./routes/Products.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", productroutes);

//connect to server and database
app.listen(PORT, async () => console.log(`Server is running on port ${PORT}`));

mongoose
  .connect(MONGO_URL, console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
