import { Link } from "react-router-dom";
import "./WorkoutPlanner.css";

export const WorkoutPlanner = () => {
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
