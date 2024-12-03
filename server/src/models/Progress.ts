import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

interface IProgressUpdate {
  date: Date;
  value: number;
  notes?: string;
}

export interface IUserGoal extends Document {
  user: mongoose.Types.ObjectId | IUser;
  goalType: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  startDate: Date;
  endDate?: Date;
  progressUpdates: IProgressUpdate[];
  description?: string;
}

const ProgressUpdateSchema: Schema = new Schema({
  date: { type: Date, required: true },
  value: { type: Number, required: true },
  notes: { type: String },
});

const UserGoalSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goalType: { type: String, required: true },
    targetValue: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    unit: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    progressUpdates: { type: [ProgressUpdateSchema], default: [] },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUserGoal>("UserGoal", UserGoalSchema);
