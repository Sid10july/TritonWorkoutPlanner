import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import {
  muscles,
  difficultyLevels,
  exerciesTypes,
} from "../constants/constants";
import { fetchWorkouts } from "../utils/workout-utils";
import { Exercise } from "../types/types";
import { WorkoutCard, WorkoutsSelected } from "../components/WorkoutCard";
import { WorkoutsContext } from "../context/workouts-context";

export function DayPlanner() {
  const { day } = useParams();
  const {weeklyWorkouts, setWeeklyWorkouts} = useContext(WorkoutsContext); 
  const [workouts, setWorkouts] = useState<Exercise[]>([]);// State that keeps track of the workouts on a specific day.
//   const [selectedWorkouts, setSelectedWorkouts] = useState<Exercise[]>([]);

  function handleAddWorkout(key: string) {
    console.log(`Add workouts called with key: ${key}`);
    const workout = workouts.find((workout) => workout.name === key);
    if (workout) {
      // workout is found
        setWeeklyWorkouts((prevWorkouts) => {
            return prevWorkouts.map((daySchedule) => {
                if (daySchedule.day === day) {
                    // Update the day's exercises
                    return {
                        ...daySchedule,
                        exercises: [...daySchedule.exercises, workout],
                    };
                }
                return daySchedule;
            });
        });
    }
  }

  function handleDeleteWorkout(key: string) {

    setWeeklyWorkouts((prevWorkouts) => {
        return prevWorkouts.map((daySchedule)=>{
            if(daySchedule.day===day){
                return {
                    ...daySchedule,
                    exercises : daySchedule.exercises.filter(x=> x.name!==key)
                };
            }
            return daySchedule;
        });
    });
  }

  const selectedWorkouts: Exercise[] = weeklyWorkouts.find(x=>x.day===day)?.exercises || [];

  return (
    <div>
      <h1 className="title-container">This is the {`${day}`} planner</h1>
      <div className="content-container">
        <QueryForm setWorkouts={setWorkouts} />
        <SelectedWorkoutCards
          selectedWorkouts={selectedWorkouts}
          handleDeleteWorkout={handleDeleteWorkout}
        />
        <WorkoutCards
          workouts={workouts}
          handleAddWorkout={handleAddWorkout}
        />
      </div>
    </div>
  );
}

/**
 *
 * @param param0 : workoouts is a list of Exercises. This is a parent state and is passed down to this component.
 *  On every render this function renders the workout cards.
 * @returns A list of workout cards
 */
function WorkoutCards({
  workouts,
  handleAddWorkout
}: {
  workouts: Exercise[];
  handleAddWorkout: (key: string) => void;
}) {
  return (
    <div className="cards">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.name}
          workout={workout}
          handleAddWorkout={handleAddWorkout}
        />
      ))}
    </div>
  );
}

/**
 *
 * @param param0 selectedWorkouts state whihc is a list of selected workouts and a handleDelete function that handles the deletion of one
 * of these cards
 * @returns A list of selected cards
 */
function SelectedWorkoutCards({
  selectedWorkouts,
  handleDeleteWorkout,
}: {
  selectedWorkouts: Exercise[];
  handleDeleteWorkout: (key: string) => void;
}) {
  return (
    <div className="selected-cards">
      {selectedWorkouts.map((workout) => (
        <WorkoutsSelected
          workout={workout}
          handleDeleteWorkout={handleDeleteWorkout}
        />
      ))}
    </div>
  );
}

/**
 *
 * @param param0 : setWorkouts to set the workouts of the parent component
 * @returns A query form that on submission sends the parameters to request and gets the response(Exercies[])
 */
function QueryForm({
  setWorkouts,
}: {
  setWorkouts: React.Dispatch<React.SetStateAction<Exercise[]>>;
}) {
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");

  /**
   * On form submission. Send the values of muscle, type and difficulty to fetchWorkouts function with these values.
   * @param event - Form submission event
   */
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = { type: type, muscle: muscle, difficulty: difficulty };
    try {
      const workouts: Exercise[] = await fetchWorkouts(params);
      setWorkouts(workouts);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={(event) => onSubmit(event)}
      className="p-4 border rounded bg-white py-4 w-100"
    >
      <div className="row g-3">
        {/* Type Selection */}
        <div className="col-sm-4">
          <label htmlFor="type" className="form-label fw-bold">
            Type
          </label>
          <select
            data-testid="type"
            className="form-select"
            id="type"
            value={type}
            onChange={(e) => {
              console.log(`Change triggered: ${e.target.value}`);
              setType(e.target.value);
            }}
          >
            <option value="" disabled>
              Select a type
            </option>
            {exerciesTypes.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Muscle Group Selection */}
        <div className="col-sm-4">
          <label htmlFor="muscle" className="form-label fw-bold">
            Muscle Group
          </label>
          <select
            data-testid="muscle"
            className="form-select"
            id="muscle"
            value={muscle}
            onChange={(e) => {
              console.log(`Change triggered: ${e.target.value}`);
              setMuscle(e.target.value);
            }}
          >
            <option value="" disabled>
              Select a muscle
            </option>
            {muscles.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Level Selection */}
        <div className="col-sm-4">
          <label htmlFor="difficulty" className="form-label fw-bold">
            Difficulty Level
          </label>
          <select
            data-testid="difficulty"
            className="form-select"
            id="difficulty"
            value={difficulty}
            onChange={(e) => {
              console.log(`Change triggered: ${e.target.value}`);
              setDifficulty(e.target.value);
            }}
          >
            <option value="" disabled>
              Select a difficulty
            </option>
            {difficultyLevels.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-sm-12 text-end">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
