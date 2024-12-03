import mongoose, { Schema, Document, Types } from "mongoose";
  
// Define the Exercise schema
const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  muscle: { type: String, required: true },
  equipment: { type: String, required: true },
  difficulty: { type: String, required: true },
  instructions: { type: String, required: true },
});

// Define the ScheduledExercise schema
const ScheduledExerciseSchema = new Schema({
  day: { type: String, required: true },
  exercises: { type: [ExerciseSchema], default: [] }, // Use [ExerciseSchema] to specify a nested document array
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

// Define the User schema
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  weeklyWorkoutPlan: { type: [ScheduledExerciseSchema], default: [] },
});

// Export the model
export const WeeklyPlans = mongoose.model("WeeklyPlans", UserSchema);
