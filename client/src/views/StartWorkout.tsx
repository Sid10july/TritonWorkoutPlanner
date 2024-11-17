import { useState } from "react";
import {
  dummyLastWorkout,
  dummyWorkoutPlans,
  daysOfWeekJS,
} from "../constants/constants";
import "./StartWorkout.css";

export const StartWorkout = () => {
  // FOR BACKEND INTEGRATION
  // Use database to import dummyLastWorkout and dummyWorkoutPlans
  // Increment and reset streak in the database

  const [lastWorkout, setLastWorkout] = useState(dummyLastWorkout);

  // Get current time
  const currentTime = new Date();
  const day = currentTime.getDay();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  // Dummy time
  // const day = 2;

  const daysMissed = currentTime.getDate() - dummyLastWorkout[1];
  let streakStatus = "unbroken";
  // If the user misses more than a day of working out, break streak
  if (daysMissed > 1) {
    streakStatus = "broken";
  }
  // If the user misses exactly a day, that means they haven't worked out yet
  else if (daysMissed === 1) {
    streakStatus = "pending";
  }
  // If the user misses no days, they already worked out
  else if (daysMissed === 0) {
    streakStatus = "unbroken";
  }

  // Get today's workout
  const workoutPlan = dummyWorkoutPlans.filter((e) => e.day === day)[0];
  let titleString = "No Workout Today";
  // If there is a workout planned for today
  if (workoutPlan) {
    titleString = `Today's Workout (${daysOfWeekJS[workoutPlan.day]} at ${
      workoutPlan.time
    }${workoutPlan.am ? "am" : "pm"})`;
  }
  // Determine next workout
  let nextWorkoutPlan = workoutPlan;
  for (let i = 1; i < 7; i++) {
    const findNextPlan = dummyWorkoutPlans.filter(
      (e) => e.day === (i + day) % 7
    )[0];
    if (findNextPlan) {
      nextWorkoutPlan = findNextPlan;
      break;
    }
  }

  // Display different information based on the streak status
  const WorkoutIndicator = () => {
    if (streakStatus === "broken") {
      return (
        <div>
          <p className="workoutIndicator-title">You broke your streak!</p>
          <p className="fs-3">New streak 🔥: 0</p>
        </div>
      );
    } else if (streakStatus === "pending") {
      return <Workout />;
    } else {
      return (
        <div>
          <p className="workoutIndicator-title">Great workout!</p>
          <p className="fs-3">
            Come back on {daysOfWeekJS[nextWorkoutPlan.day]} at{" "}
            {nextWorkoutPlan.time}
            {nextWorkoutPlan.am ? "am" : "pm"}
          </p>
        </div>
      );
    }
  };

  const Workout = () => {
    return <div>Test</div>;
  };

  return (
    <div>
      <h1 className="title-container">{titleString}</h1>
      <div className="content-container">
        <WorkoutIndicator />
      </div>
    </div>
  );
};
