import React from 'react';

interface ExerciseCheckboxProps {
    day: string;
    exercise: string;
    isChecked: boolean;
    onToggle: (exercise: string) => void; //passes exercise name to update the exercises list
}

const ExerciseCheckbox: React.FC<ExerciseCheckboxProps> = ({ day, exercise, isChecked, onToggle }) => {
    return (
        <div key={exercise} className="exercise-checklist">
            <input
                type="checkbox"
                id={`${day}-${exercise}`} //id combines day and exercise name
                checked={isChecked} // checked state is set based on isChecked prop
                onChange={() => onToggle(exercise)} // onToggle function called when checkbox is toggled
            />
            <label htmlFor={`${day}-${exercise}`}>{exercise}</label>
        </div>
    );
};

export default ExerciseCheckbox;