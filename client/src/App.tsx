// // export default App;
// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { Sidebar } from "./components/Sidebar/Sidebar";
// // Authentication Components
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// // Views
// import { StartWorkout } from "./views/StartWorkout";
// import { WorkoutPlanner } from "./views/WorkoutPlanner";
// import { ExerciseLibrary } from "./views/ExerciseLibrary";
// import { BuildYourOwn } from "./views/BuildYourOwn";
// import ChangePreferences from "./views/ChangePreferences"; // Import ChangePreferences
// // Styles
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// // Layout Component for Sidebar and Authenticated Pages
// const Layout = ({ children }: { children: React.ReactNode }) => {
//   const [pageIndex, setPageIndex] = useState(0);

//   const handleSidebarClick = (index: number) => {
//     setPageIndex(index);
//   };

//   return (
//     <div className="App">
//       <Sidebar pageIndex={pageIndex} sidebarClickHandler={handleSidebarClick} />
//       <div className="App-views">{children}</div>
//     </div>
//   );
// };

// const App: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state

//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//   };

//   return (
//     <Routes>
//       {/* Public Routes */}
//       {!isLoggedIn ? (
//         <>
//           <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
//           <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </>
//       ) : (
//         <>
//           {/* Protected Routes */}
//           <Route
//             path="/"
//             element={
//               <Layout>
//                 <StartWorkout /> {/* Ensures StartWorkout logic is integrated */}
//               </Layout>
//             }
//           />
//           <Route
//             path="/workout-planner"
//             element={
//               <Layout>
//                 <WorkoutPlanner />
//               </Layout>
//             }
//           />
//           <Route
//             path="/build-your-own"
//             element={
//               <Layout>
//                 <BuildYourOwn />
//               </Layout>
//             }
//           />
//           <Route
//             path="/exercise-library"
//             element={
//               <Layout>
//                 <ExerciseLibrary />
//               </Layout>
//             }
//           />
//           <Route
//             path="/change-preferences" // Add Change Preferences Route
//             element={
//               <Layout>
//                 <ChangePreferences />
//               </Layout>
//             }
//           />
//           <Route
//             path="/generate-workout"
//             element={
//               <Layout>
//                 <div>
//                   <h1 className="title-container">Generate Workout Page</h1>
//                   <div className="content-container"></div>
//                 </div>
//               </Layout>
//             }
//           />
//           <Route path="*" element={<Navigate to="/" />} />
//         </>
//       )}
//     </Routes>
//   );
// };

// export default App;
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
// Authentication Components
import Login from "./components/Login";
import Signup from "./components/Signup";
// Views
import { StartWorkout } from "./views/StartWorkout";
import { WorkoutPlanner } from "./views/WorkoutPlanner";
import { ExerciseLibrary } from "./views/ExerciseLibrary";
import { BuildYourOwn } from "./views/BuildYourOwn";
import ChangePreferences from "./views/ChangePreferences";
import { WorkoutCalendar } from "./views/WorkoutCalender";
import { TrackProgress } from "./views/TrackProgress";
import { DayPlanner } from "./views/DayPlanner";
// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { WorkoutsProvider } from "./context/workouts-context";
import { WeekPlan } from "./views/WeekPlan";

// Layout Component for Sidebar and Authenticated Pages
const Layout = ({
  children,
  setIsLoggedIn,
}: {
  children: React.ReactNode;
  setIsLoggedIn: (value: boolean) => void;
}) => {
  const [pageIndex, setPageIndex] = useState(0);

  const handleSidebarClick = (index: number) => {
    setPageIndex(index);
  };

  return (
    <WorkoutsProvider>
        <div className="App">
        <Sidebar
            pageIndex={pageIndex}
            sidebarClickHandler={handleSidebarClick}
            setIsLoggedIn={setIsLoggedIn} // Pass the setIsLoggedIn prop
        />
        <div className="App-views">{children}</div>
        </div>
    </WorkoutsProvider>
  );
};

// Set debug props to bypass login
interface AppProps {
  debugLogin?: boolean;
}

const App: React.FC<AppProps> = ({ debugLogin = false }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(debugLogin); // Authentication state
  const [userId, setUserId] = useState("0"); // User ID

  const handleLoginSuccess = (id: string) => {
    setIsLoggedIn(true);
    setUserId(id);
  };

  return (
    <Routes>
      {/* Public Routes */}
      {!isLoggedIn ? (
        <>
          <Route
            path="/"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <Layout setIsLoggedIn={setIsLoggedIn}>
                <StartWorkout userId={userId} />
              </Layout>
            }
          />
          <Route
            path="/workout-planner"
            element={
              <Layout setIsLoggedIn={setIsLoggedIn}>
                <WeekPlan userId={userId}/>
              </Layout>
            }
          />
          <Route
            path="/build-your-own"
            element={
              <Layout setIsLoggedIn={setIsLoggedIn}>
                <BuildYourOwn />
              </Layout>
            }
          />
          <Route
            path="/exercise-library"
            element={
              <Layout setIsLoggedIn={setIsLoggedIn}>
                <ExerciseLibrary />
              </Layout>
            }
          />
          <Route
            path="/track-progress"
            element={
              <Layout setIsLoggedIn={setIsLoggedIn}>
                <TrackProgress />
              </Layout>
            }
          />
          <Route
            path="/Day-Planner/:day"
            element={
              <Layout setIsLoggedIn={setIsLoggedIn}>
                <DayPlanner />
              </Layout>
            }
          />
          <Route
            path="/change-preferences"
            element={
              <Layout setIsLoggedIn={setIsLoggedIn}>
                <ChangePreferences userId={userId} />
              </Layout>
            }
          />
          <Route
            path="/workout-calendar"
            element={
              <Layout setIsLoggedIn={setIsLoggedIn}>
                <WorkoutCalendar />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

export default App;
