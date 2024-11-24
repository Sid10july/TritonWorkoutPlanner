
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
// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
    <div className="App">
      <Sidebar
        pageIndex={pageIndex}
        sidebarClickHandler={handleSidebarClick}
        setIsLoggedIn={setIsLoggedIn} // Pass the setIsLoggedIn prop
      />
      <div className="App-views">{children}</div>
    </div>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
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
                <StartWorkout />
              </Layout>
            }
          />
          <Route
            path="/workout-planner"
            element={
              <Layout setIsLoggedIn={setIsLoggedIn}>
                <WorkoutPlanner />
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
            path="/change-preferences"
            element={
              <Layout setIsLoggedIn={setIsLoggedIn}>
                <ChangePreferences userId="12345" />
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