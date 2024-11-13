import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/users';
import workoutPlanRoutes from './routes/workoutPlans';


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use user routes
app.use('/users', userRoutes);
app.use('/workoutPlans', workoutPlanRoutes);


// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/tritonworkoutplanner')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});