import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function EditPage({ dayFocus, setDayFocus }) {
  const wkdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const handleChange = (day, event) => { // updates focus when new selection made
    const updatedDayFocus = { ...dayFocus, [day]: event.target.value };
    setDayFocus(updatedDayFocus);
  };
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
  const [dayFocus, setDayFocus] = useState({ // initialize focus
    Monday: "(unselected)",
    Tuesday: "(unselected)",
    Wednesday: "(unselected)",
    Thursday: "(unselected)",
    Friday: "(unselected)",
    Saturday: "(unselected)",
    Sunday: "(unselected)",
  });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/editPg" element={<EditPage dayFocus={dayFocus} setDayFocus={setDayFocus} />} />
          <Route path="/genPg" element={<GenPage dayFocus={dayFocus} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
