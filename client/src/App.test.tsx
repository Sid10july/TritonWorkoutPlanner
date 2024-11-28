import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
// COMPONENTS
import App from "./App";
import { BuildYourOwn } from "./views/BuildYourOwn";
import { WorkoutCalendar } from "./views/WorkoutCalender";
// CONSTANTS
import { daysOfWeek, recommendedExercises, dummySchedule } from "./constants/constants";
import { DayPlanner } from "./views/DayPlanner";
import { fetchWorkouts } from "./utils/workout-utils";

describe("Customize Workout Plan Tests", () => {
  test("all days initialized as unchecked", () => {
    render(
    <BrowserRouter>
      <BuildYourOwn />
    </BrowserRouter>
  );

    daysOfWeek.forEach((day) => {
      //iterate through days of the week
      const checkbox = screen.getByLabelText(day);
      //day should be unchecked
      expect(checkbox).not.toBeChecked();
    });
  });

  test("Checking a day sets it as checked, unchecking a day sets it as unchecked", () => {
    render(
    <BrowserRouter>
      <BuildYourOwn />
    </BrowserRouter>
  );
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
    render(
    <BrowserRouter>
      <BuildYourOwn />
    </BrowserRouter>
  );

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
    render(
    <BrowserRouter>
      <BuildYourOwn />
    </BrowserRouter>
  );

    const day = daysOfWeek[0]; //day is set to Monday
    const focuses = Object.keys(recommendedExercises); //get list of all focuses
    const focus = focuses[0]; //the focus is set to Cardio

    //change the dropdown selection to the specified focus
    const focusDropdown = screen.getByLabelText(`${day} Focus:`);
    fireEvent.change(focusDropdown, { target: { value: focus } });

    //ensure focus category state is updated
    expect(focusDropdown).toHaveValue(focus);
  });

  test("selected exercises display properly", () => {
    render(
    <BrowserRouter>
      <BuildYourOwn />
    </BrowserRouter>
  ); //render component

    const day = daysOfWeek[0]; // day set to Monday
    //retrieve Monday's focus category dropdown
    const focusDropdown = screen.getByLabelText(`${day} Focus:`);
    const focus = Object.keys(recommendedExercises)[0]; // set focus to first category ('cardio')

    // set the focus category to cardio
    fireEvent.change(focusDropdown, { target: { value: focus } });

    // add first exercise from the cardio focus
    const exerciseDropdown = screen.getByTestId(`${day}-exercise-dropdown`);
    fireEvent.change(exerciseDropdown, {
      target: { value: recommendedExercises[focus as keyof typeof recommendedExercises][0] },
    });

    // ensure that the selected exercise is displayed to the user
    expect(screen.getByText(recommendedExercises[focus as keyof typeof recommendedExercises][0])).toBeInTheDocument();
  });

  test("removing an exercise from the selected exercises updates user's list of selected exercises", () => {
    render(
    <BrowserRouter>
      <BuildYourOwn />
    </BrowserRouter>
  ); //render componenet

    const day = daysOfWeek[0]; // set day to be Monday
    //retrieve Monday's focus category dropdown
    const focusDropdown = screen.getByLabelText(`${day} Focus:`);
    //select day first
    const dayCheckbox = screen.getByTestId(`${day}-checkbox`);
    fireEvent.click(dayCheckbox);

    const focus = Object.keys(recommendedExercises)[0]; // set focus to first category (cardio)

    // set the focus category to be cardio
    fireEvent.change(focusDropdown, { target: { value: focus } });

    // add the first exercise from dropdown to the selected exercises list
    const exerciseDropdown = screen.getByTestId(`${day}-exercise-dropdown`);
    const exercise = recommendedExercises[focus as keyof typeof recommendedExercises][0];
    fireEvent.change(exerciseDropdown, { target: { value: exercise } });

    // the exercise should be displayed in the selected exercises list
    const exerciseList = screen.getByTestId(`${day}-exercise-list`);
    expect(screen.getByText(exercise)).toBeInTheDocument();

    // remove the exercise from the selected exercises list
    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);

    // ensure that the exercise isn't in selected exercises list
    expect(within(exerciseList).queryByText(exercise)).not.toBeInTheDocument();
    //exercise should return to the dropdown as an option of exercises to add
    expect(screen.getByRole("option", { name: exercise })).toBeInTheDocument();
  });

  test("reordering the exercises works as intended", ()=> {
    render(
    <BrowserRouter>
      <BuildYourOwn />
    </BrowserRouter>
  ); //render component

    const day = daysOfWeek[0]; // set the day to be Monday
    //select day first
    const dayCheckbox = screen.getByTestId(`${day}-checkbox`);
    fireEvent.click(dayCheckbox);

    //retrieve Monday's focus category dropdown
    const focusDropdown = screen.getByLabelText(`${day} Focus:`);
    // set the focus category to the first category (cardio)
    const focus = Object.keys(recommendedExercises)[0];

    // set the focus category to be cardio
    fireEvent.change(focusDropdown, { target: { value: focus } });

    // add two exercises to the list of selected exercises
    const exerciseDropdown = screen.getByTestId(`${day}-exercise-dropdown`);
    //'Running'
    const exercise1 = recommendedExercises[focus as keyof typeof recommendedExercises][0];
    //'Cycling'
    const exercise2 = recommendedExercises[focus as keyof typeof recommendedExercises][1];
    fireEvent.change(exerciseDropdown, { target: { value: exercise1 } });
    fireEvent.change(exerciseDropdown, { target: { value: exercise2 } });

    // move the second exercise to the top of the list
    const upButton = screen.getAllByText("↑")[1];
    fireEvent.click(upButton);

    // check that the order is as expected
    const exerciseItems = screen.getAllByRole("listitem");
    expect(exerciseItems[0]).toHaveTextContent(exercise2);
    expect(exerciseItems[1]).toHaveTextContent(exercise1);
  });

  test("amount of reps inputted by the user is updated and displayed as expected", () => {
    render(
    <BrowserRouter>
      <BuildYourOwn />
    </BrowserRouter>
  ); 

    const day = daysOfWeek[0]; // set the day to be Monday
    //select day first
    const dayCheckbox = screen.getByTestId(`${day}-checkbox`);
    fireEvent.click(dayCheckbox);
    //retrieve Monday's focus category dropdown
    const focusDropdown = screen.getByLabelText(`${day} Focus:`);
    // set focus to first category (cardio)
    const focus = Object.keys(recommendedExercises)[0]; 

    // set the focus category to cardio
    fireEvent.change(focusDropdown, { target: { value: focus } });

    // add an exercise to list of selected exercises
    const exerciseDropdown = screen.getByTestId(`${day}-exercise-dropdown`);
    //retrieve the first exercise from the list
    const exercise = recommendedExercises[focus as keyof typeof recommendedExercises][0];
    fireEvent.change(exerciseDropdown, { target: { value: exercise } });

    // update the number of repetitions to 15
    const repsInput = screen.getByLabelText("Reps:");
    fireEvent.change(repsInput, { target: { value: "15" } });

    // ensure that the value of reps has been changed to 15
    expect(repsInput).toHaveValue(15);
  });

  test("focus dropdown should be disabled until the day is selected", () => {
    render(
    <BrowserRouter>
      <BuildYourOwn />
    </BrowserRouter>
  );

    const day = daysOfWeek[0]; // select day to be monday
    //retrieve Monday's focus dropdown
    const focusDropdown = screen.getByLabelText(`${day} Focus:`);

    // ensure that the dropdown is disabled since Monday has yet been selected
    expect(focusDropdown).toBeDisabled();

    // select the checkbox for Monday
    const dayCheckbox = screen.getByTestId(`${day}-checkbox`);
    fireEvent.click(dayCheckbox);

    // ensure the dropdown is now enabled after Monday is selected
    expect(focusDropdown).not.toBeDisabled();
  });

  test("exercise dropdown and state/end times are disabled until a day is selected", () => {
    render(
    <BrowserRouter>
      <BuildYourOwn />
    </BrowserRouter>
  );

    const day = daysOfWeek[0]; // select day to be Monday
    //retrieve the exercise dropdown for Monday
    const exerciseDropdown = screen.getByTestId(`${day}-exercise-dropdown`);
    //retrieve start and end times for Monday
    const startTimeInput = screen.getByTestId(`${day}-start-time`);
    const endTimeInput = screen.getByTestId(`${day}-end-time`);

    // make sure exercise dropdown and time inputs are disabled before day selection
    expect(exerciseDropdown).toBeDisabled();
    expect(startTimeInput).toBeDisabled();
    expect(endTimeInput).toBeDisabled();

    // select the checkbox for Monday
    const dayCheckbox = screen.getByTestId(`${day}-checkbox`);
    fireEvent.click(dayCheckbox);
    //retrieve Monday's focus dropdown
    const focusDropdown = screen.getByLabelText(`${day} Focus:`);
    // set the focus category to the first category (cardio)
    const focus = Object.keys(recommendedExercises)[0];

    // set the focus category to be cardio
    fireEvent.change(focusDropdown, { target: { value: focus } });

    // make sure exercise dropdown and time inputs are no longer disabled after day and focus selection
    expect(exerciseDropdown).not.toBeDisabled();
    expect(startTimeInput).not.toBeDisabled();
    expect(endTimeInput).not.toBeDisabled();
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
    const accountButton = screen.getByText("🔥", { exact: false });
    fireEvent.click(accountButton);

    // Should now be able to see the "Log Out" option
    const logOutButton = screen.getByText("Log Out");
    expect(logOutButton).toBeInTheDocument();
  });
});

