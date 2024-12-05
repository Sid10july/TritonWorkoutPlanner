import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes, MemoryRouter } from "react-router-dom";
// COMPONENTS
import App from "./App";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { DayPlanner } from "./views/DayPlanner";
import { WorkoutCalendar } from "./views/WorkoutCalender";
import { fetchWorkouts } from "./utils/workout-utils";
// CONSTANTS
import {
  daysOfWeek,
  recommendedExercises,
  dummySchedule,
} from "./constants/constants";
// CONTEXT
import { WorkoutsContext, WorkoutsProvider } from "./context/workouts-context";
import { WeekPlan } from "./views/WeekPlan";

// describe("Customize Workout Plan Tests", () => {
//   test("all days initialized as unchecked", () => {
//     render(
//       <BrowserRouter>
//         <BuildYourOwn />
//       </BrowserRouter>
//     );

//     daysOfWeek.forEach((day) => {
//       //iterate through days of the week
//       const checkbox = screen.getByLabelText(day);
//       //day should be unchecked
//       expect(checkbox).not.toBeChecked();
//     });
//   });

//   test("Checking a day sets it as checked, unchecking a day sets it as unchecked", () => {
//     render(
//       <BrowserRouter>
//         <BuildYourOwn />
//       </BrowserRouter>
//     );
//     const fridayCheckbox = screen.getByLabelText("Friday");

//     //should be initially unchecked
//     expect(fridayCheckbox).not.toBeChecked();

//     //simulate checking the box for Friday
//     fireEvent.click(fridayCheckbox);

//     //checkbox for Friday should be checked now
//     expect(fridayCheckbox).toBeChecked();

//     //simulate unchecking the box for Friday
//     fireEvent.click(fridayCheckbox);

//     //checkbox for Friday should go back to being unchecked
//     expect(fridayCheckbox).not.toBeChecked();
//   });

//   test("Setting start and end time for a day works as intended", () => {
//     render(
//       <BrowserRouter>
//         <BuildYourOwn />
//       </BrowserRouter>
//     );

//     const day = daysOfWeek[0]; //day is set to Monday

//     //select the HTMLElement using the ID of Monday's start time and end time
//     const startTime = document.querySelector(
//       `#${day}-start-time`
//     ) as HTMLInputElement;
//     const endTime = document.querySelector(
//       `#${day}-end-time`
//     ) as HTMLInputElement;

//     fireEvent.change(startTime, { target: { value: "08:00" } });
//     fireEvent.change(endTime, { target: { value: "09:00" } });

//     // value reflects what was inputted by user
//     expect(startTime.value).toBe("08:00");
//     expect(endTime.value).toBe("09:00");
//   });

//   test("Selecting focus category for a day updates values correctly", () => {
//     render(
//       <BrowserRouter>
//         <BuildYourOwn />
//       </BrowserRouter>
//     );

//     const day = daysOfWeek[0]; //day is set to Monday
//     const focuses = Object.keys(recommendedExercises); //get list of all focuses
//     const focus = focuses[0]; //the focus is set to Cardio

//     //change the dropdown selection to the specified focus
//     const focusDropdown = screen.getByLabelText(`${day} Focus:`);
//     fireEvent.change(focusDropdown, { target: { value: focus } });

//     //ensure focus category state is updated
//     expect(focusDropdown).toHaveValue(focus);
//   });

//   test("selected exercises display properly", () => {
//     render(
//       <BrowserRouter>
//         <BuildYourOwn />
//       </BrowserRouter>
//     ); //render component

//     const day = daysOfWeek[0]; // day set to Monday
//     //retrieve Monday's focus category dropdown
//     const focusDropdown = screen.getByLabelText(`${day} Focus:`);
//     const focus = Object.keys(recommendedExercises)[0]; // set focus to first category ('cardio')

//     // set the focus category to cardio
//     fireEvent.change(focusDropdown, { target: { value: focus } });

//     // add first exercise from the cardio focus
//     const exerciseDropdown = screen.getByTestId(`${day}-exercise-dropdown`);
//     fireEvent.change(exerciseDropdown, {
//       target: {
//         value:
//           recommendedExercises[focus as keyof typeof recommendedExercises][0],
//       },
//     });

