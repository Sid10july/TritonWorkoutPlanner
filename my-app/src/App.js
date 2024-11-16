import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function EditPage() {
  return (
    <div className="editPg">
      <h1>Customize Workouts</h1>
      <p>Edit your workout plan here.</p>
      <Link to="/genPg">
        <button>Generate Plan</button>
      </Link>
    </div>
  );
}

function GenPage() {
  return (
    <div className="genPg">
      <h1>Generated plan</h1>
      <Link to="/editPg">
        <button>Edit Plan</button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/editPg" element={<EditPage />} />
          <Route path="/genPg" element={<GenPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
