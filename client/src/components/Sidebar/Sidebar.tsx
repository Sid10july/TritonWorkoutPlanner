import { Link } from "react-router-dom";
import { SidebarProps } from "../../types/types";
import { SidebarOption } from "./SidebarOption";
import "./Sidebar.css";

const optionStrings = [
  { str: "Start Workout", path: "/" },
  { str: "My Workouts", path: "/workout-planner" },
  { str: "Exercise Library", path: "/exercise-library" },
  { str: "Track Progress", path: "/" },
  { str: "Change Preferences", path: "/" },
];

export const Sidebar = (props: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar-container pt-3">
        <p className="sidebar-title fs-2 mb-3">Triton Workout Planner</p>
        {optionStrings.map((option, id: number) => {
          return (
            <Link
              to={option.path}
              key={id}
              className="sidebar-option"
              onClick={() => props.sidebarClickHandler(id)}
            >
              <SidebarOption
                optionString={option.str}
                isCurrentPage={id === props.pageIndex}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
