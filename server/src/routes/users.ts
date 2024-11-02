import { Router, Request, Response } from 'express';
import User, { IUser } from '../models/User';

const router = Router();

// POST /users - Add a new user
router.post('/', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Create and save the new user
    const newUser: IUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error: any) {
    // Handle errors (e.g., duplicate entries, validation errors)
    res.status(400).json({ error: error.message });
  }
});

// GET /users - Retrieve all users (optional)
router.get('/', async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Additional routes can be added here

export default router;