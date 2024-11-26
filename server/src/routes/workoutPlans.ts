import { Router, Request, Response } from 'express';
import WorkoutPlan, { IWorkoutPlan } from '../models/WorkoutPlan';

const router = Router();

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

// GET /workoutPlans - Retrieve all workout plans
router.get('/', async (req: Request, res: Response) => {
  try {
    const workoutPlans: IWorkoutPlan[] = await WorkoutPlan.find();
    res.json(workoutPlans);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /workoutPlans/:id - Retrieve a workout plan by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workoutPlan = await WorkoutPlan.findById(req.params.id);
    if (!workoutPlan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }
    res.json(workoutPlan);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /workoutPlans/:id - Update a workout plan
router.put('/:id', async (req: Request, res: Response) => {
  const {
    name,
    days,
    difficultyLevel,
    exercises,
    duration,
    description,
  } = req.body;

  try {
    const updatedWorkoutPlan = await WorkoutPlan.findByIdAndUpdate(
      req.params.id,
      {
        name,
        days,
        difficultyLevel,
        exercises,
        duration,
        description,
      },
      { new: true }
    );

    if (!updatedWorkoutPlan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    res.json({
      message: 'Workout plan updated successfully',
      workoutPlan: updatedWorkoutPlan,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /workoutPlans/:id - Delete a workout plan
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedWorkoutPlan = await WorkoutPlan.findByIdAndDelete(req.params.id);
    if (!deletedWorkoutPlan) {
      return res.status(404).json({ message: 'Workout plan not found' });
    }

    res.json({ message: 'Workout plan deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;