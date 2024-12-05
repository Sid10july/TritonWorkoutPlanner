import express from "express";
import User from "../models/User";

const router = express.Router();

// GET /streaks/:userId - Retrieve streak data
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({username:req.params.userId});
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user.streak);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving streaks", error });
  }
});

// PATCH /streaks/:userId/increment - Increase streak data
router.patch("/:userId/increment", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({username:userId});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.streak++; // Increment streak
    await user.save();
    res.status(200).json(user.streak);
  } catch (error) {
    res.status(500).json({ message: "Error updating streak", error });
  }
});

// PATCH /streaks/:userId/reset - Reset streak data
router.patch("/:userId/reset", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({username:userId});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.streak = 0; // Reset streak
    await user.save();
    res.status(200).json(user.streak);
  } catch (error) {
    res.status(500).json({ message: "Error updating streak", error });
  }
});

export default router;
