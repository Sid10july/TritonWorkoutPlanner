import { useState } from "react";
import { InputField } from "../components/InputField";
import ProgressBar from "@ramonak/react-progress-bar";
import { WorkoutPlan, Goal } from "../types/types";
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

  // Get current time (disregard hours/minutes/seconds)
  let currentTime = new Date();
  currentTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate()
  );
  // Dummy time for testing
  // currentTime = new Date(2024, 11 - 1, 23);

  const day = currentTime.getDay();

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
        (e) => e["day"] === (day + i) % 7
      )[0];
      if (findNextPlan) {
        nextWorkoutPlan = findNextPlan;
        break;
      }
    }
  }
  // Determine previous workout day
  let lastWorkoutDay = day;
  if (dummyWorkoutPlans.length) {
    for (let i = 1; i < 7; i++) {
      const findPrevPlan = dummyWorkoutPlans.filter(
        // Handles negative modulo
        (e) => e["day"] === (((day - i) % 7) + 7) % 7
      )[0];
      if (findPrevPlan) {
        lastWorkoutDay = (((day - i) % 7) + 7) % 7;
        break;
      }
    }
  }

  const lastWorkoutDate = new Date(
    lastWorkout[2],
    lastWorkout[0] - 1, // monthIndex maps 0-11 to January - December
    lastWorkout[1]
  );
  // Using the previous workout day, calculate Date object
  let expectedLastWorkoutDate = new Date(currentTime);
  for (let i = 1; i < 8; i++) {
    const findLastDate = new Date(
      expectedLastWorkoutDate.getTime() - i * 24 * 60 * 60 * 1000
    );
    if (findLastDate.getDay() === lastWorkoutDay) {
      expectedLastWorkoutDate = findLastDate;
      break;
    }
  }
  let streakStatus = "pending";
  // If the user has a workout plan today and has worked out, streak is unbroken
  if (workoutPlan && lastWorkoutDate.getTime() === currentTime.getTime()) {
    streakStatus = "unbroken";
  }
  // If the last time the user worked out is earlier than the expectedLastWorkoutDate, they have broken their streak
  else if (lastWorkoutDate.getTime() < expectedLastWorkoutDate.getTime()) {
    streakStatus = "broken";
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
      // BACKEND: Set streak value to 0
      return (
        <div className="exercise-container">
          <p className="workoutIndicator-title mb-0">You broke your streak!</p>
          <p className="fs-3">New streak 🔥: 0</p>
          {workoutPlan ? (
            <div
              onClick={() =>
                setLastWorkout([
                  expectedLastWorkoutDate.getMonth() + 1, // monthIndex maps 0-11 to January - December, so readjust by adding 1
                  expectedLastWorkoutDate.getDate(),
                  expectedLastWorkoutDate.getFullYear(),
                ])
              }
              className="btn btn-primary fs-3 exercise-button"
            >
              Continue to Today's Exercise
            </div>
          ) : null}
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
      // If streak is unbroken, OR if streak is pending but there is no workout today
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

  // Progress and goals will be passed to database after exercise completion
  let progress = dummyExerciseGoals.map((e) => ({
    id: e.id,
    progressValue: 0,
  }));

  let goals: Goal[] = dummyExerciseGoals;

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
          <p className="fs-2 exercise-instructions mb-0">Instructions:</p>
          <p className="fs-3 exercise-instructions mb-5">
            {exercise.instructions}
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
      const handleProgressChange = (id: number, value: number) => {
        if (isNaN(value)) value = 0;
        progress = progress.map((e) => {
          if (id === e.id) return { id: e.id, progressValue: value };
          else return { id: e.id, progressValue: e.progressValue };
        });
      };

      const handleGoalChange = (id: number, value: number) => {
        if (isNaN(value)) value = 0;
        goals = goals.map((e: Goal) => {
          if (id === e.id)
            return { id: e.id, goalString: e.goalString, targetValue: value };
          else return { ...e };
        });
      };

      // Track goals
      if (props.exerciseNum === props.numExercises) {
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
                e.preventDefault();
                props.workoutClickHandler(props.exerciseNum + 1);
              }}
            >
              {dummyExerciseGoals.map((e) => (
                <InputField
                  key={e.id}
                  id={e.id}
                  goalString={`${e.goalString}:`}
                  goalMet={false}
                  targetValue={e.targetValue}
                  inputChangeHandler={handleProgressChange}
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
      // Display progress and modify goals if they are met
      else {
        let isGoalMet = false;
        dummyExerciseGoals.forEach((e) => {
          const progressFilter = progress.filter((g) => g.id === e.id)[0];
          if (progressFilter.progressValue >= e.targetValue) {
            isGoalMet = true;
          }
        });

        return (
          <div className="exercise-container">
            <p className="workoutIndicator-title mb-0">Workout finished!</p>
            <p className="fs-4 mb-5">
              New streak 🔥: {dummyProfileData.streak + 1}
            </p>
            <p className="fs-2 mb-5">
              {isGoalMet
                ? "Progress Tracker (Goal(s) met! Set new goals?)"
                : "Progress Tracker:"}
            </p>
            <form
              onSubmit={(e) => {
                // BACKEND INTEGRATION NEEDED
                // Update backend with last workout time
                // Add "progress" variable as a new workout entry in database
                // Replace user goals with "goals" in database
                setLastWorkout([
                  currentTime.getMonth() + 1, // monthIndex maps 0-11 to January - December, so readjust by adding 1
                  currentTime.getDate(),
                  currentTime.getFullYear(),
                ]);
              }}
              className="exercise-form"
            >
              {dummyExerciseGoals.map((e) => {
                const progressFilter = progress.filter((g) => g.id === e.id)[0];
                const percentage = Math.min(
                  Math.floor(
                    (progressFilter.progressValue / e.targetValue) * 100
                  ),
                  100
                );

                return (
                  <div className="tracker-container" key={e.id}>
                    {percentage !== 100 ? (
                      <div className="progress-container mb-3">
                        <p className="text-start fs-3 mb-0 p-1">
                          {e.goalString} ({percentage}%):
                        </p>
                        <ProgressBar
                          className="progress-bar"
                          bgColor="#0d6efd"
                          baseBgColor="#b3b4bd"
                          completed={percentage}
                          isLabelVisible={false}
                          animateOnRender={true}
                        />
                      </div>
                    ) : (
                      <InputField
                        id={e.id}
                        goalString={`${e.goalString} (100%):`}
                        goalMet={true}
                        targetValue={e.targetValue}
                        inputChangeHandler={handleGoalChange}
                      />
                    )}
                  </div>

                  // <div key={e.id} className="progress-container mb-3">
                  //   <p className="text-start fs-3 mb-0 p-1">
                  //     {e.goalString} ({percentage}%):
                  //   </p>
                  //   {percentage !== 100 ? (
                  //     <ProgressBar
                  //       className="progress-bar"
                  //       key={e.id}
                  //       bgColor="#0d6efd"
                  //       baseBgColor="#b3b4bd"
                  //       completed={percentage}
                  //       isLabelVisible={false}
                  //       animateOnRender={true}
                  //     />
                  //   ) : (
                  //     <InputField
                  //       id={e.id}
                  //       goalString={`${e.goalString}:`}
                  //       targetValue={e.targetValue}
                  //       inputChangeHandler={handleGoalChange}
                  //     />
                  //   )}
                  // </div>
                );
              })}
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
