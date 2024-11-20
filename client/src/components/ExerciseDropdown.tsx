import React, { useState } from "react";
import RepsTracker from "./RepsTracker";

interface ExerciseDropdownProps {
	day: string; //name of the day
	options: string[]; //exercise options for the dropdown
	selectedExercises: string[]; //list of exercises the user selected
    //handles selection of exercises
	onSelect: (day: string, selectedExercises: string[]) => void; 
    //handles exercise reordering 
	onReorder: (day: string, sourceIndex: number, destinationIndex: number) => void;
    //placeholder text for the dropdown when there's no focus selected
	noFocusPlaceholder: string; // Placeholder text when no focus is selected
	disabled?: boolean, // whether the dropdown is disabled (optional)
}

const ExerciseDropdown: React.FC<ExerciseDropdownProps> = ({
	day,
	options,
	selectedExercises,
	onSelect,
	onReorder,
	noFocusPlaceholder = "Add an exercise", // default placeholder text
	disabled = false, //default disabled value is false
}) => {
    //state that keeps track of the number of repetitions of each exercises
	const [exerciseReps, setExerciseReps] = useState<{
		[day: string]: { [exercise: string]: number };
	}>({});

	// handles adding exercises to the list of user selected exercises
	const handleAddExercise = (exercise: string) => {
		if (!selectedExercises.includes(exercise)) { //if exercise isn't already in the list
            // call onSelect with updated list containing new exercise
			onSelect(day, [...selectedExercises, exercise]);
		}
	};

	// handles removing an exercise from the list of user selected exercises
	const handleRemoveExercise = (exercise: string) => {
        // filter the list of selected exercises, removing the exercise
		onSelect(day, selectedExercises.filter((e) => e !== exercise)); 
	};

	// handles changing the number of repetitions for an exercise
	const handleRepsChange = (exercise: string, newReps: number) => {
		setExerciseReps((prevReps) => ({
			...prevReps,
			[day]: {
				...(prevReps[day] || {}), //keep previous rep numbers of other exercises unchanged
				[exercise]: newReps, //update the number of reps for the specified exercise
			},
		}));
	};

	return (
		<div className="exercise-dropdown">
			<label htmlFor={`${day}-exercise-dropdown`}>Select Exercises:</label>
            {/* dropdown for adding exercises */}
			<select
				id={`${day}-exercise-dropdown`}
				data-testid={`${day}-exercise-dropdown`}
                // call handleAddExercise function on selection
				onChange={(e) => handleAddExercise(e.target.value)}
				value="" //dropdown value reset to the default after an exercise is added
				//disable select if options are empty or dropdown is explicitly set to disable
				disabled={disabled || options.length === 0} 
			>
                {/* placeholder option */}
				<option value="" disabled>
					{options.length === 0 ? noFocusPlaceholder : "Add an exercise"}
				</option>
                {/* display available exercises that aren't already selected */}
				{options
					.filter((option) => !selectedExercises.includes(option))
					.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))
                }
			</select>
            {/* list displaying selected exercises */}
			<ul data-testid={`${day}-exercise-list`}>
				{selectedExercises.map((exercise, index) => (
					<li key={exercise}>
                        {/* display exercise name */}
						<span>{exercise}</span>
						<div className="button-container">
							{/* remove exercise button */}
							<button
								className="remove-button"
								type="button"
								onClick={() => handleRemoveExercise(exercise)}
								disabled={disabled} 
							>
								Remove
							</button>
							{/* button to move the exercise up the list */}
							<button
								type="button"
                                //decrease index by 1 to move upwards
								onClick={() => onReorder(day, index, index - 1)}
                                //disable the button if exercise is already at top of list
								disabled={index === 0 || disabled}
							>
								↑
							</button>
							{/* button to make exercise down the list */}
							<button
								type="button"
                                //increment index by 1 to move downwards
								onClick={() => onReorder(day, index, index + 1)}
                                //disable button if the exercise is already at the bottom of the list
								disabled={index === selectedExercises.length - 1 || disabled}
							>
								↓
							</button>
							{/* reps tracker component */}
							<RepsTracker
								exercise={exercise} //pass exercise name
                                // default to 0 reps if not reps aren't set for the exercise
								reps={exerciseReps[day]?.[exercise] || 0} 
								onRepsChange={(newReps) =>
                                    //update reps count
									handleRepsChange(exercise, newReps)
								}
								disabled={disabled}
							/>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ExerciseDropdown;
