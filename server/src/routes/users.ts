import { Router, Request, Response } from 'express';
import User, { IUser } from '../models/User';
import mongoose from 'mongoose';

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


// DELETE /users/:id - Delete a user by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});


// Additional routes can be added here

export default router;