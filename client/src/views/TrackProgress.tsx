import { useState, useEffect } from "react";
import { fetchUserData } from "../utils/user-utils";
import {
  dummyWorkoutData,
  dummyExerciseGoals,
  dummyProfileData,
} from "../constants/constants";
import "./TrackProgress.css";

// BACKEND: Replace the dummy values with database values. Make sure
// they match the same format

export const TrackProgress = (props: { userId: string }) => {
  const [userInfo, setUserInfo] = useState(dummyProfileData);

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    fetchUserData(props.userId)
      .then((result) => setUserInfo(result))
      .catch((err) => console.log(err));
  }, [props.userId]);

  // Sort exerciseData by newest date
  const exerciseData = dummyWorkoutData.sort((a, b) => {
    if (a.date > b.date) return -1;
    else return 1;
  });

  // Create object with goal IDs as keys for easier use
  interface exerciseGoalsType {
    [id: string]: { goal: string; value: number };
  }

  const exerciseGoals: exerciseGoalsType = dummyExerciseGoals.reduce(
    (ac, cur) =>
      Object.assign(ac, {
        [cur._id]: { goal: cur.goal, value: cur.value },
      }),
    {}
  );

  interface GoalType {
    id: string;
    progressValue: number;
  }

  const WorkoutData = (props: { date: string; goals: GoalType[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fs-2 p-2 mb-3 ps-4 text-start workout-container"
      >
        <div className="workout-title">
          {props.date}
          <img
            src="/arrow_drop_up.png"
            alt="dropdown icon"
            className={isOpen ? "dropdown-icon-rotate" : "dropdown-icon"}
          ></img>
        </div>
        {isOpen ? (
          <ul className="workout-progress fs-4">
            {Object.keys(props.goals).map((e) => {
              // Filter goals for progress value
              const progressValue = props.goals.filter((g) => g.id === e)[0]
                .progressValue;
              console.log(exerciseGoals[e]);
              return (
                <li key={e}>
                  {exerciseGoals[e].goal}: {progressValue}/
                  <span style={{ color: "gray" }}>
                    {exerciseGoals[e].value}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <h1 className="title-container">
        Track Progress (Workout Streak 🔥: {userInfo.streak})
      </h1>
      <div className="content-container">
        {exerciseData.map((e) => {
          return <WorkoutData key={e.date} date={e.date} goals={e.goals} />;
        })}
      </div>
    </div>
  );
};
