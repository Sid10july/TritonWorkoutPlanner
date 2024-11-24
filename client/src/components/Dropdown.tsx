import React from "react";

interface DropdownProps {
  id: string;
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  id,
  options,
  value,
  onChange,
  placeholder,
  disabled = false //default disabled value is false
}) => {
  return (
    <select id={id} value={value} onChange={onChange} disabled={disabled}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
