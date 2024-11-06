import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { Navbar } from "./navbar";
import { WorkoutPlanner } from './components/WorkoutPlanner';
import { BuildYourOwn } from './components/BuildYourOwn';

function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<h1>Triton Workout Planner</h1>} />
          <Route path="/workout-planner" element={<WorkoutPlanner/>} />
          <Route path="/build-your-own" element={<BuildYourOwn/>} />
          <Route path="/exercise-library" element={<ExerciseLibrary />} />
          <Route path="/generate-workout" element={<h1>Generate Workout Page</h1>} />
        </Routes>
    </div>
  );
}

export default App;
