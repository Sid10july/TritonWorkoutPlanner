// server/src/index.ts

// import express from 'express';
// import mongoose from 'mongoose';

// import userRoutes from './routes/users';

// const app = express();

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Use user routes
// app.use('/users', userRoutes);

// // Connect to MongoDB
// mongoose
//   .connect('mongodb://localhost:27017/tritonworkoutplanner')
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });
// server/src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Register auth routes with the /auth prefix
app.use('/auth', authRoutes);

// Root route to test server
app.get('/', (req, res) => {
  res.send('Welcome to the Triton Workout Planner API');
});

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/tritonworkoutplanner';
mongoose
  .connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});