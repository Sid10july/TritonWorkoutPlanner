import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function EditPage({ dayFocus, setDayFocus, selectedExercises, setSelectedExercises }) {
  const wkdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [exercises, setExercises] = useState([]);
  const [dispExercises, setDispExercises] = useState({});  // show/hide exercises

  // simula getting data from API 
  useEffect(() => {
    fetch('/APIsample.txt')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExercises(data);
      })
      .catch((error) => {
        console.error('Fectch exercises failed', error); 
      });
  }, []);

  // update according to changes in(type, muscle, difficulty)
  const handleFocusChange = (day, category, value) => {
    const updatedFocus = { 
      ...dayFocus, 
      [day]: { 
        ...dayFocus[day], 
        [category]: value 
      }
    };
    setDayFocus(updatedFocus);
  };

  const toggleExercisesVisibility = (day) => {
    setDispExercises((prevState) => ({
      ...prevState,
      [day]: !prevState[day], // Togg vis
    }));
  };

  // Function to filter exercises based on the dayFocus (type, muscle, difficulty)
  const getFilteredExercises = (day) => {
    const focus = dayFocus[day];
    return exercises.filter((exercise) =>
      (focus.type === 'start' || exercise.type === focus.type) &&
      (focus.muscle === 'start' || exercise.muscle === focus.muscle) &&
      (focus.difficulty === 'start' || exercise.difficulty === focus.difficulty)
    );
  };

  // Function to toggle exercises (add/remove them from selected list)
  const toggleExercise = (day, exercise) => {
    setSelectedExercises((prevSelected) => {
      const dayExercises = prevSelected[day] || [];
      if (dayExercises.includes(exercise)) {
        return { 
          ...prevSelected, 
          [day]: dayExercises.filter((ex) => ex !== exercise) 
        };
      } else {
        return { 
          ...prevSelected, 
          [day]: [...dayExercises, exercise] 
        };
      }
    });
  };

  return (
    <div className="editPg">
      <h1>Customize Your Workout Plan</h1>
      <p>Edit your workout plan by selecting the type, muscle focus, and difficulty level for each day.</p>

      <div className="wkdays">
        {wkdays.map((day) => (
          <div key={day} className="day">
            <h2>{day}</h2>

            {/* Dropdowns for selecting type, muscle, and difficulty */}
            <div className="dropdowns">
              {/* Type */}
              <label>
                Type:
                <select value={dayFocus[day]?.type || 'start'} onChange={(e) => handleFocusChange(day, 'type', e.target.value)}>
                  <option value="start">--select a focus--</option>
                  <option value="cardio">Cardio</option>
                  <option value="gym-weights">Gym-weights</option>
                  <option value="body-weight">Body-weight</option>
                  <option value="sports">Sports</option>
                </select>
              </label>

              {/* Muscle */}
              <label>
                Muscle:
                <select value={dayFocus[day]?.muscle || 'start'} onChange={(e) => handleFocusChange(day, 'muscle', e.target.value)}>
                  <option value="start">--select a focus--</option>
                  <option value="chest">Chest</option>
                  <option value="legs">Legs</option>
                  <option value="lower-back">Lower-back</option>
                  <option value="upper-back">Upper-back</option>
                  <option value="shoulders">Shoulders</option>
                  <option value="biceps">Biceps</option>
                  <option value="triceps">Triceps</option>
                  <option value="forearm">Forearms</option>
                  <option value="abs">Abs</option>
                  <option value="obliques">Obliques</option>
                  <option value="quads">Quads</option>
                  <option value="hamstrings">Hamstrings</option>
                  <option value="glutes">Glutes</option>
                  <option value="calves">Calves</option>
                </select>
              </label>

              {/* Difficulty */}
              <label>
                Difficulty:
                <select value={dayFocus[day]?.difficulty || 'start'} onChange={(e) => handleFocusChange(day, 'difficulty', e.target.value)}>
                  <option value="start">--select a difficulty--</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </label>
            </div>

            {/* Button to show/hide exercises */}
            <button onClick={() => toggleExercisesVisibility(day)}>
              {dispExercises[day] ? 'Hide Exercises' : 'Show Exercises'}
            </button>

            {/* Display filtered exercises */}
            {dispExercises[day] && (
              <div>
                <h3>Exercises for {day}:</h3>
                <ul>
                  {getFilteredExercises(day).map((exercise) => (
                    <li key={exercise.name}>
                      <button onClick={() => toggleExercise(day, exercise.name)}>
                        {selectedExercises[day]?.includes(exercise.name) ? 'Remove' : 'Add'}
                      </button>
                      {exercise.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Link to generate plan page */}
      <Link to="/genPg">
        <button>Generate Plan</button>
      </Link>
    </div>
  );
}

export default EditPage;
