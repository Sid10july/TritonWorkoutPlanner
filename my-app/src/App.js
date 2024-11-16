import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';

function EditPage({ dayFocus, setDayFocus }) {
  const wkdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const handleChange = (day, event) => { // updates focus when new selection made
    const updatedDayFocus = { ...dayFocus, [day]: event.target.value };
    setDayFocus(updatedDayFocus);
  };
  /** display each day of wk with isolated dropdown (dropdowns are unique to dayofwk)
   * allow user to change dropdown selection and update realtime
   * when done editing, can view wkly workout by navigating to genPg
   */
  return (
    <div className="editPg">
      <h1>Customize Workouts</h1>
      <p>Edit your workout plan here.</p>
      <div className="wkdays"> 
        {wkdays.map((day) => (
          <span key={day} className="day">
            <div className="day-label">{day}</div>
            <div className="dropdowns">
              <label>
                Exercise focus
                <select value={dayFocus[day]} onChange={(event) => handleChange(day, event)}>
                  <option value="start">--select a focus--</option>
                  <option value="cardio">Cardio</option>
                  <option value="gym-weights">Gym-weights</option>
                  <option value="body-weight">Body-weight</option>
                  <option value="sports">Sports</option>
                </select>
              </label>
              <p>Focus: {dayFocus[day]}</p>
            </div>
          </span>
        ))}
      </div>
      <Link to="/genPg">
        <button>Generate Plan</button>
      </Link>
    </div>
  );
}

function GenPage({ dayFocus }) {
  const [fileContents, setFileContents] = useState({}); // fileCont and func that updates fileCont
  const fetchFileContent = async (dayFocus) => {
    try { // error handling while getting file data
      if (dayFocus === '(unselected)') {
        return null; // don't display anything  
      }
      const response = await fetch(`/${dayFocus}.txt`);
      if (!response.ok) { // throw error if bad file
        throw new Error('File not found');
      }
      const text = await response.text();
      return text;
    } catch (error) { // handles error
      console.error(`Error fetching file for ${dayFocus}:`, error);
      return 'No content available for this day.';
    }
  };
  useEffect(() => {// run whenever dayFocus changes 
    const fetchData = async () => {
      const updatedContent = {};
      for (const wkday in dayFocus) {
          const focus4Day = dayFocus[wkday];
          // Fetch the content for the current day
          const content = await fetchFileContent(focus4Day);
          // Store the fetched content in the newFileContents object
          updatedContent[wkday] = content;
      }
      setFileContents(updatedContent);
    };
    fetchData();
  }, [dayFocus]); 
  /** displays generated workout based on editPg
   * access files with same name as dropdown options (eventually do thro API) exist with corresponding exercises
   * display specific exercises based on selected focus 
   * update display real time when focus is changed
  */
  return (
    <div className="genPg">
      <h1>Generated plan</h1>
      <div className="wkdays">
        {Object.keys(dayFocus).map((dayOfWeek) => {
          const focusForDay = dayFocus[dayOfWeek];
          return (
            <div key={dayOfWeek} className="day">
              <div className="day-label">{dayOfWeek}</div>
              <p>Focus: {focusForDay}</p>
              <div className="file-content">
                <pre>{fileContents[dayOfWeek]}</pre>
              </div>
            </div>
          );
        })}
      </div>
      <Link to="/editPg">
        <button>Edit Plan</button>
      </Link>
    </div>
  );
}

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
