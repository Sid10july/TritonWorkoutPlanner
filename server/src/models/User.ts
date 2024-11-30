// import mongoose, { Document, Schema } from 'mongoose';

// export interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string;
// }

// const UserSchema: Schema = new Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     email:    { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     // Add additional fields if necessary
//   },
//   { timestamps: true }
// );

// export default mongoose.model<IUser>('User', UserSchema);
// import mongoose, { Document, Schema, Types } from 'mongoose';

// // Define the Goal interface
// export interface IGoal {
//   _id?: Types.ObjectId; // Explicitly include '_id' as an optional field
//   goal: string;
//   value: number;
// }

// // Extend the IUser interface to include goals
// export interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string;
//   goals: IGoal[]; // Add 'goals' field
// }

// // Create the Goal schema
// const GoalSchema: Schema<IGoal> = new Schema({
//   goal: { type: String, required: true },
//   value: { type: Number, required: true },
// });

// // Create the User schema
// const UserSchema: Schema<IUser> = new Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     goals: { type: [GoalSchema], default: [] }, // Embed the Goal schema
//   },
//   { timestamps: true }
// );

// // Export the model
// export default mongoose.model<IUser>('User', UserSchema);

// import mongoose, { Schema, Document } from 'mongoose';

// // Define the Goal schema
// const GoalSchema = new Schema({
//   goal: { type: String, required: true },
//   value: { type: Number, required: true },
// });

// // Define the User schema
// const UserSchema = new Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     goals: { type: [GoalSchema], default: [] }, // Embed goals
//   },
//   { timestamps: true }
// );

// export interface IGoal {
//   goal: string;
//   value: number;
// }

// export interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string;
//   goals: IGoal[];
// }

// export default mongoose.model<IUser>('User', UserSchema);

import mongoose, { Document, Schema, Types } from "mongoose";

export interface IGoal {
  _id?: Types.ObjectId; // Explicit ObjectId
  goal: string;
  value: number;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  goals: IGoal[];
}

const GoalSchema: Schema = new Schema<IGoal>({
  goal: { type: String, required: true },
  value: { type: Number, required: true },
});

const UserSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    goals: { type: [GoalSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