describe("WorkoutCalendar Tests", () => {
  test("WorkoutCalendar renders title and button as expected", () => {
    render(<WorkoutCalendar />);
    const title = "Workout Calendar"
  
    // title displays as expected 
    expect(screen.getByText(title)).toBeInTheDocument();
  
    // ensure export button is rendered on the screen
    const exportButton = screen.getByText("Export to Google Calendar");
    expect(exportButton).toBeInTheDocument();
  });

  test("WorkoutCalendar renders the events in the dummy schedule as expected", () => {
    render(<WorkoutCalendar />);

    // make sure the event titles in the dummy schedule are displayed in the calendar
    dummySchedule.forEach((workout) => {
      expect(screen.getByText(workout.title)).toBeInTheDocument();
    });
  });

  test("ensure that the alert message shows when an event is clicked", () => {
    render(<WorkoutCalendar />);

    window.alert = jest.fn();

    // get the title, start, and end time for the first event in dummy schedule
    const eventTitle = dummySchedule[0].title; 
    const eventStart = dummySchedule[0].start; 
    const eventEnd = dummySchedule[0].end; 

    // click on the event
    fireEvent.click(screen.getByText(eventTitle));

    //ensure that the alert was called with the expected details for that event
    expect(window.alert).toHaveBeenCalledWith(
      `Event: ${eventTitle}\nStart: ${new Date(eventStart).toString()}\nEnd: ${new Date(eventEnd).toString()}`
    );
  });
});

