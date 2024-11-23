import { useState } from "react";
import { daysOfWeek, recommendedExercises } from "../constants/constants";
import { Dropdown } from "../components/Dropdown";
import "./BuildYourOwn.css";
import { useNavigate } from "react-router-dom";

export const BuildYourOwn = () => {

  const navigate = useNavigate();
  const [focusCategory, setFocusCategory] = useState<{ [day: string]: string }>(
    {}
  );
  const [weeklyPlan, setWeeklyPlan] = useState<{ [day: string]: string }>({});
  const [startTimes, setStartTimes] = useState<{ [day: string]: string }>({});
  const [endTimes, setEndTimes] = useState<{ [day: string]: string }>({});
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

//   const handleDaySelection = (day: string) => {
//     setSelectedDays((prevDays) => ({
//       ...prevDays,
//       //selecting a day is marked as true, deselecting marks it as false
//       [day]: !prevDays[day],
//     }));
//   };

/**
 * Route to a new page where the user can select workout plans from the backend
 * @param day - day of the week that is selected
 */
  const handleDaySelection = (day: string) =>{
    
    navigate(`/build-your-own/${day}`);
  }

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
      [day]: "", //exercise for the day is cleared when focus is changed
    }));
  };

  const handleExerciseChange = (day: string, exercise: string) => {
    setWeeklyPlan((prevPlan) => ({
      ...prevPlan,
      [day]: exercise,
    }));
  };

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
          <h3>Select Days, Exercises, and Times</h3>
          <div className="days-selection">
            {daysOfWeek.map(
              (
                day //iterate through days of the week
              ) => (
                <div key={day} className="day-selection">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedDays[day]}
                      onChange={() => handleDaySelection(day)}
                    />
                    {day}
                  </label>
                  <div className="workout-details">
                    <label htmlFor={`${day}-focus`}>{day} Focus:</label>
                    <Dropdown
                      id={`${day}-focus`}
                      options={Object.keys(recommendedExercises)}
                      value={focusCategory[day]}
                      onChange={(e) => handleFocusChange(day, e)}
                      placeholder="Select a focus"
                    />
                    <label htmlFor={`${day}-exercise`}>Exercise:</label>
                    <Dropdown
                      id={`${day}-exercise`}
                      options={
                        focusCategory[day]
                          ? recommendedExercises[
                              focusCategory[
                                day
                              ] as keyof typeof recommendedExercises
                            ]
                          : []
                      }
                      value={weeklyPlan[day]}
                      onChange={(e) =>
                        handleExerciseChange(day, e.target.value)
                      }
                      placeholder="Select an exercise"
                    />
                    <label htmlFor={`${day}-start-time`}>Start Time:</label>
                    <input
                      type="time"
                      id={`${day}-start-time`}
                      value={startTimes[day]}
                      onChange={(e) =>
                        handleTimeChange(day, "start", e.target.value)
                      }
                    />
                    <label htmlFor={`${day}-end-time`}>End Time:</label>
                    <input
                      type="time"
                      id={`${day}-end-time`}
                      value={endTimes[day]}
                      onChange={(e) =>
                        handleTimeChange(day, "end", e.target.value)
                      }
                    />
                  </div>
                </div>
              )
            )}
          </div>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};
