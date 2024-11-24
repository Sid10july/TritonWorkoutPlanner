import { useState } from "react";
import { InputFieldProps } from "../types/types";
import "./InputField.css";

export const InputField = (props: InputFieldProps) => {
  const [inputText, setInputText] = useState("");
  const placeholderText = props.goalMet
    ? "Old goal: " + props.targetValue.toString()
    : "Goal: " + props.targetValue.toString();

  return (
    <div className="inputField-container mb-3">
      {props.goalString ? (
        <p className="text-start fs-3 mb-0 p-1">{props.goalString}</p>
      ) : null}
      <input
        className="inputField-input fs-3"
        placeholder={placeholderText}
        value={inputText}
        onChange={(e) => {
          // Only input numbers
          let inputText = e.target.value;
          if (!isNaN(Number(inputText))) {
            setInputText(inputText);
          }
          props.inputChangeHandler(props.id, Number(inputText));
        }}
      ></input>
    </div>
  );
};
