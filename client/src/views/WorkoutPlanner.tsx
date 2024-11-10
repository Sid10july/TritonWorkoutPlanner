import { Link } from "react-router-dom";
import "./WorkoutPlanner.css";

export const WorkoutPlanner = () => {
  // Note: "Select Existing Workout Plan" links to /generate-workout.
  // Perhaps a better path name like /select-workout should be chosen?
  // We think it may be better to not have two buttons on this page, as then we would need
  // back buttons. Users may also get confused.
  return (
    <div className="workout-planner-main">
      <h1>Choose a Plan</h1>
      <div className="workout-planner-options">
        <Link to="/build-your-own" className="planner-link">
          Customize Your Own
        </Link>
        <Link to="/generate-workout" className="planner-link">
          Select Existing Workout Plan
        </Link>
      </div>
    </div>
  );
};
