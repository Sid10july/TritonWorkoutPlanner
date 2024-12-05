// import express from 'express';
// import User from '../models/User';

// const router = express.Router();

// // GET /api/goals/:userId - Retrieve all goals for a user
// router.get('/:userId', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user.goals); // Accessing 'goals' directly
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving goals', error });
//   }
// });

// // POST /api/goals/:userId - Add a new goal for a user
// router.post('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const { goal, value } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Add the new goal
//     user.goals.push({ goal, value });
//     await user.save();

//     res.status(201).json(user.goals);
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding goal', error });
//   }
// });

// // DELETE /api/goals/:userId/:goalId - Delete a specific goal for a user
// router.delete('/:userId/:goalId', async (req, res) => {
//   const { userId, goalId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Remove the goal by filtering it out
//     user.goals = user.goals.filter((goal) => goal._id?.toString() !== goalId);
//     await user.save();

//     res.status(200).json(user.goals);
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting goal', error });
//   }
// });

// export default router;
import express from "express";
import User from "../models/User";

const router = express.Router();

// GET /api/goals/:userId - Retrieve all goals for a user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({username:req.params.userId});
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.goals);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving goals", error });
  }
});

// POST /api/goals/:userId - Add a goal
router.post("/:userId", async (req, res) => {
  const { goal, value } = req.body;
  try {
    const user = await User.findOne({username:req.params.userId});
    if (!user) return res.status(404).json({ message: "User not found" });

    const newGoal = { goal, value };
    user.goals.push(newGoal);
    await user.save();
    res.status(201).json(user.goals);
  } catch (error) {
    res.status(500).json({ message: "Error adding goal", error });
  }
});

// DELETE /api/goals/:userId/:goalId - Delete a goal
router.delete("/:userId/:goalId", async (req, res) => {
  try {
    const user = await User.findOne({username:req.params.userId});
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure TypeScript knows _id is defined
    user.goals = user.goals.filter(
      (goal) => goal._id?.toString() !== req.params.goalId
    );
    await user.save();
    res.status(200).json(user.goals);
  } catch (error) {
    res.status(500).json({ message: "Error deleting goal", error });
  }
});

// PUT /api/goals/:userId/:goalId - Modify a goal's value
router.put("/:userId/:goalId", async (req, res) => {
  try {
    const goalId = req.params.goalId;
    const { value } = req.body;

    console.log(goalId);

    const user = await User.findOne({username:req.params.userId});
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update goal
    user.goals.forEach((goal) => {
      if (goalId === goal._id?.toString()) {
        goal.value = value;
      }
    });

    await user.save();
    res.status(200).json(user.goals);
  } catch (error) {
    res.status(500).json({ message: "Error updating goal", error });
  }
});

export default router;
