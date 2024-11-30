import { useState } from "react";
import { Link } from 'react-router-dom';
import { Exercise, ScheduledExercise } from "../types/types";

/**
 * 
 * @param workouts - list of workouts from that particular day
 * @param day - the day
 */
export function WeekdayWorkout(workouts: Exercise[], day: string){
    const [startTime, setStartTime] = useState<string>('00:00'); // Use ISO8601 format to set time
    const [endTime, setEndTime] = useState<string>('00:00'); // Use ISO8601 format to set time
    const [exercises, setExercises] = useState<Exercise[]>(workouts);
    const todaysDetails : ScheduledExercise = {
        day: day,
        exercises: workouts,
        startTime: startTime,
        endTime: endTime
    }
    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value);
    };
    
    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value);
    };

    const handleReorder = (updatedExercises: Exercise[]) => {
        setExercises(updatedExercises);
      };
    
    return (
        <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{day}'s Plan</h5>
            <Link to={`/build-your-own/${day}`} className="btn btn-primary btn-sm">
                Edit
            </Link>
            </div>
            <div className="card-body">
            <div className="mb-3">
                <label htmlFor="startTime" className="form-label">
                Start Time
                </label>
                <input
                type="time"
                id="startTime"
                className="form-control"
                value={startTime}
                onChange={handleStartTimeChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="endTime" className="form-label">
                End Time
                </label>
                <input
                type="time"
                id="endTime"
                className="form-control"
                value={endTime}
                onChange={handleEndTimeChange}
                />
            </div>
            {todaysDetails.exercises.length > 0 ? (
                <ul className="list-group">
                {todaysDetails.exercises.map((exercise, index) => (
                    <li key={index} className="list-group-item">
                    <strong>{exercise.name}</strong> - {exercise.muscle} ({exercise.difficulty})
                    </li>
                ))}
                <FancyWorkoutsDisplay exercises={exercises} onReorder={handleReorder}/>
                </ul>
            ) : (
                <p>No exercises planned for ${day}.</p>
            )}
            </div>
            <div className="card-footer">
            <p>
                Start Time: <strong>{todaysDetails.startTime}</strong>
            </p>
            <p>
                End Time: <strong>{todaysDetails.endTime}</strong>
            </p>
            </div>
        </div>
    );
}

type FancyWorkoutsDisplayProps = {
  exercises: Exercise[];
  onReorder: (updatedExercises: Exercise[]) => void; // Callback to update parent component
};

export function FancyWorkoutsDisplay({ exercises, onReorder }: FancyWorkoutsDisplayProps) {
  const [workouts, setWorkouts] = useState<Exercise[]>(exercises);

  const moveUp = (index: number) => {
    if (index === 0) return; // Can't move the first item up
    const updatedWorkouts = [...workouts];
    [updatedWorkouts[index - 1], updatedWorkouts[index]] = [
      updatedWorkouts[index],
      updatedWorkouts[index - 1],
    ];
    setWorkouts(updatedWorkouts);
    onReorder(updatedWorkouts);
  };

  const moveDown = (index: number) => {
    if (index === workouts.length - 1) return; // Can't move the last item down
    const updatedWorkouts = [...workouts];
    [updatedWorkouts[index], updatedWorkouts[index + 1]] = [
      updatedWorkouts[index + 1],
      updatedWorkouts[index],
    ];
    setWorkouts(updatedWorkouts);
    onReorder(updatedWorkouts);
  };

  return (
    <ul className="list-group">
      {workouts.map((exercise, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{exercise.name}</strong> - {exercise.muscle} ({exercise.difficulty})
          </div>
          <div>
            <button
              className="btn btn-sm btn-secondary me-2"
              onClick={() => moveUp(index)}
              disabled={index === 0}
            >
              ↑
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => moveDown(index)}
              disabled={index === workouts.length - 1}
            >
              ↓
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
