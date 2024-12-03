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
  const { day } = useParams<{ day: string }>(); // Enforces 'day' to always be a string
  const { weeklyWorkouts, setWeeklyWorkouts, setModifiedDays } = useContext(WorkoutsContext);
  const [workouts, setWorkouts] = useState<Exercise[]>([]);

  if (!day) {
    throw new Error("Day parameter is required."); // Ensure day exists
  }

  const selectedWorkouts: Exercise[] =
    weeklyWorkouts.find((x) => x.day === day)?.exercises || [];

  function handleAddWorkout(key: string) {
    const workout = workouts.find((workout) => workout.name === key);
    if (workout) {
      setWeeklyWorkouts((prevWorkouts) =>
        prevWorkouts.map((daySchedule) =>
          daySchedule.day === day
            ? {
                ...daySchedule,
                exercises: [...daySchedule.exercises, workout],
              }
            : daySchedule
        )
      );
    }
  }

  function handleDeleteWorkout(key: string) {
    setWeeklyWorkouts((prevWorkouts) =>
      prevWorkouts.map((daySchedule) =>
        daySchedule.day === day
          ? {
              ...daySchedule,
              exercises: daySchedule.exercises.filter((x) => x.name !== key),
            }
          : daySchedule
      )
    );
  }

  async function handleSave() {
    if (!day) {
        alert("Day is undefined!");
        return;
    }

    const selectedWorkouts = weeklyWorkouts.find((x) => x.day === day)?.exercises || [];

    const requestBody = {
        day,
        exercises: selectedWorkouts,
        startTime: "12:00",
        endTime: "12:00",
    };

    console.log("Request body for saving workout plan:", requestBody);

    try {
        const response = await fetch("http://localhost:8080/api/workoutPlans/day", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Error response from server:", error);
            throw new Error("Failed to save workout plan");
        }

        const data = await response.json();
        console.log("Workout plan saved successfully:", data);
        alert("Workout plan saved successfully!");
    } catch (error) {
        console.error("Error saving workout plan:", error);
        alert("Error saving workout plan.");
    }
}

  return (
    <div>
      <h1 className="title-container">This is the {`${day}`} planner</h1>
      <div className="content-container">
        <QueryForm setWorkouts={setWorkouts} />
<!-- <<<<<<< Integrating-workouts-page-with-server
        <SelectedWorkoutCards
          selectedWorkouts={selectedWorkouts}
          handleDeleteWorkout={handleDeleteWorkout}
        />
        <WorkoutCards
          workouts={workouts}
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
<!--       {selectedWorkouts.map((workout) => (
        <WorkoutsSelected
          workout={workout}
          handleDeleteWorkout={handleDeleteWorkout}
        />
      ))} -->
        <div className="selected-cards">
          {selectedWorkouts.map((workout) => (
            <WorkoutsSelected
              key={workout.name}
              workout={workout}
              handleDeleteWorkout={handleDeleteWorkout}
            />
          ))}
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
        </div>
        <div className="cards">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.name}
              workout={workout}
              handleAddWorkout={handleAddWorkout}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function QueryForm({
  setWorkouts,
}: {
  setWorkouts: React.Dispatch<React.SetStateAction<Exercise[]>>;
}) {
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = { type, muscle, difficulty };
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
        <div className="col-sm-4">
          <label htmlFor="type" className="form-label fw-bold">
            Type
          </label>
          <select
            data-testid="type"
            className="form-select"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
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
        <div className="col-sm-4">
          <label htmlFor="muscle" className="form-label fw-bold">
            Muscle Group
          </label>
          <select
            data-testid="muscle"
            className="form-select"
            id="muscle"
            value={muscle}
            onChange={(e) => setMuscle(e.target.value)}
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
        <div className="col-sm-4">
          <label htmlFor="difficulty" className="form-label fw-bold">
            Difficulty Level
          </label>
          <select
            data-testid="difficulty"
            className="form-select"
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
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
        <div className="col-sm-12 text-end">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}