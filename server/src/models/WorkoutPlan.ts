import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkoutPlan extends Document {
  name: string;
  days: string[]; // Days when the workout is to be completed
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: string[]; // List of exercises
  duration: number; // Total duration in minutes
  createdBy: mongoose.Types.ObjectId; // Reference to a User
  description?: string; // Optional description
  startTime?: string; // Start time for the day (ISO 8601 format)
  endTime?: string; // End time for the day (ISO 8601 format)
}

const WorkoutPlanSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    days: { type: [String], required: true },
    difficultyLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    exercises: { type: [String], required: true },
    duration: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    startTime: { type: String },
    endTime: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkoutPlan>('WorkoutPlan', WorkoutPlanSchema);