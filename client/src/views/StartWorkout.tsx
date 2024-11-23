import { useState } from "react";
import { InputField } from "../components/InputField";
import { WorkoutPlan } from "../types/types";
import {
  dummyLastWorkout,
  dummyWorkoutPlans,
  dummyProfileData,
  dummyExerciseGoals,
  daysOfWeekJS,
} from "../constants/constants";
import "./StartWorkout.css";

export const StartWorkout = () => {
  // FOR BACKEND INTEGRATION
  // Use database to import dummyLastWorkout, dummyWorkoutPlans, dummyProfileData, dummyExerciseGoals
  // Increment and reset streak in the database
  // Log workout goals in the database
  // When finished working out, log current date as last workout time in database

  const [lastWorkout, setLastWorkout] = useState(dummyLastWorkout);

  // Get current time
  const currentTime = new Date();
  // const day = currentTime.getDay();

  // Dummy time for testing
  const day = 2;

  const daysMissed = currentTime.getDate() - lastWorkout[1];
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
  let workoutPlan: WorkoutPlan = {
    day: 0,
    time: "0:00",
    am: true,
    exercises: [],
  };
  let titleString = "No Workout Today";
  if (dummyWorkoutPlans.length) {
    workoutPlan = dummyWorkoutPlans.filter((e) => e["day"] === day)[0];
    // If there is a workout planned for today
    if (workoutPlan) {
      titleString = `Today's Workout (${daysOfWeekJS[workoutPlan.day]} at ${
        workoutPlan.time
      }${workoutPlan.am ? "am" : "pm"})`;
    }
  }
  // Determine next workout
  let nextWorkoutPlan = workoutPlan;
  if (dummyWorkoutPlans.length) {
    for (let i = 1; i < 7; i++) {
      const findNextPlan = dummyWorkoutPlans.filter(
        (e) => e["day"] === (i + day) % 7
      )[0];
      if (findNextPlan) {
        nextWorkoutPlan = findNextPlan;
        break;
      }
    }
  }

  // Display different information based on the streak status
  const WorkoutIndicator = () => {
    const [exerciseNum, setExerciseNum] = useState(0);

    const handleExerciseNumClick = (exerciseNum: number) => {
      setExerciseNum(exerciseNum);
    };

    if (!dummyWorkoutPlans.length)
      return (
        <div>
          <p className="workoutIndicator-title">
            Go to My Workouts to set a workout routine!
          </p>
        </div>
      );
    if (streakStatus === "broken") {
      return (
        <div>
          <p className="workoutIndicator-title mb-0">You broke your streak!</p>
          <p className="fs-3">New streak 🔥: 0</p>
        </div>
      );
    } else if (streakStatus === "pending" && workoutPlan) {
      return (
        <Workout
          exerciseNum={exerciseNum}
          numExercises={workoutPlan.exercises.length}
          workoutClickHandler={handleExerciseNumClick}
        />
      );
    } else {
      return (
        <div>
          <p className="workoutIndicator-title mb-0">Great workout!</p>
          <p className="fs-3">
            Come back on {daysOfWeekJS[nextWorkoutPlan.day]} at{" "}
            {nextWorkoutPlan.time}
            {nextWorkoutPlan.am ? "am" : "pm"}
          </p>
        </div>
      );
    }
  };

  // Display workout and goal setting information
  const Workout = (props: {
    exerciseNum: number;
    numExercises: number;
    workoutClickHandler: (exerciseNum: number) => void;
  }) => {
    if (props.exerciseNum < props.numExercises) {
      const exercise = workoutPlan.exercises[props.exerciseNum];
      // Format the exercise type and muscle group names
      // Take out underscores and add uppercasing
      const stringFormatter = (str: string) => {
        return str
          .replace(/_/g, " ")
          .split(" ")
          .map((e) => e.charAt(0).toUpperCase() + e.substring(1))
          .join(" ");
      };

      const eType = stringFormatter(exercise.type);
      const eMuscle = stringFormatter(exercise.muscle);
      const eEquipment = stringFormatter(exercise.equipment);

      return (
        <div className="exercise-container">
          <p className="workoutIndicator-title mb-0">
            Exercise #{props.exerciseNum + 1}: {exercise.name}
          </p>
          <p className="fs-4 mb-0">Type: {eType}</p>
          <p className="fs-4 mb-0">Muscle Group: {eMuscle}</p>
          <p className="fs-4 mb-5">Equipment: {eEquipment}</p>
          <p className="fs-3 exercise-instructions mb-5">
            <h3>Instructions:</h3> {exercise.instructions}
          </p>
          <a
            href={`https://www.google.com/search?q=${exercise.name} exercise instructions`}
            target="_blank" //opens link in new tab
            rel="noopener noreferrer"
            className="exercise-link"
          >
            Learn more about {exercise.name}
          </a>
          <div
            onClick={() => {
              const view = document.getElementById("App-view");
              if (view) {
                view.scrollTo({
                  top: 0,
                });
              }
              props.workoutClickHandler(props.exerciseNum + 1);
            }}
            className="btn btn-primary fs-3 exercise-button"
          >
            {props.exerciseNum < props.numExercises - 1
              ? "Next Exercise"
              : "Finish Workout"}
          </div>
        </div>
      );
    }
    // Workout is finished
    // BACKEND: Increment streak to database
    else {
      let goals = dummyExerciseGoals.map((e) => ({
        id: e.id,
        currentValue: 0,
      }));

      const handleGoalChange = (id: number, value: number) => {
        if (isNaN(value)) value = 0;
        goals = goals.map((e) => {
          if (id === e.id) return { id: e.id, currentValue: value };
          else return { id: e.id, currentValue: e.currentValue };
        });
      };

      return (
        <div className="exercise-container">
          <p className="workoutIndicator-title mb-0">Workout finished!</p>
          <p className="fs-4 mb-5">
            New streak 🔥: {dummyProfileData.streak + 1}
          </p>
          <p className="fs-2 mb-5">Progress Tracker:</p>
          <form
            className="exercise-form"
            onSubmit={(e) => {
              // BACKEND INTEGRATION NEEDED
              // Update backend with last workout time
              // Add "goals" variable to database
              setLastWorkout([
                currentTime.getMonth(),
                currentTime.getDate(),
                currentTime.getFullYear(),
              ]);
            }}
          >
            {dummyExerciseGoals.map((e) => (
              <InputField
                key={e.id}
                id={e.id}
                goalString={e.goalString}
                targetValue={e.targetValue}
                inputChangeHandler={handleGoalChange}
              />
            ))}
            <button
              type="submit"
              className="btn btn-primary fs-3 exercise-button"
            >
              Done
            </button>
          </form>
        </div>
      );
    }
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
