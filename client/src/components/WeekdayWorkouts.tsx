import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { Exercise, ScheduledExercise } from "../types/types";
import { WorkoutsContext } from "../context/workouts-context";

/**
 * 
 * @param day - the day
 */
export function WeekdayWorkout({day}:{day:string}){
    // const [startTime, setStartTime] = useState<string>('00:00'); // Use ISO8601 format to set time
    // const [endTime, setEndTime] = useState<string>('00:00'); // Use ISO8601 format to set time
    const {weeklyWorkouts,setWeeklyWorkouts} = useContext(WorkoutsContext);
    const todaysDetails : ScheduledExercise = weeklyWorkouts.find(x=>x.day===day) || { day: day, exercises: [], startTime: "00:00", endTime: "00:00" };
    const [exercises, setExercises] = useState<Exercise[]>(weeklyWorkouts.find(x=>x.day===day)?.exercises||[]);


    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeeklyWorkouts((prevWorkouts)=>{
            return prevWorkouts.map((daySchedule)=>{
                if(daySchedule.day===day){
                    return {
                        ...daySchedule,
                        startTime:e.target.value
                    }
                }
                return daySchedule
            });
        });
    };
    
    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeeklyWorkouts((prevWorkouts)=>{
            return prevWorkouts.map((daySchedule)=>{
                if(daySchedule.day===day){
                    return {
                        ...daySchedule,
                        endTime:e.target.value
                    }
                }
                return daySchedule
            });
        });
    };

    const handleReorder = (updatedExercises: Exercise[]) => {
        setExercises(updatedExercises);
      };
    
    return (
        <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{day}'s Plan</h5>
            </div>
            <div className="card-body d-flex">
                <div className="flex-grow-1 text-center">
                {todaysDetails.exercises.length > 0 ? (
                    <ul className="list-group mx-auto">
                        <FancyWorkoutsDisplay exercises={todaysDetails.exercises} onReorder={handleReorder} />
                    </ul>
                ) : (
                    <p>No exercises planned for {day}.</p>
                )}
                </div>
                {/* Start and End Times on the right */}
                <div className="ms-4" style={{ minWidth: "200px" }}>
                <div className="mb-3">
                    <label htmlFor="startTime" className="form-label">
                    Start Time
                    </label>
                    <input
                    type="time"
                    id="startTime"
                    className="form-control"
                    value={todaysDetails.startTime}
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
                    value={todaysDetails.endTime}
                    onChange={handleEndTimeChange}
                    />
                </div>
                </div>
            </div>
            {/* Footer with Edit Button */}
            <div className="card-footer d-flex justify-content-end">
                <Link to={`/Day-Planner/${day}`} className="btn btn-primary btn-sm">
                Edit
                </Link>
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
