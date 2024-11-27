// Sidebar.tsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchUserData } from "../../utils/user-utils";
import { SidebarProps } from "../../types/types"; // Ensure SidebarProps includes setIsLoggedIn
import { SidebarOption } from "./SidebarOption";
import { dummyProfileData } from "../../constants/constants";
import "./Sidebar.css";

const optionStrings = [
  { str: "Start Workout", path: "/" },
  { str: "My Workouts", path: "/workout-planner" },
  { str: "Exercise Library", path: "/exercise-library" },
  { str: "Track Progress", path: "/track-progress" },
  { str: "Change Preferences", path: "/change-preferences" },
  { str: "Workout Calendar", path: "/workout-calendar" },
];

export const Sidebar = (props: SidebarProps) => {
  const [openLogout, setOpenLogout] = useState(false);
  const [userInfo, setUserInfo] = useState(dummyProfileData);
  const navigate = useNavigate();

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    fetchUserData(props.userId)
      .then((result) => setUserInfo(result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-container pt-3">
        <p className="sidebar-title fs-2 mb-3">Triton Workout Planner</p>
        {optionStrings.map((option, id: number) => (
          <NavLink
            to={option.path}
            key={id}
            className={({ isActive }) =>
              isActive
                ? "sidebar-option sidebar-option-active"
                : "sidebar-option"
            }
            onClick={() => props.sidebarClickHandler(id)}
          >
            <SidebarOption
              optionString={option.str}
              isCurrentPage={id === props.pageIndex}
            />
          </NavLink>
        ))}
        <div
          className="sidebar-account"
          onClick={() => {
            setOpenLogout(!openLogout);
          }}
        >
          <img
            src="/account_circle.png"
            alt="profile icon"
            className="sidebar-profile_icon"
          />
          <p className="mb-0">
            {userInfo.username} 🔥: {userInfo.streak}
          </p>
          <img
            src="/arrow_drop_up.png"
            alt="dropdown icon"
            className="sidebar-dropdown_icon"
          />
        </div>
        {openLogout && (
          <div className="sidebar-logout">
            <p
              className="text-center mb-0 text-danger"
              onClick={() => {
                props.setIsLoggedIn(false); // Update authentication state
                navigate("/login"); // Redirect to login page
              }}
            >
              Log Out
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
