import { SidebarOptionProps } from "../../types/types";
import "./SidebarOption.css";

export const SidebarOption = (props: SidebarOptionProps) => {
  return (
    <div className="sidebarOption-container mb-3">
      <p className={props.isCurrentPage ? "sidebarOption-current" : ""}>
        {props.optionString}
      </p>
    </div>
  );
};

export default SidebarOption;
