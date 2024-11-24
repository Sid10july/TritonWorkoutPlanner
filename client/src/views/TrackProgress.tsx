import { useState } from "react";
import { dummyWorkoutData, dummyExerciseGoals } from "../constants/constants";
import "./TrackProgress.css";

// BACKEND: Replace the dummy values with database values. Make sure
// they match the same format

export const TrackProgress = () => {
  // Sort exerciseData by newest date
  const exerciseData = dummyWorkoutData.sort((a, b) => {
    if (a.date > b.date) return -1;
    else return 1;
  });

  // Create object with goal IDs as keys for easier use
  interface exerciseGoalsType {
    [id: string]: { goalString: string; targetValue: number };
  }

  const exerciseGoals: exerciseGoalsType = dummyExerciseGoals.reduce(
    (ac, cur) =>
      Object.assign(ac, {
        [cur.id]: { goalString: cur.goalString, targetValue: cur.targetValue },
      }),
    {}
  );

  interface GoalType {
    id: number;
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
              const progressValue = props.goals.filter(
                (g) => g.id == parseInt(e)
              )[0].progressValue;
              console.log(progressValue);
              return (
                <li key={e}>
                  {exerciseGoals[e].goalString}: {progressValue}/
                  <span style={{ color: "gray" }}>
                    {exerciseGoals[e].targetValue}
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
      <h1 className="title-container">Track Progress</h1>
      <div className="content-container">
        {exerciseData.map((e) => {
          return <WorkoutData key={e.date} date={e.date} goals={e.goals} />;
        })}
      </div>
    </div>
  );
};
