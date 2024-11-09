import { Link } from "react-router-dom";
import "./App.css"

export const Navbar = () => {
  return (
	<div className="navbar-container">
		<nav className="navbar">
			<Link to="/" className="nav-link">Home</Link>
			<Link to="/workout-planner" className="nav-link">Workout Planner</Link>
			<Link to="/exercise-library" className="nav-link">Exercise Library</Link>
		</nav>
	</div>
  );
};