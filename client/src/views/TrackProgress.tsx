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
  const [userInfo, setUserInfo] = useState(dummyProfileData.streak);
  const [goals, setGoals] = useState(dummyExerciseGoals);
  const [progress, setProgress] = useState(
    dummyWorkoutData as { date: string; goals: GoalType[] }[]
  );

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    fetchUserData(props.userId)
      .then((result) => {
        setUserInfo(result.streak);
        setGoals(result.goals);
        setProgress(result.progressUpdates);
      })
      .catch((err) => console.log(err));
  }, [props.userId]);

  // Sort exerciseData by newest date
  const exerciseData = progress.sort((a, b) => {
    if (a.date > b.date) return -1;
    else return 1;
  });

  // Create object with goal IDs as keys for easier use
  interface exerciseGoalsType {
    [id: string]: { goal: string; value: number };
  }

  const exerciseGoals: exerciseGoalsType = goals.reduce(
    (ac, cur) =>
      Object.assign(ac, {
        [cur._id]: { goal: cur.goal, value: cur.value },
      }),
    {}
  );
  interface GoalType {
    _id: string;
    value: number;
  }

  function dateSyntax(date: string){
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    
      // Split the date into year, month, and day
      const [year, month, day] = date.split("-").map(Number);
    
      // Get the month name
      const monthName = months[month - 1];
    
      // Determine the day suffix
      const daySuffix = 
        day % 10 === 1 && day !== 11 ? "st" :
        day % 10 === 2 && day !== 12 ? "nd" :
        day % 10 === 3 && day !== 13 ? "rd" : "th";
    
      // Format the date
      return `${monthName} ${day}${daySuffix} ${year}`;
  }

  const WorkoutData = (props: { date: string; goals: GoalType[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fs-2 p-2 mb-3 ps-4 text-start workout-container"
      >
        <div className="workout-title">
          {dateSyntax(props.date)}
          <img
            src="/arrow_drop_up.png"
            alt="dropdown icon"
            className={isOpen ? "dropdown-icon-rotate" : "dropdown-icon"}
          ></img>
        </div>
        {isOpen ? (
          <ul className="workout-progress fs-4">
            {props.goals.map((e) => {
              // Filter goals for progress value
              const progressValue = props.goals.filter(
                (g) => g._id === e._id
              )[0].value;
              if (progressValue && progressValue !== 0) {
                return (
                  <li key={e._id}>
                    {exerciseGoals[e._id].goal}: {progressValue}/
                    <span style={{ color: "gray" }}>
                      {exerciseGoals[e._id].value}
                    </span>
                  </li>
                );
              }
            })}
          </ul>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <h1 className="title-container">
        Track Progress (Workout Streak 🔥: {userInfo})
      </h1>
      <div className="content-container">
        {exerciseData.map((e) => {
          return <WorkoutData key={e.date} date={e.date} goals={e.goals} />;
        })}
      </div>
    </div>
  );
};
