import { useState } from "react";
import { Dropdown } from "../components/Dropdown";
import { daysOfWeek, recommendedExercises } from "../constants/constants";
import "./BuildYourOwn.css";

export const BuildYourOwn = () => {
  const [focusCategory, setFocusCategory] = useState<string>("");
  const [weeklyPlan, setWeeklyPlan] = useState<{ [day: string]: string }>({});

  const handleFocusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFocusCategory(event.target.value);
  };

  const handleExerciseChange = (day: string, exercise: string) => {
    setWeeklyPlan((prevPlan) => ({
      ...prevPlan,
      [day]: exercise,
    }));
  };

  return (
    <div className="build-your-own">
      <h1>Customize Your Own</h1>
      <iframe
        title="workout customization form"
        src="https://docs.google.com/forms/d/e/1FAIpQLSfylHzjzgcMK1vV6_vsnkynWkoBq2uxeisvXQe0RXDvLhsB1Q/viewform?usp=sharing"
      >
        Google Form
      </iframe>
      <div className="generated-plan">
        <h1>Generated Weekly Plan</h1>
        <h3>Select Focus Category:</h3>
        <Dropdown
          id="focus-category"
          options={Object.keys(recommendedExercises)}
          value={focusCategory}
          onChange={handleFocusChange}
          placeholder="Select a category"
        />
        <h3>Select Exercises for Each Day</h3>
        {daysOfWeek.map((day) => (
          <div key={day} className="day-selection">
            <label htmlFor={day}>{day}:</label>
            <Dropdown
              id={day}
              options={
                focusCategory
                  ? recommendedExercises[
                      focusCategory as keyof typeof recommendedExercises
                    ]
                  : []
              }
              value={weeklyPlan[day]}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleExerciseChange(day, e.target.value)
              }
              placeholder="Select an exercise"
            />
          </div>
        ))}
        <button> Submit</button>
      </div>
    </div>
  );
};
