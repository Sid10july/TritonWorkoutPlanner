import { render, screen, fireEvent } from "@testing-library/react";
// COMPONENTS
import App from "./App";
import { BuildYourOwn } from "./views/BuildYourOwn";
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
});
