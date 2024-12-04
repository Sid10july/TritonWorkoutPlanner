import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
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
  const selectedWorkouts: Exercise[] = weeklyWorkouts.find(x=>x.day===day)?.exercises || []; // EDIT1: moved from below to top
//   const [selectedWorkouts, setSelectedWorkouts] = useState<Exercise[]>([]);

  //EDIT4: Function to remove duplicates based on workout name
  const removeDuplicates = (workouts: Exercise[]) => {
    const seen = new Set();
    return workouts.filter((workout) => {
      if (seen.has(workout.name)) {
        return false; // Skip duplicate
      } else {
        seen.add(workout.name);
        return true;
      }
    });
  };
  //EDIT2: Filter out exercises that have already been added to the day
  const availableWorkouts = workouts.filter(workout => 
    !selectedWorkouts.some(selected => selected.name === workout.name)
  );
  function handleAddWorkout(key: string) {
    console.log(`Add workouts called with key: ${key}`);
    const workout = workouts.find((workout) => workout.name === key);
    if (workout) {
      // workout is found
        setWeeklyWorkouts((prevWorkouts) => {
            return prevWorkouts.map((daySchedule) => {
                if (daySchedule.day === day) {
                    // Update the day's exercises
                    if(!daySchedule.exercises.find(x=>x.name===key)){
                        return {
                            ...daySchedule,
                            exercises: [...daySchedule.exercises, workout],
                        };
                    }
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


  return (
    <div>
      <h1 className="title-container">This is the {`${day}`} planner</h1>
      <div className="content-container">
        <QueryForm setWorkouts={setWorkouts} removeDuplicates={removeDuplicates} />
        <SelectedWorkoutCards
          selectedWorkouts={selectedWorkouts}
          handleDeleteWorkout={handleDeleteWorkout}
        />
        <WorkoutCards
          workouts={availableWorkouts}  //EDIT3: Only pass the available workouts to be displayed
          handleAddWorkout={handleAddWorkout}
        />
        <Link to="/workout-planner">
            <button type="submit" className="btn btn-primary">
                Save
            </button>
        </Link>
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
    <div className="cards" 
        // style={{maxHeight:"380px", overflowY:'scroll'}}
    >
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
    <div className="selected-cards" style={{width:"100%"}}>
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
  removeDuplicates
}: {
  setWorkouts: React.Dispatch<React.SetStateAction<Exercise[]>>;
  removeDuplicates: (workouts: Exercise[]) => Exercise[];
}) {
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [noWorkoutsFound, setNoWorkoutsFound] = useState(false); // EDIT6: Track if no workouts are found

  /**
   * On form submission. Send the values of muscle, type and difficulty to fetchWorkouts function with these values.
   * @param event - Form submission event
   */
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = { type: type, muscle: muscle, difficulty: difficulty };
    try {
      const workouts: Exercise[] = await fetchWorkouts(params);
      if (workouts.length === 0) {
        setNoWorkoutsFound(true);  // No workouts found with search categories 
      } else {
        setNoWorkoutsFound(false); // Reset flag if workouts are found
        const uniqueWorkouts = removeDuplicates(workouts); // EDIT5:Filter duplicates here
        setWorkouts(uniqueWorkouts); // Set the unique list of workouts
      }
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
      {/*EDIT7: output msg when no workouts found w/ search category */}
      {noWorkoutsFound && (
        <div style={{
          marginTop: "20px",
          color: "red",
          fontSize: "16px",
          fontWeight: "bold"
        }}>
          <p>No workout found matching your search criteria.</p>
        </div>
      )}
    </form>
  );
}