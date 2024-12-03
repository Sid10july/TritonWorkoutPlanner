import { Router, Request, Response } from 'express';
import WorkoutPlan, { IWorkoutPlan } from '../models/WorkoutPlan';
import DailyWorkoutPlan from '../models/DailyWorkoutPlan';

const router = Router();

// POST /workoutPlans/day - Save a daily workout plan
router.post('/day', async (req: Request, res: Response) => {
    const { day, exercises, startTime, endTime } = req.body;

    if (!day || !exercises || !startTime || !endTime) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const updatedPlan = await DailyWorkoutPlan.findOneAndUpdate(
            { day },
            { exercises, startTime, endTime },
            { upsert: true, new: true }
        );

        res.status(200).json({
            message: 'Daily workout plan saved successfully',
            workoutPlan: updatedPlan,
        });
    } catch (error: any) {
        console.error('Error saving daily workout plan:', error);
        res.status(500).json({
            error: 'Failed to save daily workout plan',
            details: error.message,
        });
    }
});

// POST /workoutPlans - Add a new workout plan
router.post('/', async (req: Request, res: Response) => {
    const {
        name,
        days,
        difficultyLevel,
        exercises,
        duration,
        createdBy,
        description,
    } = req.body;

    try {
        const newWorkoutPlan: IWorkoutPlan = new WorkoutPlan({
            name,
            days,
            difficultyLevel,
            exercises,
            duration,
            createdBy,
            description,
        });

        await newWorkoutPlan.save();

        res.status(201).json({
            message: 'Workout plan added successfully',
            workoutPlan: newWorkoutPlan,
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});


// GET /day - Retrieve a workout plan for a specific day
router.get('/day', async (req: Request, res: Response) => {
  const { day } = req.query;

  console.log('GET /day called with query:', req.query); // Debug log

  if (!day) {
      return res.status(400).json({ error: 'Missing "day" query parameter' });
  }

  try {
      const workoutPlan = await DailyWorkoutPlan.findOne({ day });
      if (!workoutPlan) {
          return res.status(404).json({ error: `Workout plan not found for day: ${day}` });
      }

      res.status(200).json(workoutPlan);
  } catch (error: any) {
      console.error('Error fetching workout plan:', error);
      res.status(500).json({ error: 'Failed to fetch workout plan', details: error.message });
  }
});

export default router;