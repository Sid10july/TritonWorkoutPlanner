import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
// COMPONENTS
import App from "./App";
import { BuildYourOwn } from "./views/BuildYourOwn";
import ExerciseCheckbox from "./components/ExerciseCheckbox";
// CONSTANTS
import { daysOfWeek, recommendedExercises } from "./constants/constants";

describe("Customize Workout Plan Tests", () => {
  test("all days initialized as unchecked", () => {
    render(<BuildYourOwn />);

    daysOfWeek.forEach((day) => {
      //iterate through days of the week
      const checkbox = screen.getByLabelText(day);
      //day should be unchecked
      expect(checkbox).not.toBeChecked();
    });
  });

  test("Checking a day sets it as checked, unchecking a day sets it as unchecked", () => {
    render(<BuildYourOwn />);
    const fridayCheckbox = screen.getByLabelText("Friday");

    //should be initially unchecked
    expect(fridayCheckbox).not.toBeChecked();

    //simulate checking the box for Friday
    fireEvent.click(fridayCheckbox);

    //checkbox for Friday should be checked now
    expect(fridayCheckbox).toBeChecked();

    //simulate unchecking the box for Friday
    fireEvent.click(fridayCheckbox);

    //checkbox for Friday should go back to being unchecked
    expect(fridayCheckbox).not.toBeChecked();
  });

  test("Setting start and end time for a day works as intended", () => {
    render(<BuildYourOwn />);

    const day = daysOfWeek[0]; //day is set to Monday

    //select the HTMLElement using the ID of Monday's start time and end time
    const startTime = document.querySelector(
      `#${day}-start-time`
    ) as HTMLInputElement;
    const endTime = document.querySelector(
      `#${day}-end-time`
    ) as HTMLInputElement;

    fireEvent.change(startTime, { target: { value: "08:00" } });
    fireEvent.change(endTime, { target: { value: "09:00" } });

    // value reflects what was inputted by user
    expect(startTime.value).toBe("08:00");
    expect(endTime.value).toBe("09:00");
  });

  test("Selecting focus category for a day updates values correctly", () => {
    render(<BuildYourOwn />);

    const day = daysOfWeek[0]; //day is set to Monday
    const focuses = Object.keys(recommendedExercises); //get list of all focuses
    const focus = focuses[0]; //the focus is set to Cardio

    //change the dropdown selection to the specified focus
    const focusDropdown = screen.getByLabelText(`${day} Focus:`);
    fireEvent.change(focusDropdown, { target: { value: focus } });

    //ensure focus category state is updated
    expect(focusDropdown).toHaveValue(focus);
  });

  test('exercise checkbox component is rendered as expected', () => {
    const focuses = Object.keys(recommendedExercises) //get list of all focuses
    const focus = focuses[1] //Strength focus category selected
    //assert that 'focus' is a valid key of 'recommendedExercises'
    const exercise = recommendedExercises[focus as keyof typeof recommendedExercises][0]; //'Push-ups' selected
    const day = daysOfWeek[2]; //Wednesday selected
    const isChecked = false;
    const onToggle = jest.fn();

    render(<ExerciseCheckbox day={day} exercise={exercise} isChecked={isChecked} onToggle={onToggle} />);

    // checkbox and label should be displayed
    const checkbox = screen.getByLabelText(exercise);
    const label = screen.getByText(exercise);

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox is checked when isChecked is true', () => {
    const focuses = Object.keys(recommendedExercises) //get list of all focuses
    const focus = focuses[1] //Strength focus category selected
    //assert that 'focus' is a valid key of 'recommendedExercises'
    const exercise = recommendedExercises[focus as keyof typeof recommendedExercises][0]; //'Push-ups' selected
    const day = daysOfWeek[2]; //Wednesday selected
    const isChecked = true;
    const onToggle = jest.fn();

    render(<ExerciseCheckbox day={day} exercise={exercise} isChecked={isChecked} onToggle={onToggle} />);

    const checkbox = screen.getByLabelText(exercise);
    expect(checkbox).toBeChecked();
  });

  test('weekly plan with exercises is updated with user selection', () => {
    render(<BuildYourOwn />);
    const day = daysOfWeek[3]; 
    //select Thursday's checkbox
    const thursdayCheckbox = screen.getByLabelText(day);
    fireEvent.click(thursdayCheckbox);

    // select focus category for Thursday
    const focusSelect = screen.getByLabelText(`${day} Focus:`);
    const focuses = Object.keys(recommendedExercises) //get list of all focuses
    const focus = focuses[2] //Flexibility focus category selected
    fireEvent.change(focusSelect, { target: { value: focus } });
    const exercise1 = recommendedExercises[focus as keyof typeof recommendedExercises][0]; 
    const exercise2 = recommendedExercises[focus as keyof typeof recommendedExercises][1]; 
    const exercise3 = recommendedExercises[focus as keyof typeof recommendedExercises][2]; 

    // retrieve the exercise options and ensure they're displayed
    const exerciseOption1 = screen.getByLabelText(exercise1); 
    const exerciseOption2 = screen.getByLabelText(exercise2); 
    const exerciseOption3 = screen.getByLabelText(exercise3); 

    expect(exerciseOption1).toBeInTheDocument();
    expect(exerciseOption2).toBeInTheDocument();
    expect(exerciseOption3).toBeInTheDocument();

    fireEvent.click(exerciseOption1); //select the first option ('Yoga')

    expect(exerciseOption1).toBeChecked();

    //weekly plan for Thursday should include the selected exercise ('Yoga')
    expect(screen.getByTestId(`${day}-plan`)).toHaveTextContent(exercise1);
  });
});

describe("Sidebar Tests", () => {
  test("Clicking a tab on the sidebar directs you to the specified page", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Click on exercise library button
    const exerciseLibraryButton = screen.getByText("Exercise Library");
    fireEvent.click(exerciseLibraryButton);

    // Expect to see "Exercise Library" twice (first in the sidebar, and second as a page header)
    const exerciseLibraryTitle = screen.getAllByText("Exercise Library");
    expect(exerciseLibraryTitle.length).toBe(2);
  });

  test("Click on the sidebar's account info button to see the log out option", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Click on account info button
    const accountButton = screen.getByText("Streak", { exact: false });
    fireEvent.click(accountButton);

    // Should now be able to see the "Log Out" option
    const logOutButton = screen.getByText("Log Out");
    expect(logOutButton).toBeInTheDocument();
  });
});
