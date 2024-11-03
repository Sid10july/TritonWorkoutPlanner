import { SidebarProps } from "../types/types";
import { SidebarOption } from "./SidebarOption";
import "./Sidebar.css";

const optionStrings = [
  "Start Workout",
  "My Workouts",
  "Track Progress",
  "Change Preferences",
];

export const Sidebar = (props: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar-container pt-3">
        <p className="sidebar-title fs-2 mb-3">Triton Workout Planner</p>
        {optionStrings.map((option: string, id: number) => {
          return (
            <div
              key={id}
              className="sidebar-option"
              onClick={() => props.sidebarClickHandler(id)}
            >
              <SidebarOption
                optionString={option}
                isCurrentPage={id === props.pageIndex}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
