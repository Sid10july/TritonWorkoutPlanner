import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
// VIEWS
import { StartWorkout } from "./views/StartWorkout";
import { WorkoutPlanner } from "./views/WorkoutPlanner";
import { ExerciseLibrary } from "./views/ExerciseLibrary";
import { BuildYourOwn } from "./views/BuildYourOwn";
import { WorkoutCalendar } from "./views/WorkoutCalender";
import { TrackProgress } from "./views/TrackProgress";
import { DayPlanner } from "./views/DayPlanner";
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
      <div className="App-views" id="App-view">
        <Routes>
          <Route path="/" element={<StartWorkout />} />
          <Route path="/workout-planner" element={<WorkoutPlanner />} />
          <Route path="/build-your-own" element={<BuildYourOwn />} />
          <Route path="/exercise-library" element={<ExerciseLibrary />} />
          <Route path="/track-progress" element={<TrackProgress />} />
          <Route path="build-your-own/:day" element={<DayPlanner />}/>
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
