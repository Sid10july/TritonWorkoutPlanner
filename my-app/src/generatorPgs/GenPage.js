import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function GenPage({ selectedExercises }) {
  const [inputs, setIn] = useState({});

  //receive user input
  const updateIn = (day, event) => {
    setIn({
      ...inputs,
      [day]: event.target.value
    });
  };

  // Add exercise to the list
  const addExercise = (day) => {
    const newExercise = inputs[day];
    if (newExercise && newExercise.trim() !== "") {
      selectedExercises[day].push(newExercise);
      setIn({
        ...inputs,
        [day]: '' // clr input
      });
    }
  };

  return (
    <div className="genPg">
      <h1>Generated Plan</h1>
      <div className="wkdays">
        {Object.keys(selectedExercises).map((day) => (
          <div key={day} className="day">
            <div className="day-label">{day}</div>
            {selectedExercises[day].length > 0 ? (
              <ul>
                {selectedExercises[day].map((exercise, index) => (
                  <li key={index}>{exercise}</li>
                ))}
              </ul>
            ) : (
              <p>No exercises selected.</p>
            )}
            <input
              type="text"
              value={inputs[day] || ''}
              onChange={(event) => updateIn(day, event)}
              placeholder="Add a new exercise"
            />
            <button onClick={() => addExercise(day)}>Add</button>
          </div>
        ))}
      </div>
      <Link to="/editPg">
        <button>Edit Plan</button>
      </Link>
    </div>
  );
}

export default GenPage;
