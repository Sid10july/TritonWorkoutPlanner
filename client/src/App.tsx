import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
// VIEWS
import { WorkoutPlanner } from "./views/WorkoutPlanner";
import { ExerciseLibrary } from "./views/ExerciseLibrary";
import { BuildYourOwn } from "./views/BuildYourOwn";
import { WorkoutCalendar } from "./views/WorkoutCalender";
// STYLES
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [pageIndex, setPageIndex] = useState(0);

  function handleSidebarClick(pageIndex: number) {
    setPageIndex(pageIndex);
  }

  return (
    <div className="App">
      <Sidebar pageIndex={pageIndex} sidebarClickHandler={handleSidebarClick} />
      <div className="App-views">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="title-container">Triton Workout Planner</h1>
                <div className="content-container"></div>
              </div>
            }
          />
          <Route path="/workout-planner" element={<WorkoutPlanner />} />
          <Route path="/build-your-own" element={<BuildYourOwn />} />
          <Route path="/exercise-library" element={<ExerciseLibrary />} />
          <Route
            path="/generate-workout"
            element={
              <div>
                <h1 className="title-container">Generate Workout Page</h1>
                <div className="content-container"></div>
              </div>
            }
          />
          <Route path="/workout-calendar" element={<WorkoutCalendar />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
