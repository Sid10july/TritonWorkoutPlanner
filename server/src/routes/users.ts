// import { Router, Request, Response } from 'express';
// import User, { IUser } from '../models/User';

// const router = Router();

// // POST /users - Add a new user
// router.post('/', async (req: Request, res: Response) => {
//   const { username, email, password } = req.body;

//   try {
//     // Create and save the new user
//     const newUser: IUser = new User({ username, email, password });
//     await newUser.save();

//     res.status(201).json({ message: 'User added successfully', user: newUser });
//   } catch (error: any) {
//     // Handle errors (e.g., duplicate entries, validation errors)
//     res.status(400).json({ error: error.message });
//   }
// });

// // GET /users - Retrieve all users (optional)
// router.get('/', async (req: Request, res: Response) => {
//   try {
//     const users: IUser[] = await User.find();
//     res.json(users);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Additional routes can be added here

// export default router;

// server/src/routes/users.ts
// import express from 'express';
// import User from '../models/User';

// const router = express.Router();

// // GET /users - Retrieve all users (for testing purposes)
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching users' });
//   }
// });

// export default router;
import express from "express";
import User from "../models/User";

const router = express.Router();

// GET /users/:userId - Retrieve user data
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select("-password"); // Exclude the password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
});

// PATCH /users/:userId/goals - Update user goals
router.patch("/:userId/goals", async (req, res) => {
  const { userId } = req.params;
  const { goals } = req.body; // Expect an array of goals
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.goals = goals; // Overwrite the current goals
    await user.save();
    res.status(200).json(user.goals);
  } catch (error) {
    res.status(500).json({ message: "Error updating goals", error });
  }
});

export default router;
