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
//             const response = await fetch('/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 alert('Login successful');
//                 navigate('/home');
//             } else {
//                 setError(data.message || 'Login failed');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError('An error occurred. Please try again.');
//         }
//     };

//     return (
//         <div className="login-container">
//             <img src="/triton-logo.png" alt="Triton Logo" className="logo" />
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

// src/components/Login.js
import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login successful, redirecting...");
                alert('Login successful');
                navigate('/home');
            } else {
                console.error("Login failed:", data.message);
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
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
            <p><Link to="/signup">Don't have an account? Sign up here.</Link></p>
        </div>
    );
}

export default Login;