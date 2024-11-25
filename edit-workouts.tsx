import React from 'react';
import { Link } from 'react-router-dom';

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


  export default EditPage;