//     // ensure that the selected exercise is displayed to the user
//     expect(
//       screen.getByText(
//         recommendedExercises[focus as keyof typeof recommendedExercises][0]
//       )
//     ).toBeInTheDocument();
//   });

//   test("removing an exercise from the selected exercises updates user's list of selected exercises", () => {
//     render(
//       <BrowserRouter>
//         <BuildYourOwn />
//       </BrowserRouter>
//     ); //render componenet

//     const day = daysOfWeek[0]; // set day to be Monday
//     //retrieve Monday's focus category dropdown
//     const focusDropdown = screen.getByLabelText(`${day} Focus:`);
//     //select day first
//     const dayCheckbox = screen.getByTestId(`${day}-checkbox`);
//     fireEvent.click(dayCheckbox);

//     const focus = Object.keys(recommendedExercises)[0]; // set focus to first category (cardio)

//     // set the focus category to be cardio
//     fireEvent.change(focusDropdown, { target: { value: focus } });

//     // add the first exercise from dropdown to the selected exercises list
//     const exerciseDropdown = screen.getByTestId(`${day}-exercise-dropdown`);
//     const exercise =
//       recommendedExercises[focus as keyof typeof recommendedExercises][0];
//     fireEvent.change(exerciseDropdown, { target: { value: exercise } });

//     // the exercise should be displayed in the selected exercises list
//     const exerciseList = screen.getByTestId(`${day}-exercise-list`);
//     expect(screen.getByText(exercise)).toBeInTheDocument();

//     // remove the exercise from the selected exercises list
//     const removeButton = screen.getByText("Remove");
//     fireEvent.click(removeButton);

//     // ensure that the exercise isn't in selected exercises list
//     expect(within(exerciseList).queryByText(exercise)).not.toBeInTheDocument();
//     //exercise should return to the dropdown as an option of exercises to add
//     expect(screen.getByRole("option", { name: exercise })).toBeInTheDocument();
//   });

//   test("reordering the exercises works as intended", () => {
//     render(
//       <BrowserRouter>
//         <BuildYourOwn />
//       </BrowserRouter>
//     ); //render component

//     const day = daysOfWeek[0]; // set the day to be Monday
//     //select day first
//     const dayCheckbox = screen.getByTestId(`${day}-checkbox`);
//     fireEvent.click(dayCheckbox);

//     //retrieve Monday's focus category dropdown
//     const focusDropdown = screen.getByLabelText(`${day} Focus:`);
//     // set the focus category to the first category (cardio)
//     const focus = Object.keys(recommendedExercises)[0];

//     // set the focus category to be cardio
//     fireEvent.change(focusDropdown, { target: { value: focus } });

//     // add two exercises to the list of selected exercises
//     const exerciseDropdown = screen.getByTestId(`${day}-exercise-dropdown`);
//     //'Running'
//     const exercise1 =
//       recommendedExercises[focus as keyof typeof recommendedExercises][0];
//     //'Cycling'
//     const exercise2 =
//       recommendedExercises[focus as keyof typeof recommendedExercises][1];
//     fireEvent.change(exerciseDropdown, { target: { value: exercise1 } });
//     fireEvent.change(exerciseDropdown, { target: { value: exercise2 } });

//     // move the second exercise to the top of the list
//     const upButton = screen.getAllByText("↑")[1];
//     fireEvent.click(upButton);

//     // check that the order is as expected
//     const exerciseItems = screen.getAllByRole("listitem");
//     expect(exerciseItems[0]).toHaveTextContent(exercise2);
//     expect(exerciseItems[1]).toHaveTextContent(exercise1);
//   });

//   test("amount of reps inputted by the user is updated and displayed as expected", () => {
//     render(
//       <BrowserRouter>
//         <BuildYourOwn />
//       </BrowserRouter>
//     );

//     const day = daysOfWeek[0]; // set the day to be Monday
//     //select day first
//     const dayCheckbox = screen.getByTestId(`${day}-checkbox`);
//     fireEvent.click(dayCheckbox);
//     //retrieve Monday's focus category dropdown
//     const focusDropdown = screen.getByLabelText(`${day} Focus:`);
//     // set focus to first category (cardio)
//     const focus = Object.keys(recommendedExercises)[0];

//     // set the focus category to cardio
//     fireEvent.change(focusDropdown, { target: { value: focus } });

