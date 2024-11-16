import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import EditPage from './generatorPgs/EditPage';  // Import EditPage component
import GenPage from './generatorPgs/GenPage';    // Import GenPage component

function App() {
  const [dayFocus, setDayFocus] = useState({ // initialize obj: binds wkday to a focus
    Monday: "(unselected)",
    Tuesday: "(unselected)",
    Wednesday: "(unselected)",
    Thursday: "(unselected)",
    Friday: "(unselected)",
    Saturday: "(unselected)",
    Sunday: "(unselected)",
  });

  /** start on customize workout pg, and navigate btwn generated plan and edit page */
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/editPg" />} />
          <Route path="/editPg" element={<EditPage dayFocus={dayFocus} setDayFocus={setDayFocus} />} />
          <Route path="/genPg" element={<GenPage dayFocus={dayFocus} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
