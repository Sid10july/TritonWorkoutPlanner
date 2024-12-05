// import express, { Request, Response } from "express";
// import mongoose from "mongoose";
// import authRoutes from "./routes/auth";
// import userRoutes from "./routes/users";
// import workoutPlanRoutes from './routes/workoutPlans';
// import goalsRoutes from "./routes/goals"; // Import goals route
// import cors from "cors";

// import { createLoginEndpoints } from "./login/login-endpoints";
// import { createWorkoutEndpoints } from "./workouts/workout-endpoints";
// import { initializeDatabase } from "./createDB";

// const app = express();

// require("dotenv").config();

// // Middleware to parse JSON bodies
// app.use(cors());
// app.use(express.json());

// // Add debug middleware here
// app.use((req, res, next) => {
//     console.log(`Request received: ${req.method} ${req.url}`);
//     next();
// });

// // Use user routes
// app.use("/users", userRoutes);
// app.use("/workoutPlans", workoutPlanRoutes);

// // Register auth routes with the /auth prefix
// app.use("/auth", authRoutes);

// // Register goals routes with the /api/goals prefix
// app.use("/api/goals", goalsRoutes);

// // Root route to test server
// (async () => {
//     // Connect to MongoDB
//     const db = await initializeDatabase();
//     createLoginEndpoints(app, db);
//     createWorkoutEndpoints(app);
//     app.get("/", (req: Request, res: Response) => {
//         res.send({ Hello: "World" });
//         res.status(200);
//     });
// })();

// // Connect to MongoDB
// const mongoURI = "mongodb://localhost:27017/tritonworkoutplanner";
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Start the server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });


// import express, { Request, Response } from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';

// import authRoutes from './routes/auth';
// import userRoutes from './routes/users';
// import workoutPlanRoutes from './routes/workoutPlans';
// import goalsRoutes from './routes/goals';

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
import streakRoutes from "./routes/streaks";
import workoutPlanRoutes from "./routes/workoutPlans";
import progressRoutes from "./routes/progress";
import goalsRoutes from "./routes/goals"; // Import goals route
import cors from "cors";

import { createLoginEndpoints } from "./login/login-endpoints";
import { createWorkoutEndpoints } from "./workouts/workout-endpoints";
import { initializeDatabase } from "./createDB";

const app = express();
require('dotenv').config();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Global middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.originalUrl}`);
    next();
});

// Register user and workoutPlan routes
app.use('/users', userRoutes);
app.use('/api/workouts', workoutPlanRoutes);

// Register streak routes with the /streaks prefix
app.use("/streaks", streakRoutes);

// Register progress routes with the /progress prefix
app.use("/progress", progressRoutes);

// Register goals routes with the /api/goals prefix
app.use("/api/goals", goalsRoutes);

app.use("/auth",authRoutes);


// Initialize custom endpoints for pulling workouts from external API
(async () => {
    const db = await initializeDatabase();
    createLoginEndpoints(app, db);
    createWorkoutEndpoints(app); // Add external API endpoints under `/workouts`

    // Root route to test server
    app.get('/', (req: Request, res: Response) => {
        res.send({ message: 'Server is running' });
    });
})();

// MongoDB connection
const mongoURI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@tritonworkoutplanner.wzohk.mongodb.net/?retryWrites=true&w=majority&appName=TritonWorkoutPlanner`;
mongoose
    .connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});