//     // add an exercise to list of selected exercises
//     const exerciseDropdown = screen.getByTestId(`${day}-exercise-dropdown`);
//     //retrieve the first exercise from the list
//     const exercise =
//       recommendedExercises[focus as keyof typeof recommendedExercises][0];
//     fireEvent.change(exerciseDropdown, { target: { value: exercise } });

//     // update the number of repetitions to 15
//     const repsInput = screen.getByLabelText("Reps:");
//     fireEvent.change(repsInput, { target: { value: "15" } });

//     // ensure that the value of reps has been changed to 15
//     expect(repsInput).toHaveValue(15);
//   });

//   test("focus dropdown should be disabled until the day is selected", () => {
//     render(
//       <BrowserRouter>
//         <BuildYourOwn />
//       </BrowserRouter>
//     );

//     const day = daysOfWeek[0]; // select day to be monday
//     //retrieve Monday's focus dropdown
//     const focusDropdown = screen.getByLabelText(`${day} Focus:`);

//     // ensure that the dropdown is disabled since Monday has yet been selected
//     expect(focusDropdown).toBeDisabled();

//     // select the checkbox for Monday
//     const dayCheckbox = screen.getByTestId(`${day}-checkbox`);
//     fireEvent.click(dayCheckbox);

//     // ensure the dropdown is now enabled after Monday is selected
//     expect(focusDropdown).not.toBeDisabled();
//   });

//   test("exercise dropdown and state/end times are disabled until a day is selected", () => {
//     render(
//       <BrowserRouter>
//         <BuildYourOwn />
//       </BrowserRouter>
//     );

//     const day = daysOfWeek[0]; // select day to be Monday
//     //retrieve the exercise dropdown for Monday
//     const exerciseDropdown = screen.getByTestId(`${day}-exercise-dropdown`);
//     //retrieve start and end times for Monday
//     const startTimeInput = screen.getByTestId(`${day}-start-time`);
//     const endTimeInput = screen.getByTestId(`${day}-end-time`);

//     // make sure exercise dropdown and time inputs are disabled before day selection
//     expect(exerciseDropdown).toBeDisabled();
//     expect(startTimeInput).toBeDisabled();
//     expect(endTimeInput).toBeDisabled();

//     // select the checkbox for Monday
//     const dayCheckbox = screen.getByTestId(`${day}-checkbox`);
//     fireEvent.click(dayCheckbox);
//     //retrieve Monday's focus dropdown
//     const focusDropdown = screen.getByLabelText(`${day} Focus:`);
//     // set the focus category to the first category (cardio)
//     const focus = Object.keys(recommendedExercises)[0];

//     // set the focus category to be cardio
//     fireEvent.change(focusDropdown, { target: { value: focus } });

//     // make sure exercise dropdown and time inputs are no longer disabled after day and focus selection
//     expect(exerciseDropdown).not.toBeDisabled();
//     expect(startTimeInput).not.toBeDisabled();
//     expect(endTimeInput).not.toBeDisabled();
//   });
// });

const mockSetWeeklyWorkouts = jest.fn();
const mockWeeklyWorkouts = [
  { day: "Monday", exercises: [], startTime: "00:00", endTime: "00:00" },
];

describe("Sidebar Tests", () => {
  test("Clicking a tab on the sidebar directs you to the specified page", () => {
    render(
      <BrowserRouter>
        <App debugId={"1"} />
      </BrowserRouter>
    );

    // Click on workout calendar button
    const workoutCalendarButton = screen.getByText("Workout Calendar");
    fireEvent.click(workoutCalendarButton);

    // Expect to see "Workout Calendar" twice (first in the sidebar, and second as a page header)
    const workoutCalendarTitle = screen.getAllByText("Workout Calendar");
    expect(workoutCalendarTitle.length).toBe(2);
  });

  test("Click on the sidebar's account info button to see the log out option", () => {
    render(
      <BrowserRouter>
        <App debugId={"1"} />
      </BrowserRouter>
    );

    // Click on account info button
    const accountButton = screen.getByTestId("sidebar-account");
    fireEvent.click(accountButton);

    // Should now be able to see the "Log Out" option
    const logOutButton = screen.getByText("Log Out");
    expect(logOutButton).toBeInTheDocument();
  });
});

