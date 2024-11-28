import { useState } from "react";
import { daysOfWeek } from "../constants/constants";
import "./BuildYourOwn.css";
import { Link, useLocation } from "react-router-dom";
import { Exercise } from '../types/types';

export const BuildYourOwn = () => {
  const location = useLocation();
  const { selectedWorkouts } = location.state || {}; // Extract selectedWorkouts from state
  // states that store start and end times
  const [startTimes, setStartTimes] = useState<{ [day: string]: string }>({});
  const [endTimes, setEndTimes] = useState<{ [day: string]: string }>({});
  // tracking selection of days and workouts for each day
  const [selectedDays, setSelectedDays] = useState<{ [day: string]: { selected: boolean, workouts: Exercise[] } }>({
    Monday: { selected: false, workouts: [] },
    Tuesday: { selected: false, workouts: [] },
    Wednesday: { selected: false, workouts: [] },
    Thursday: { selected: false, workouts: [] },
    Friday: { selected: false, workouts: [] },
    Saturday: { selected: false, workouts: [] },
    Sunday: { selected: false, workouts: [] },
  });

  const [visibleInstructions, setVisibleInstructions] = useState<{ [workoutName: string]: boolean }>({}); // allow instruction hiding

  /**
   * Route to a new page where the user can select workout plans from the backend
   * @param day - day of the week that is selected
   */
  const handleDaySelection = (day: string) => {
    setSelectedDays((prevDays) => ({
        ...prevDays,
        [day]: {
          ...prevDays[day],
          selected: !prevDays[day].selected,
        },
      }));
  };

  // sets start or end times for a specific day
  const handleTimeChange = (
    day: string,
    timeType: "start" | "end",
    timeValue: string
  ) => {
    if (timeType === "start") {
      setStartTimes((prevTimes) => ({
        ...prevTimes,
        [day]: timeValue,
      }));
    } else {
      setEndTimes((prevTimes) => ({
        ...prevTimes,
        [day]: timeValue,
      }));
    }
  };

  // Toggle visibility of workout instructions
  const toggleInstructions = (workoutName: string) => {
    setVisibleInstructions((prevState) => ({
      ...prevState,
      [workoutName]: !prevState[workoutName],
    }));
  };

  // assigning a workout to a specific day
  const handleWorkoutAssignment = (day: string, workout: Exercise) => {
    setSelectedDays((prevDays) => {
      const dayWorkouts = prevDays[day].workouts;
      const updatedWorkouts = dayWorkouts.includes(workout)
        ? dayWorkouts.filter(w => w !== workout) // Remove workout if already present
        : [...dayWorkouts, workout]; // Add workout if not present
  
      return {
        ...prevDays,
        [day]: { ...prevDays[day], workouts: updatedWorkouts },
      };
    });
  };  

  return (
    <div className="build-your-own">
      <h1 className="title-container">Customize Your Plan</h1>
      <div className="content-container">
        <div className="customize-plan">
          <h3 className="mb-5">Select Days, Exercises, and Times</h3>
          <strong>README:</strong>
          <p> click on "Search Workouts" ONCE and add ALL the exercises you think you would like to do for the entire week before clicking "submit"(bottom of page).</p>
          <div className="selectedWorkouts">
          <Link to={`/build-your-own/exercise`}>
                    <label>Search Workouts</label>
          </Link>
            <h4>Selected Workouts:</h4>
            {selectedWorkouts && selectedWorkouts.length > 0 ? (
              <ul>
                {selectedWorkouts.map((workout: Exercise) => (
                  <li key={workout.name}>
                    <div>
                      <strong>{workout.name}</strong>
                      <button
                        onClick={() => toggleInstructions(workout.name)}
                        className="show-instruction"
                      >
                        Show Instruction
                      </button>

                      {/* Display instructions if visible */}
                      {visibleInstructions[workout.name] && (
                        <p className="workout-instruction">
                          {workout.instructions}
                        </p>
                      )}
                    </div>

                    {/* Assign this workout to a day */}
                    <div className="workout-day-selection">
                      {daysOfWeek.map((day) => (
                        <label key={day}>
                          <input
                            type="checkbox"
                            checked={selectedDays[day].workouts.includes(workout)}
                            onChange={() => handleWorkoutAssignment(day, workout)}
                          />
                          {day}
                        </label>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No workouts selected</p>
            )}
          </div>
          <div className="days-selection">
            {daysOfWeek.map((day) => (
              <div key={day} className="day-selection" data-testid={`${day}-plan`}>
                <label>
                  <input
                    type="checkbox"
                    data-testid={`${day}-checkbox`}
                    checked={selectedDays[day].selected}
                    onChange={() => handleDaySelection(day)}
                  />
                  {day}
                </label>
                
                {selectedDays[day].selected && (
                  <div className="workout-details">
                    <h5>Assigned Workouts for {day}:</h5>
                    <ul>
                      {selectedDays[day].workouts.map((workout: Exercise) => (
                        <li key={workout.name}>{workout.name}</li>
                      ))}
                    </ul>
                    <div className="times-section">
                      <label htmlFor={`${day}-start-time`}>Start Time:</label>
                      <input
                        type="time"
                        id={`${day}-start-time`}
                        data-testid={`${day}-start-time`}
                        value={startTimes[day]} // Currently selected start time
                        onChange={(e) =>
                          handleTimeChange(day, "start", e.target.value)
                        }
                      />
                      <label htmlFor={`${day}-end-time`}>End Time:</label>
                      <input
                        type="time"
                        id={`${day}-end-time`}
                        data-testid={`${day}-end-time`}
                        value={endTimes[day]} // Currently selected end time
                        onChange={(e) =>
                          handleTimeChange(day, "end", e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
};
