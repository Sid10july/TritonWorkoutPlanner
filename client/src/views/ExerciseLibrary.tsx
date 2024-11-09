import { dummyExercisesList } from "../constants/constants";
import "./ExerciseLibrary.css";

export const ExerciseLibrary = () => {
  return (
    <div className="exercise-library">
      <h1>Exercise Library</h1>
      <div className="exercises-list">
        {dummyExercisesList.map((exercise) => (
          <div key={exercise.id} className="exercise-item">
            <h3>{exercise.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