describe("Filter Workouts page tests",()=>{
    test("Fetching Workouts",async ()=>{
        render(
            <BrowserRouter>
                <DayPlanner/>
            </BrowserRouter>
        );

        const search = screen.getByText("Search");
        expect(search).toBeInTheDocument();
        fireEvent.click(search);
        await fetchWorkouts({});
        
        await waitFor(() => {
            expect(screen.getByText('Rickshaw Carry')).toBeInTheDocument();
            expect(screen.getByText('Single-Leg Press')).toBeInTheDocument();
            expect(screen.getByText('Landmine twist')).toBeInTheDocument();
            expect(screen.getByText('Weighted pull-up')).toBeInTheDocument();
            expect(screen.getByText('T-Bar Row with Handle')).toBeInTheDocument();
            expect(screen.getByText('Palms-down wrist curl over bench')).toBeInTheDocument();
            expect(screen.getByText('Atlas Stones')).toBeInTheDocument();
            expect(screen.getByText('Dumbbell front raise to lateral raise')).toBeInTheDocument();
            expect(screen.getByText('Clean from Blocks')).toBeInTheDocument();
            expect(screen.getByText('Incline Hammer Curls')).toBeInTheDocument();
        })
    });

    test("Fetching workouts by strength",async()=>{
        render(
            <BrowserRouter>
                <DayPlanner/>
            </BrowserRouter>
        );
        const type = screen.getByTestId("type");
        fireEvent.change(type,{target:{value: "strength"}}); // sets value to strength

        const search = screen.getByText("Search");
        expect(search).toBeInTheDocument();
        fireEvent.click(search);
        await fetchWorkouts({});

        await waitFor(() => {
            expect(screen.getByText('Dumbbell front raise to lateral raise')).toBeInTheDocument();
            expect(screen.getByText('Single-Leg Press')).toBeInTheDocument();
            expect(screen.getByText('Landmine twist')).toBeInTheDocument();
            expect(screen.getByText('Weighted pull-up')).toBeInTheDocument();
            expect(screen.getByText('T-Bar Row with Handle')).toBeInTheDocument();
            expect(screen.getByText('Palms-down wrist curl over bench')).toBeInTheDocument();
            expect(screen.getByText('Incline Hammer Curls')).toBeInTheDocument();
            expect(screen.getByText('Straight-bar wrist roll-up')).toBeInTheDocument();
            expect(screen.getByText('Clean and press')).toBeInTheDocument();
            expect(screen.getByText('Triceps dip')).toBeInTheDocument();
        })
    });

    test("Fetching workouts by strength and biceps",async()=>{
        render(
            <BrowserRouter>
                <DayPlanner/>
            </BrowserRouter>
        );
        const type = screen.getByTestId("type");
        fireEvent.change(type,{target:{value: "strength"}}); // sets value to strength
        const muscle = screen.getByTestId("muscle");
        fireEvent.change(muscle,{target:{value: "biceps"}}); // sets value to strength

        const search = screen.getByText("Search");
        expect(search).toBeInTheDocument();
        fireEvent.click(search);
        await fetchWorkouts({});

        await waitFor(() => {
            expect(screen.getByText('Incline Hammer Curls')).toBeInTheDocument();
            expect(screen.getByText('Wide-grip barbell curl')).toBeInTheDocument();
            expect(screen.getByText('EZ-bar spider curl')).toBeInTheDocument();
            expect(screen.getByText('Hammer Curls')).toBeInTheDocument();
            expect(screen.getByText('EZ-Bar Curl')).toBeInTheDocument();
            expect(screen.getByText('Zottman Curl')).toBeInTheDocument();
            expect(screen.getByText('Biceps curl to shoulder press')).toBeInTheDocument();
            expect(screen.getByText('Barbell Curl')).toBeInTheDocument();
            expect(screen.getByText('Concentration curl')).toBeInTheDocument();
            expect(screen.getByText('Flexor Incline Dumbbell Curls')).toBeInTheDocument();
        })
    });

    test("Fetching workouts by strength,muscle,and intermediate",async()=>{
        render(
            <BrowserRouter>
                <DayPlanner/>
            </BrowserRouter>
        );
        const type = screen.getByTestId("type");
        fireEvent.change(type,{target:{value: "strength"}}); // sets value to strength
        const muscle = screen.getByTestId("muscle");
        fireEvent.change(muscle,{target:{value: "biceps"}}); // sets value to muscle
        const difficulty = screen.getByTestId("difficulty");
        fireEvent.change(difficulty,{target:{value: "intermediate"}}); // sets value to intermediate

        const search = screen.getByText("Search");
        expect(search).toBeInTheDocument();
        fireEvent.click(search);
        await fetchWorkouts({});

        await waitFor(() => {
            expect(screen.getByText('Dumbbell Alternate Bicep Curl')).toBeInTheDocument();
            expect(screen.getByText('EZ-bar spider curl')).toBeInTheDocument();
            expect(screen.getByText('Hammer Curls')).toBeInTheDocument();
            expect(screen.getByText('EZ-Bar Curl')).toBeInTheDocument();
            expect(screen.getByText('Zottman Curl')).toBeInTheDocument();
            expect(screen.getByText('Dumbbell Bicep Curl')).toBeInTheDocument();
            expect(screen.getByText('Barbell Curl')).toBeInTheDocument();
            expect(screen.getByText('Concentration curl')).toBeInTheDocument();
            expect(screen.getByText('Overhead cable curl')).toBeInTheDocument();
            expect(screen.getByText('Preacher Curl')).toBeInTheDocument();
        })
    });
});