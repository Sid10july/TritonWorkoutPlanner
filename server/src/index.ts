// import express from 'express';
// import mongoose from 'mongoose';
// import authRoutes from './routes/auth';

// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Register auth routes with the /auth prefix
// app.use('/auth', authRoutes);

// // Root route to test server
// app.get('/', (req, res) => {
//   res.send('Welcome to the Triton Workout Planner API');
// });

// // Connect to MongoDB
// const mongoURI = 'mongodb://localhost:27017/tritonworkoutplanner';
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// import express from 'express';
// import mongoose from 'mongoose';
// import authRoutes from './routes/auth';
// import cors from 'cors';

// const app = express(); // Initialize app here first

// // Enable CORS middleware
// app.use(cors());

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Register auth routes with the /auth prefix
// app.use('/auth', authRoutes);

// // Root route to test server
// app.get('/', (req, res) => {
//   res.send('Welcome to the Triton Workout Planner API');
// });

// // Connect to MongoDB
// const mongoURI = 'mongodb://localhost:27017/tritonworkoutplanner';
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import authRoutes from './routes/auth';
// import goalRoutes from './routes/goals'; // Import the goals routes

// const app = express();

// // Enable CORS middleware
// app.use(cors());

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Register routes
// app.use('/auth', authRoutes);
// app.use('/api/goals', goalRoutes); // Mount the goals route

// // Root route to test server
// app.get('/', (req, res) => {
//   res.send('Welcome to the Triton Workout Planner API');
// });

// // Connect to MongoDB
// const mongoURI = 'mongodb://localhost:27017/tritonworkoutplanner';
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import workoutPlanRoutes from "./routes/workoutPlans";
import goalsRoutes from "./routes/goals"; // Import goals route
import cors from "cors";

import { createLoginEndpoints } from "./login/login-endpoints";
import { createWorkoutEndpoints } from "./workouts/workout-endpoints";
import { initializeDatabase } from "./createDB";

const app = express();

require("dotenv").config();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Use user routes
app.use("/users", userRoutes);
app.use("/workoutPlans", workoutPlanRoutes);

// Register auth routes with the /auth prefix
app.use("/auth", authRoutes);

// Register goals routes with the /api/goals prefix
app.use("/api/goals", goalsRoutes);

// Root route to test server
(async () => {
  // Connect to MongoDB
  const db = await initializeDatabase();
  createLoginEndpoints(app, db);
  createWorkoutEndpoints(app);
  app.get("/", (req: Request, res: Response) => {
    res.send({ Hello: "World" });
    res.status(200);
  });
})();
// Connect to MongoDB
const mongoURI = "mongodb://localhost:27017/tritonworkoutplanner";
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
