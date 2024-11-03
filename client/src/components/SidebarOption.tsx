import { SidebarOptionProps } from "../types/types";
import "./SidebarOption.css";

export const SidebarOption = (props: SidebarOptionProps) => {
  // Base style for all options
  let sidebarOptionPStyle = "fs-4 text-start ps-4 mb-0 py-2";
  // If current option, highlight in blue and bold the text

  return (
    <div className="sidebarOption-container mb-3">
      <p className={props.isCurrentPage ? "sidebarOption-current" : ""}>
        {props.optionString}
      </p>
    </div>
  );
};

export default SidebarOption;
