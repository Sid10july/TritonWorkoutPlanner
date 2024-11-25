// // src/components/Signup.js
// import React, { useState } from 'react';
// import './Signup.css';
// import { Link, useNavigate } from 'react-router-dom';

// function Signup() {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const response = await fetch('http://localhost:3000/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, email, password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 alert('User created successfully');
//                 navigate('/login');
//             } else {
//                 setError(data.message || 'Signup failed');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError('An error occurred. Please try again.');
//         }
//     };

//     return (
//         <div className="signup-container">
//             <img src="triton-logo.png" alt="Triton Logo" className="logo" />
//             <h2>Triton Workout Planner</h2>
//             <form onSubmit={handleSignup}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Create a password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Sign up</button>
//             </form>
//             {error && <p className="error-message">{error}</p>}
//             <p><Link to="/login">Have an account? Log in here.</Link></p>
//         </div>
//     );
// }

// export default Signup;

// src/components/Signup.js
// import React, { useState } from 'react';
// import './Signup.css';
// import { Link, useNavigate } from 'react-router-dom';

// function Signup() {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         setError(null); // Clear previous errors

//         try {
//             const response = await fetch('http://localhost:3000/auth/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, email, password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 alert('User created successfully');
//                 navigate('/login'); // Redirect to login page
//             } else {
//                 // Handle errors based on the server response
//                 setError(data.message || 'Signup failed. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError(`An error occurred: ${error.message || error}`);
//         }
//     };

//     return (
//         <div className="signup-container">
//             <img src="triton-logo.png" alt="Triton Logo" className="logo" />
//             <h2>Triton Workout Planner</h2>
//             <form onSubmit={handleSignup}>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Create a password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Sign up</button>
//             </form>
//             {error && <p className="error-message">{error}</p>} {/* Display error messages */}
//             <p><Link to="/login">Have an account? Log in here.</Link></p>
//         </div>
//     );
// }

// export default Signup;

// src/components/Signup.js
// src/components/Signup.js
import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('User created successfully');
                navigate('/login'); // Redirect to login page
            } else {
                // Display backend error messages
                setError(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(`An error occurred: ${error.message || error}`);
        }
    };

    return (
        <div className="signup-container">
            <img src="triton-logo.png" alt="Triton Logo" className="logo" />
            <h2>Triton Workout Planner</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign up</button>
            </form>
            {error && <p className="error-message">{error}</p>} {/* Display error messages */}
            <p><Link to="/login">Have an account? Log in here.</Link></p>
        </div>
    );
}

export default Signup;