// src/components/Login.js
import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="login-container">
            <img src="/triton-logo.png" alt="Triton Logo" className="logo" />
            <h2>Triton Workout Planner</h2>
            <form>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <p><Link to="/signup">Don't have an account? Sign up here.</Link></p>
        </div>
    );
}

export default Login;