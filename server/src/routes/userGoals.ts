import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import UserGoal, { IUserGoal } from '../models/UserGoal';
import User, { IUser } from '../models/User';

const router = Router();

// POST /userGoals - Create a new user goal
router.post('/', async (req: Request, res: Response) => {
  const {
    user,
    goalType,
    targetValue,
    currentValue,
    unit,
    startDate,
    endDate,
    description,
  } = req.body;

  try {
    // Validate that 'user' is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const newUserGoal: IUserGoal = new UserGoal({
      user,
      goalType,
      targetValue,
      currentValue,
      unit,
      startDate,
      endDate,
      description,
    });

    await newUserGoal.save();

    res.status(201).json({
      message: 'User goal created successfully',
      userGoal: newUserGoal,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// GET /userGoals - Retrieve all user goals
router.get('/', async (req: Request, res: Response) => {
  try {
    const userGoals = await UserGoal.find().populate('user', 'username email');
    res.json(userGoals);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /userGoals/:id - Retrieve a user goal by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const userGoal = await UserGoal.findById(req.params.id).populate('user', 'username email');
    if (!userGoal) {
      return res.status(404).json({ message: 'User goal not found' });
    }
    res.json(userGoal);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /userGoals/:id - Update a user goal
router.put('/:id', async (req: Request, res: Response) => {
  const {
    goalType,
    targetValue,
    currentValue,
    unit,
    endDate,
    description,
  } = req.body;

  try {
    const updatedUserGoal = await UserGoal.findByIdAndUpdate(
      req.params.id,
      {
        goalType,
        targetValue,
        currentValue,
        unit,
        endDate,
        description,
      },
      { new: true }
    );

    if (!updatedUserGoal) {
      return res.status(404).json({ message: 'User goal not found' });
    }

    res.json({
      message: 'User goal updated successfully',
      userGoal: updatedUserGoal,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /userGoals/:id - Delete a user goal
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedUserGoal = await UserGoal.findByIdAndDelete(req.params.id);
    if (!deletedUserGoal) {
      return res.status(404).json({ message: 'User goal not found' });
    }

    res.json({ message: 'User goal deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /userGoals/:id/progress - Add a progress update to a user goal
router.post('/:id/progress', async (req: Request, res: Response) => {
  const { date, value, notes } = req.body;

  try {
    const userGoal = await UserGoal.findById(req.params.id).populate('user') as IUserGoal;
    if (!userGoal) {
      return res.status(404).json({ message: 'User goal not found' });
    }

    // Ensure userGoal.user is populated
    // if (!userGoal.user || !(userGoal.user instanceof mongoose.Model)) {
    //   return res.status(500).json({ error: 'Failed to populate user' });
    // }

    const user = userGoal.user as IUser;

    // Add progress update to the goal
    userGoal.progressUpdates.push({ date, value, notes });
    userGoal.currentValue = value; // Update the current value
    await userGoal.save();

    // Update the user's streak
    if (!user.streak) {
      user.streak = {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
      };
    }

    const today = new Date();
    const lastActiveDate = user.streak.lastActiveDate;
    const currentStreak = user.streak.currentStreak;
    const longestStreak = user.streak.longestStreak;

    // Helper function to compare dates
    const isSameDay = (d1: Date, d2: Date) => {
      return d1.toDateString() === d2.toDateString();
    };

    // Check if the progress update date is today
    const progressDate = new Date(date);
    if (!isSameDay(progressDate, today)) {
      return res.status(400).json({ message: 'Progress date must be today to update streak' });
    }

    if (lastActiveDate) {
      const differenceInDays = Math.floor(
        (today.getTime() - lastActiveDate.getTime()) / (1000 * 3600 * 24)
      );

      if (differenceInDays === 1) {
        // Continue the streak
        user.streak.currentStreak = currentStreak + 1;
      } else if (differenceInDays > 1) {
        // Reset the streak
        user.streak.currentStreak = 1;
      } // else if differenceInDays === 0, do nothing (already updated today)
    } else {
      // First activity
      user.streak.currentStreak = 1;
    }

    // Update longest streak
    if (user.streak.currentStreak > longestStreak) {
      user.streak.longestStreak = user.streak.currentStreak;
    }

    // Update last active date
    user.streak.lastActiveDate = today;

    await user.save();

    res.json({
      message: 'Progress update added successfully',
      userGoal,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});


// GET /userGoals/:id/progress - Get all progress updates for a user goal
router.get('/:id/progress', async (req: Request, res: Response) => {
  try {
    const userGoal = await UserGoal.findById(req.params.id);
    if (!userGoal) {
      return res.status(404).json({ message: 'User goal not found' });
    }

    res.json(userGoal.progressUpdates);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;