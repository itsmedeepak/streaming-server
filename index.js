import dotenv from "dotenv";
import express from 'express';
import cors from "cors";
import connectDB from "./config/db.js"; // Adjust the path if needed
import authRoutes from "./routes/auth.js";
import streamRoutes from "./routes/stream.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stream", streamRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