describe("WorkoutCalendar Tests", () => {
  test("WorkoutCalendar renders title and button as expected", () => {
    render(<WorkoutCalendar />);
    const title = "Workout Calendar";

    // title displays as expected
    expect(screen.getByText(title)).toBeInTheDocument();

    // ensure export button is rendered on the screen
    const exportButton = screen.getByText("Export to Google Calendar");
    expect(exportButton).toBeInTheDocument();
  });

  test("WorkoutCalendar renders the events in the weekly plan as expected", async() => {
    //mock data for weekly workouts
    const mockWeeklyWorkouts = [
      {
        day: "Monday",
        exercises: [
          {
            name: "Dumbbell spell caster",
            type: "strength",
            muscle: "arms",
            difficulty: "beginner",
            equipment: "dumbbell",
            instructions: "Perform with controlled movements.",
          },
        ],
        startTime: "08:00",
        endTime: "09:00",
      },
    ];
    
    //render the components necessary
    render(
      <MemoryRouter initialEntries={["/Day-Planner/Monday"]}>
        <WorkoutsContext.Provider
          value={{
            weeklyWorkouts: mockWeeklyWorkouts,
            setWeeklyWorkouts: mockSetWeeklyWorkouts,
            numRenders: 0,
            setNumRenders: jest.fn(), //mock function for render state
          }}
        >
          <div className="App">
            <Sidebar
              userId="1" //mock user id
              pageIndex={0} //active page index
              sidebarClickHandler={jest.fn()} // Mock function for sidebar clicks
              setIsLoggedIn={jest.fn()} // Mock function for login state
            />
            <Routes>
              <Route path="/Day-Planner/:day" element={<DayPlanner />} />
              <Route path="/workout-calendar" element={<WorkoutCalendar />} />
              <Route path="/workout-planner" element={<WeekPlan userId="mockUserID"/>} />
            </Routes>
          </div>
        </WorkoutsContext.Provider>
      </MemoryRouter>
    );
  
    // Navigate the weekly planner page
    fireEvent.click(screen.getByText("My Workouts"));

    // Change the values for start and end time inputs for Monday
    const startTimeInput = screen.getAllByTestId("start-time");
    fireEvent.change(startTimeInput[1], { target: { value: "08:00" } });

    const endTimeInput = screen.getAllByTestId("end-time");
    fireEvent.change(endTimeInput[1], { target: { value: "09:00" } });

    // Save the updated time and plan for Monday
    const saveButton = screen.getAllByText(/Save/i, { selector: "button" });
    fireEvent.click(saveButton[1]);
  
    // Navigate to the calendar
    fireEvent.click(screen.getByText(/Workout Calendar/i));
  
    screen.debug();

    // Check that the events are displayed in the calendar
    const mondayWorkouts = screen.getAllByText(/Monday's workouts/i);
    expect(mondayWorkouts.length).toBeGreaterThan(0); //should at least have 1 event
  });

  test("ensure that the alert message shows when an event is clicked", async() => {
    // Mock data for weekly workouts
    const mockWeeklyWorkouts = [
      {
        day: "Monday",
        exercises: [
          {
            name: "Dumbbell spell caster",
            type: "strength",
            muscle: "arms",
            difficulty: "beginner",
            equipment: "dumbbell",
            instructions: "Perform with controlled movements.",
          },
        ],
        startTime: "08:00",
        endTime: "09:00",
      },
    ];

    render(
      <MemoryRouter initialEntries={["/workout-calendar"]}>
        <WorkoutsContext.Provider
          value={{
            weeklyWorkouts: mockWeeklyWorkouts, // Provide the mock workouts to the context
            setWeeklyWorkouts: jest.fn(), // Mock function to handle state updates
            numRenders: 0,
            setNumRenders: jest.fn(),
          }}
        >
          <WorkoutCalendar />
        </WorkoutsContext.Provider>
      </MemoryRouter>
    );

    //mock alert 
    window.alert = jest.fn();

    //define event details
    const eventTitle = "Monday's workouts";
    const eventStart = "2024-12-02T08:00:00"; 
    const eventEnd = "2024-12-02T09:00:00";
    // click on the first instance of event
    fireEvent.click(screen.getAllByText(eventTitle)[0]);

    // Check that the events are displayed in the calendar
    const mondayWorkouts = screen.getAllByText(/Monday's workouts/i);
    expect(mondayWorkouts.length).toBeGreaterThan(0); //should at least have 1 event

    //ensure that the alert was called with the expected details for that event
    expect(window.alert).toHaveBeenCalledWith(
      `Event: ${eventTitle}\nStart: ${new Date(
        eventStart
      ).toString()}\nEnd: ${new Date(eventEnd).toString()}`
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

describe("Creating Weekly Workout Plan Tests", () => {
  test("Edit day plan, select exercise, and save workout plan", async()=> {
    // Mock `useParams` to return a fixed day (Monday)
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({ day: "Monday" }),
    }));

    //render the component with necessary routes and provider
    render(
      <MemoryRouter initialEntries={["/Day-Planner/Monday"]}>
      <WorkoutsContext.Provider
        value={{
          weeklyWorkouts: mockWeeklyWorkouts, // Provide mock weekly workouts
          setWeeklyWorkouts: mockSetWeeklyWorkouts, // Provide mock state update function
          numRenders: 0,
          setNumRenders: jest.fn(), // Mock setNumRenders function
        }}
      >
        <Routes>
          <Route path="/Day-Planner/:day" element={<DayPlanner />} />
        </Routes>
      </WorkoutsContext.Provider>
    </MemoryRouter>
    );
  
    // Verify the heading for the day plan
    expect(screen.getByText(/This is the Monday planner/i)).toBeInTheDocument();

    // select categories for exercise search
    const type = screen.getByTestId("type");
    fireEvent.change(type, { target: { value: "strength" } });

    const muscle = screen.getByTestId("muscle");
    fireEvent.change(muscle, { target: { value: "abdominals" } });

    const difficulty = screen.getByTestId("difficulty");
    fireEvent.change(difficulty, { target: { value: "beginner" } });

    const search = screen.getByText("Search");
    fireEvent.click(search);
    await fetchWorkouts({});

    //expect the first workout in the document
    await waitFor(() => {
      expect(screen.getByText("Dumbbell spell caster")).toBeInTheDocument();
    });

    // add the first exercise displayed
    const addButton = screen.getAllByText("Add", { selector: "button" })[0];
    fireEvent.click(addButton);

    // Save and navigate back to weekly plan
    const saveButton = screen.getByText("Save", { selector: "button" });
    fireEvent.click(saveButton);

    // Verify the selected exercise is saved to the workout plan
    await waitFor(() => {
      expect(mockSetWeeklyWorkouts).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            day: "Monday",
            exercises: expect.arrayContaining([
              expect.objectContaining({ name: "Dumbbell spell caster" }),
            ]),
          }),
        ])
      );
    });
  });

  test("Adding the same exercise twice", async() => {
    // Mock `useParams` to return a fixed day (Monday)
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({ day: "Monday" }),
    }));

    render(
      <MemoryRouter initialEntries={["/Day-Planner/Monday"]}>
      <WorkoutsContext.Provider
        value={{
          weeklyWorkouts: mockWeeklyWorkouts,
          setWeeklyWorkouts: mockSetWeeklyWorkouts,
          numRenders: 0,
          setNumRenders: jest.fn(),
        }}
      >
        <Routes>
          <Route path="/Day-Planner/:day" element={<DayPlanner />} />
        </Routes>
      </WorkoutsContext.Provider>
    </MemoryRouter>
    );
  
    // Verify heading for the day plan
    expect(screen.getByText(/This is the Monday planner/i)).toBeInTheDocument();

    // search for exercises in the following categories: strength, abdominals, beginner
    const type = screen.getByTestId("type");
    fireEvent.change(type, { target: { value: "strength" } });

    const muscle = screen.getByTestId("muscle");
    fireEvent.change(muscle, { target: { value: "abdominals" } });

    const difficulty = screen.getByTestId("difficulty");
    fireEvent.change(difficulty, { target: { value: "beginner" } });

    const search = screen.getByText("Search");
    fireEvent.click(search);
    await fetchWorkouts({});

    await waitFor(() => {
      expect(screen.getByText("Plate Twist")).toBeInTheDocument();
    });

    // add the second exercise displayed
    const addButton = screen.getAllByText("Add", { selector: "button" })[1];
    //add it twice
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const selectedWorkouts = screen.getAllByText("Plate Twist");
    expect(selectedWorkouts.length).toBe(1); //there should only be one instance
  });
});