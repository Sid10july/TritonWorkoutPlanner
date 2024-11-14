import { useState } from "react";
import { daysOfWeek, recommendedExercises } from "../constants/constants";
import { Dropdown } from "../components/Dropdown";
import ExerciseCheckbox from "../components/ExerciseCheckbox";
import "./BuildYourOwn.css";

export const BuildYourOwn = () => {
  // state storing focus category for each day
  const [focusCategory, setFocusCategory] = useState<{ [day: string]: string }>({});
  // stores exercises selected for each day as arrays
  const [weeklyPlan, setWeeklyPlan] = useState<{ [day: string]: string[] }>({});
  // states that store start and end times 
  const [startTimes, setStartTimes] = useState<{ [day: string]: string }>({});
  const [endTimes, setEndTimes] = useState<{ [day: string]: string }>({});
  //tracking selection of days
  const [selectedDays, setSelectedDays] = useState<{ [day: string]: boolean}>({
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
      setSelectedDays(prevDays => ({
          ...prevDays,
          //selecting a day is marked as true, deselecting marks it as false
          [day]: !prevDays[day],
      }));
  };
  
  // updates focus category based on selection using Dropdown component
  const handleFocusChange = (day: string, event: React.ChangeEvent<HTMLSelectElement>) => {
      setFocusCategory(prevFocus => ({
          ...prevFocus,
          [day]: event.target.value, //selected value from dropdown
      }));
      setWeeklyPlan(prevPlan => ({
          ...prevPlan,
          [day]: [], //exercises for the day are cleared when focus is changed
      }));
  };

  //function adds or removes exercise for specified day when exercise checkbox is toggled
  const handleExerciseChange = (day: string, exercise: string) => {
      setWeeklyPlan(prevPlan => {
          //retrieve list of exercises currently selected for the day
          const currentExercises = prevPlan[day];  
          const updatedExercises = currentExercises.includes(exercise)
              // if exercise is in the list of current exercises, remove it
              ? currentExercises.filter(e => e !== exercise)
              // otherwise, add it to the current list of exercises
              : [...currentExercises, exercise];
          return {
              ...prevPlan,
              // updates the day's exercises with the new list
              [day]: updatedExercises,
          };
      });
  };

  // sets start or end times for a specific day
  const handleTimeChange = (day: string, timeType: 'start' | 'end', timeValue: string) => {
      if (timeType === 'start') {
          setStartTimes(prevTimes => ({
              ...prevTimes,
              [day]: timeValue,
          }));
      } else { //time type is 'end'
          setEndTimes(prevTimes => ({
              ...prevTimes,
              [day]: timeValue,
          }));
      }
  };

  return (
      <div className="build-your-own">
          <div className="customize-plan">
              <h1>Customize Your Plan</h1>
              <h3>Select Days, Exercises, and Times</h3>
              <div className="days-selection">
                  {daysOfWeek.map(day => ( //iterate through days of the week
                      <div key={day} className="day-selection" data-testid={`${day}-plan`}>
                          <label>
                              <input type="checkbox" checked={selectedDays[day]} onChange={() => handleDaySelection(day)} />
                              {day}
                          </label>
                          <div className="workout-details">
                              <label htmlFor={`${day}-focus`}>{day} Focus:</label> 
                              <Dropdown
                                  id={`${day}-focus`}
                                  options={Object.keys(recommendedExercises)} // focus categories from dummy recommended exercises
                                  value={focusCategory[day]} //set to currently selected focus
                                  onChange={(e) => handleFocusChange(day, e)} //update focus category on change
                                  placeholder="Select a focus"
                              />
                              <label htmlFor={`${day}-exercise`}> {day} Exercises:</label>
                              {/* Displays checkboxes for exercises based on the user's selected focus category.
                                  User must first select a focus category to see the list of exercises. */}
                              {
                                  focusCategory[day] && 
                                  recommendedExercises[
                                      focusCategory[day] as keyof typeof recommendedExercises
                                  ].map(exercise => (
                                      <ExerciseCheckbox
                                          key={exercise}
                                          day={day}
                                          exercise={exercise}
                                          /* isChecked is true if exercise is present in exercise list for the specified day.
                                              Otherwise false. */
                                          isChecked={weeklyPlan[day].includes(exercise)}
                                          onToggle={(e) => handleExerciseChange(day, e)} //updates exercise list on toggle 
                                      />)
                                  )
                              }
                              <label htmlFor={`${day}-start-time`}>Start Time:</label>
                              <input
                                  type="time"
                                  id={`${day}-start-time`}
                                  value={startTimes[day]} //currently selected start time
                                  onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                              />
                              <label htmlFor={`${day}-end-time`}>End Time:</label>
                              <input
                                  type="time"
                                  id={`${day}-end-time`}
                                  value={endTimes[day]} //currently selected end time
                                  onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                              />
                          </div>
                      </div>
                  ))}
              </div>
              <button>Submit</button>
          </div>
      </div>
  );
};