// src/components/Signup.js
import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';

function Signup() {
    return (
        <div className="signup-container">
            <img src="triton-logo.png" alt="Triton Logo" className="logo" />
            <h2>Triton Workout Planner</h2>
            <form>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Create a password" required />
                <button type="submit">Sign up</button>
            </form>
            <p><Link to="/login">Have an account? Log in here.</Link></p>
        </div>
    );
}

export default Signup;