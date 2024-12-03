import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import UserGoal, { IUserGoal } from "../models/Progress";
import User, { IUser } from "../models/User";

const router = Router();

// POST /userGoals - Create a new user goal
// router.post("/", async (req: Request, res: Response) => {
//   const {
//     user,
//     goalType,
//     targetValue,
//     currentValue,
//     unit,
//     startDate,
//     endDate,
//     description,
//   } = req.body;

//   try {
//     // Validate that 'user' is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(user)) {
//       return res.status(400).json({ error: "Invalid user ID" });
//     }

//     const newUserGoal: IUserGoal = new UserGoal({
//       user,
//       goalType,
//       targetValue,
//       currentValue,
//       unit,
//       startDate,
//       endDate,
//       description,
//     });

//     await newUserGoal.save();

//     res.status(201).json({
//       message: "User goal created successfully",
//       userGoal: newUserGoal,
//     });
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// });

// GET /userGoals - Retrieve all user goals
// router.get("/", async (req: Request, res: Response) => {
//   try {
//     const userGoals = await UserGoal.find().populate("user", "username email");
//     res.json(userGoals);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// GET /userGoals/:id - Retrieve a user goal by ID
// router.get("/:id", async (req: Request, res: Response) => {
//   try {
//     const userGoal = await UserGoal.findById(req.params.id).populate(
//       "user",
//       "username email"
//     );
//     if (!userGoal) {
//       return res.status(404).json({ message: "User goal not found" });
//     }
//     res.json(userGoal);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// PUT /userGoals/:id - Update a user goal
// router.put("/:id", async (req: Request, res: Response) => {
//   const { goalType, targetValue, currentValue, unit, endDate, description } =
//     req.body;

//   try {
//     const updatedUserGoal = await UserGoal.findByIdAndUpdate(
//       req.params.id,
//       {
//         goalType,
//         targetValue,
//         currentValue,
//         unit,
//         endDate,
//         description,
//       },
//       { new: true }
//     );

//     if (!updatedUserGoal) {
//       return res.status(404).json({ message: "User goal not found" });
//     }

//     res.json({
//       message: "User goal updated successfully",
//       userGoal: updatedUserGoal,
//     });
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// });

// DELETE /userGoals/:id - Delete a user goal
// router.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     const deletedUserGoal = await UserGoal.findByIdAndDelete(req.params.id);
//     if (!deletedUserGoal) {
//       return res.status(404).json({ message: "User goal not found" });
//     }

//     res.json({ message: "User goal deleted successfully" });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// POST /progress/:userId - Add a progress update to a user goal
router.post("/:userId", async (req: Request, res: Response) => {
  const { date, goals } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add progress update to the database
    user.progressUpdates.push({ date: date, goals: goals });
    await user.save();

    res.status(200).json(user.progressUpdates);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// GET /progress/:userId - Get all progress updates for a user goal
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get progress updates
    res.status(200).json(user.progressUpdates);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /progress/:userId - Delete all progress updates for a user goal
router.delete("/:userId", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete progress updates
    user.progressUpdates = [];
    await user.save();

    res.status(200).json(user.progressUpdates);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
