import mongoose, { Document, Schema } from 'mongoose';

export interface IDailyWorkoutPlan extends Document {
  day: string; // Day of the week (e.g., "Monday")
  exercises: {
    name: string; // Name of the exercise
    muscle: string; // Target muscle group
    difficulty: string; // Difficulty level
  }[]; // Array of exercises
  startTime: string; // Start time in ISO 8601 format
  endTime: string; // End time in ISO 8601 format
}

const ExerciseSchema: Schema = new Schema({
  name: { type: String, required: true },
  muscle: { type: String, required: true },
  difficulty: { type: String, required: true },
});

const DailyWorkoutPlanSchema: Schema = new Schema(
  {
    day: { type: String, required: true, unique: true }, // Unique per day
    exercises: { type: [ExerciseSchema], required: true }, // Array of exercises
    startTime: { type: String, required: true }, // Required start time
    endTime: { type: String, required: true }, // Required end time
  },
  { timestamps: true } // Automatically track createdAt and updatedAt
);

export default mongoose.model<IDailyWorkoutPlan>('DailyWorkoutPlan', DailyWorkoutPlanSchema);