import { useState } from "react";
import { daysOfWeek, recommendedExercises } from "../constants/constants";
import { Dropdown } from "../components/Dropdown";
import ExerciseDropdown from "../components/ExerciseDropdown";
import "./BuildYourOwn.css";

export const BuildYourOwn = () => {
  // state storing focus category for each day
  const [focusCategory, setFocusCategory] = useState<{ [day: string]: string }>(
    {}
  );
  // stores exercises selected for each day as arrays
  const [weeklyPlan, setWeeklyPlan] = useState<{ [day: string]: string[] }>({});
  // states that store start and end times
  const [startTimes, setStartTimes] = useState<{ [day: string]: string }>({});
  const [endTimes, setEndTimes] = useState<{ [day: string]: string }>({});
  //tracking selection of days
  const [selectedDays, setSelectedDays] = useState<{ [day: string]: boolean }>({
    //initialize all days as false/unchecked
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  // handles toggling the state of the day checkbox
  const handleDaySelection = (day: string) => {
    setSelectedDays((prevDays) => ({
      ...prevDays,
      //selecting a day is marked as true, deselecting marks it as false
      [day]: !prevDays[day],
    }));
  };

  // updates focus category based on selection using Dropdown component
  const handleFocusChange = (
    day: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFocusCategory((prevFocus) => ({
      ...prevFocus,
      [day]: event.target.value, //selected value from dropdown
    }));
    setWeeklyPlan((prevPlan) => ({
      ...prevPlan,
      [day]: [], //exercises for the day are cleared when focus is changed
    }));
  };

  //updates the selected exercises list for the given day
  const handleExerciseSelect = (day: string, selectedExercises: string[]) => {
    setWeeklyPlan((prevPlan) => ({
      ...prevPlan,
      [day]: selectedExercises, //update the list of selected exercises for the day
    }));
  };

  //reorders exercises when user wants to move them up or down
  const handleReorder = (
    day: string,
    sourceIndex: number,
    destinationIndex: number
  ) => {
    //do nothing if the destination index and the source are the same
    if (destinationIndex === sourceIndex) return;
    setWeeklyPlan((prevPlan) => {
      //make a copy of the previous plan containing user's selected exercises
      const updatedPlan = [...(prevPlan[day] || [])];
      //remove the item that's being moved from the list of exercises
      const [movedItem] = updatedPlan.splice(sourceIndex, 1);
      //insert the item at the new index
      updatedPlan.splice(destinationIndex, 0, movedItem);
      // return updated weekly plan with the reordered exercises for the day
      return {
        ...prevPlan,
        [day]: updatedPlan, //update the plan for the day
      };
    });
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
      //time type is 'end'
      setEndTimes((prevTimes) => ({
        ...prevTimes,
        [day]: timeValue,
      }));
    }
  };

  return (
    <div className="build-your-own">
      <h1 className="title-container">Customize Your Plan</h1>
      <div className="content-container">
        <div className="customize-plan">
          <h3 className="mb-5">Select Days, Exercises, and Times</h3>
          <div className="days-selection">
            {daysOfWeek.map(
              (
                day //iterate through days of the week
              ) => (
                <div
                  key={day}
                  className="day-selection"
                  data-testid={`${day}-plan`}
                >
                  <label>
                    <input
                      type="checkbox"
                      data-testid={`${day}-checkbox`}
                      checked={selectedDays[day]}
                      onChange={() => handleDaySelection(day)}
                    />
                    {day}
                  </label>
                  <div className="workout-details">
                    <div className="details-section">
                      <label htmlFor={`${day}-focus`}>{day} Focus:</label>
                      <Dropdown
                        id={`${day}-focus`}
                        options={Object.keys(recommendedExercises)} // focus categories from dummy recommended exercises
                        value={focusCategory[day]} //set to currently selected focus
                        onChange={(e) => handleFocusChange(day, e)} //update focus category on change
                        placeholder="Select a focus"
                        disabled={!selectedDays[day]} // can't edit dropdown if day isn't selected
                      />
                    </div>
                    <div className="exercise-section">
                      {/* Displays dropdown for exercises based on the user's selected focus category.
                      User must first select a focus category to see the list of exercises.
                      Can reorder exercises and set reps count. */}
                      {
                        <ExerciseDropdown
                          day={day} //pass name of the day
                          options={
                            focusCategory[day]
                              ? // display exercise list for the selected focus category
                                recommendedExercises[
                                  focusCategory[
                                    day
                                  ] as keyof typeof recommendedExercises
                                ]
                              : [] // empty array of exercises if no focus category is selected
                          }
                          selectedExercises={weeklyPlan[day] || []} //list of selected exercises for the day
                          onSelect={handleExerciseSelect} //handles adding or removing exercises for the day
                          onReorder={handleReorder} //handles reordering exercises
                          noFocusPlaceholder="Please select a focus first" //displayed when no focus category is selected
                          disabled={!selectedDays[day]} //can't edit dropdown when the day isn't selected
                        />
                      }
                    </div>
                    <div className="times-section">
                      <label htmlFor={`${day}-start-time`}>Start Time:</label>
                      <input
                        type="time"
                        id={`${day}-start-time`}
                        data-testid={`${day}-start-time`}
                        value={startTimes[day]} //currently selected start time
                        onChange={(e) =>
                          handleTimeChange(day, "start", e.target.value)
                        }
                        disabled={!selectedDays[day]} //can't update time if day isn't selected
                      />
                      <label htmlFor={`${day}-end-time`}>End Time:</label>
                      <input
                        type="time"
                        id={`${day}-end-time`}
                        data-testid={`${day}-end-time`}
                        value={endTimes[day]} //currently selected end time
                        onChange={(e) =>
                          handleTimeChange(day, "end", e.target.value)
                        }
                        disabled={!selectedDays[day]} //can't update time if day isn't selected
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <button className="submit-button">Submit</button>
      </div>
    </div>
  );
};
