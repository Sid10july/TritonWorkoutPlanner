// // src/components/Login.js
// import React, { useState } from 'react';
// import './Login.css';
// import { Link, useNavigate } from 'react-router-dom';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const response = await fetch('http://localhost:3000/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 console.log("Login successful, redirecting...");
//                 alert('Login successful');
//                 navigate('/home');
//             } else {
//                 console.error("Login failed:", data.message);
//                 setError(data.message || 'Login failed');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError(`An error occurred: ${error.message || error}`);
//         }
//     };

//     return (
//         <div className="login-container">
//             <img src="triton-logo.png" alt="Triton Logo" className="logo" />
//             <h2>Triton Workout Planner</h2>
//             <form onSubmit={handleLogin}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             {error && <p className="error-message">{error}</p>}
//             <p><Link to="/signup">Don't have an account? Sign up here.</Link></p>
//         </div>
//     );
// }

// export default Login;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const PORT = process.env.PORT || 8080;

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`http://localhost:${PORT}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful");
        onLoginSuccess(data.userId); // Notify App that login is successful and pass back userId
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError(`An error occurred: ${error.message || error}`);
    }
  };

  return (
    <div className="login-container">
      <img src="triton-logo.png" alt="Triton Logo" className="logo" />
      <h2>Triton Workout Planner</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>
        <Link to="/signup">Don't have an account? Sign up here.</Link>
      </p>
    </div>
  );
};

export default Login;
