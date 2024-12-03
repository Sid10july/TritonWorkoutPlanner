import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  fetchUserData,
  incrementStreak,
  resetStreak,
  addWorkoutProgress,
  updateWorkoutDate,
  deleteWorkoutProgress,
} from "../utils/user-utils";
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

export const StartWorkout = (StartProps: { userId: string }) => {
  // Use axios baseURL to define the port
  axios.defaults.baseURL = `http://localhost:${process.env.PORT || 8080}`;

  const [goals, setGoals] = useState(dummyExerciseGoals);
  const [streak, setStreak] = useState(dummyProfileData.streak);
  const [lastWorkout, setLastWorkout] = useState(dummyLastWorkout);
  let progress = useRef([] as { _id: string; value: number }[]);

  // Resetting date for debugging purposes
  // updateWorkoutDate(StartProps.userId, [0, 0, 0]);

  // Fetch goals from the backend when the component mounts
  useEffect(() => {
    // Bypass this process if testing
    if (StartProps.userId !== "1") {
      fetchUserData(StartProps.userId)
        .then((result) => {
          setStreak(result.streak);
          setGoals(result.goals);
          // deleteWorkoutProgress(StartProps.userId);
          setLastWorkout(result.lastWorkedOut);
          progress.current = result.goals.map(
            (e: { _id: string; goal: string; value: number }) => ({
              _id: e._id,
              value: 0,
            })
          );
        })
        .catch((error) => console.error("Error fetching goals:", error));
    }
  }, [StartProps.userId]);

  // Function for updating goals
  const updateGoals = (newGoals: Goal[]) => {
    // Send put request to the backend
    axios
      .put(`/api/goals/${StartProps.userId}`, { newGoals: newGoals })
      .catch((error) => console.error("Error updating goals:", error));
  };

  // FOR BACKEND INTEGRATION
  // Use database to import dummyLastWorkout, dummyWorkoutPlans, dummyProfileData, dummyExerciseGoals
  // Increment and reset streak in the database
  // Log workout goals in the database
  // When finished working out, log current date as last workout time in database

  // Get current time (disregard hours/minutes/seconds)
  let currentTime = new Date();
  currentTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate()
  );
  // Dummy time for testing
  // currentTime = new Date(2024, 12 - 1, 8);

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

    if (lastWorkout[2] === 1) {
      return null;
    }
    if (!dummyWorkoutPlans.length)
      return (
        <div>
          <p className="workoutIndicator-title">
            Go to My Workouts to set a workout routine!
          </p>
        </div>
      );
    if (streakStatus === "broken") {
      // Prevents page from resetting streak if data hasn't loaded yet
      if (lastWorkout[2] !== 1) {
        resetStreak(StartProps.userId);
      }
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
    // BACKEND: Increment streak to database and last workout
    else {
      let newGoals: any[] = goals;

      const handleProgressChange = (id: string, value: number) => {
        if (isNaN(value)) value = 0;
        progress.current = progress.current.map((e) => {
          if (id === e._id) return { _id: e._id, value: value };
          else return { _id: e._id, value: e.value };
        });
      };

      const handleGoalChange = (id: string, value: number) => {
        if (isNaN(value)) value = 0;
        newGoals = newGoals.map((e: Goal) => {
          if (id === e._id) return { goal: e.goal, value: value, _id: id };
          else return { ...e };
        });
      };

      // Track goals
      if (props.exerciseNum === props.numExercises && goals.length) {
        return (
          <div className="exercise-container">
            <p className="workoutIndicator-title mb-0">Workout finished!</p>
            <p className="fs-4 mb-5">New streak 🔥: {streak + 1}</p>
            <p className="fs-2 mb-5">Progress Tracker:</p>
            <form
              className="exercise-form"
              onSubmit={(e) => {
                e.preventDefault();
                props.workoutClickHandler(props.exerciseNum + 1);
              }}
            >
              {goals.map((e) => (
                <InputField
                  key={e._id}
                  id={e._id}
                  goalString={`${e.goal}:`}
                  goalMet={false}
                  targetValue={e.value}
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
        goals.forEach((e) => {
          const progressFilter = progress.current.filter(
            (g) => g._id === e._id
          )[0];
          if (progressFilter.value >= e.value) {
            isGoalMet = true;
          }
        });
        let noGoalsMessage = false;
        if (!goals.length) noGoalsMessage = true;

        return (
          <div className="exercise-container">
            <p className="workoutIndicator-title mb-0">Workout finished!</p>
            <p className="fs-4 mb-5">New streak 🔥: {streak + 1}</p>
            <p className="fs-2 mb-5">
              {isGoalMet
                ? "Progress Tracker (Goal(s) met! Set new goals?)"
                : "Progress Tracker:"}
            </p>
            {noGoalsMessage ? (
              <p className="fs-3">
                No goals. Go to Change Preferences to set goals!
              </p>
            ) : null}

            <form
              onSubmit={(e) => {
                // BACKEND INTEGRATION NEEDED
                const currentDate: number[] = [
                  currentTime.getMonth() + 1, // monthIndex maps 0-11 to January - December, so readjust by adding 1
                  currentTime.getDate(),
                  currentTime.getFullYear(),
                ];
                // Add "progress" variable as a new workout entry in database
                addWorkoutProgress(
                  StartProps.userId,
                  currentDate[2] + "-" + currentDate[0] + "-" + currentDate[1],
                  progress.current
                );
                // Increment streak
                incrementStreak(StartProps.userId);
                // Update last workout date
                updateWorkoutDate(StartProps.userId, currentDate);
                // Rerender UI
                setLastWorkout(currentDate);
                // Update goals
                if (newGoals) {
                  updateGoals(newGoals);
                }
              }}
              className="exercise-form"
            >
              {goals.map((e) => {
                const progressFilter = progress.current.filter(
                  (g) => g._id === e._id
                )[0];
                const percentage = Math.min(
                  Math.floor((progressFilter.value / e.value) * 100),
                  100
                );

                return (
                  <div className="tracker-container" key={e._id}>
                    {percentage !== 100 ? (
                      <div className="progress-container mb-3">
                        <p className="text-start fs-3 mb-0 p-1">
                          {e.goal} ({percentage}%):
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
                        id={e._id}
                        goalString={`${e.goal} (100%):`}
                        goalMet={true}
                        targetValue={e.value}
                        inputChangeHandler={handleGoalChange}
                      />
                    )}
                  </div>
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
