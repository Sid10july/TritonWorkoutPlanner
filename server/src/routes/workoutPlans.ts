import express from "express";
import {WeeklyPlans} from "../models/DailyWorkoutPlan"

const router = express.Router();

// POST: Retrieve a user's workout plan
router.post("/", async (req, res) => {
    const { username } = req.body; // Read username from request body
  
    // Default state
    const defaultState = [
      { day: "Monday", exercises: [], startTime: "00:00", endTime: "00:00" },
      { day: "Tuesday", exercises: [], startTime: "00:00", endTime: "00:00" },
      { day: "Wednesday", exercises: [], startTime: "00:00", endTime: "00:00" },
      { day: "Thursday", exercises: [], startTime: "00:00", endTime: "00:00" },
      { day: "Friday", exercises: [], startTime: "00:00", endTime: "00:00" },
      { day: "Saturday", exercises: [], startTime: "00:00", endTime: "00:00" },
      { day: "Sunday", exercises: [], startTime: "00:00", endTime: "00:00" },
    ];
  
    try {
      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }
  
      const user = await WeeklyPlans.findOne({ username });
  
      if (!user) {
        // Return default state if user not found
        return res.status(200).json(defaultState);
      }
      console.log(user.weeklyWorkoutPlan);
      res.json(user.weeklyWorkoutPlan);
    } catch (error: any) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

// POST: Save or update a user's workout plan
router.put("/", async (req, res) => {
    console.log(`Received request`);
    const { username, weeklyWorkoutPlan } = req.body;
  
    if (!username || !weeklyWorkoutPlan) {
      return res.status(400).json({ message: "Username and weeklyWorkoutPlan are required" });
    }
  
    try {
      const user = await WeeklyPlans.findOne({ username });
  
      if (!user) {
        // Create a new user with the workout plan
        const newUser = new WeeklyPlans({ username, weeklyWorkoutPlan });
        await newUser.save();
        return res.status(201).json({ message: "Workout plan created", user: newUser });
      }
  
      // Update the existing user's workout plan
      user.weeklyWorkoutPlan = weeklyWorkoutPlan; // TypeScript will now recognize this correctly
      await user.save();
      res.status(200).json({ message: "Workout plan updated", user });
    } catch (error: any) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
  

export default router;
