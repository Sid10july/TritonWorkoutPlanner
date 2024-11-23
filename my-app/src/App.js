import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import EditPage from './generatorPgs/EditPage';
import GenPage from './generatorPgs/GenPage';  

function App() {
  const [dayFocus, setDayFocus] = useState({
    Monday: { type: "(unselected)", muscle: "(unselected)", difficulty: "(unselected)" },
    Tuesday: { type: "(unselected)", muscle: "(unselected)", difficulty: "(unselected)" },
    Wednesday: { type: "(unselected)", muscle: "(unselected)", difficulty: "(unselected)" },
    Thursday: { type: "(unselected)", muscle: "(unselected)", difficulty: "(unselected)" },
    Friday: { type: "(unselected)", muscle: "(unselected)", difficulty: "(unselected)" },
    Saturday: { type: "(unselected)", muscle: "(unselected)", difficulty: "(unselected)" },
    Sunday: { type: "(unselected)", muscle: "(unselected)", difficulty: "(unselected)" },
  });

  // State to store selected exercises for each day
  const [selectedExercises, setSelectedExercises] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/editPg" />} />
          <Route
            path="/editPg"
            element={<EditPage dayFocus={dayFocus} setDayFocus={setDayFocus} selectedExercises={selectedExercises} setSelectedExercises={setSelectedExercises} />}
          />
          <Route
            path="/genPg"
            element={<GenPage selectedExercises={selectedExercises} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
