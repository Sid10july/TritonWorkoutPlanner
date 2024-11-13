import mongoose from 'mongoose';

import userRoutes from './routes/users';
import workoutPlanRoutes from './routes/workoutPlans';

import express, { Request, Response } from 'express';
import { createLoginEndpoints } from './login/login-endpoints';
import { initializeDatabase } from './createDB';

const app = express();
const cors = require("cors");

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Use user routes
app.use('/users', userRoutes);
app.use('/workoutPlans', workoutPlanRoutes);

// app.use('/users', userRoutes);

const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

(async () => {
    // Connect to MongoDB
    const db = await initializeDatabase();
    createLoginEndpoints(app,db);
    app.get("/",(req:Request, res: Response)=>{
        res.send({"Hello":"World"});
        res.status(200);
    })

})();

export default app;