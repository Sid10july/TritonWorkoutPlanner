interface RepsTrackerProps {
	exercise: string; //exercise name
	reps: number; //amount of reps for the exercise
	onRepsChange: (newReps: number) => void; //handle changes to the number of repetitions
}

const RepsTracker: React.FC<RepsTrackerProps> = ({exercise, reps, onRepsChange}) => {
    //handles any changes that occur to the reps input box
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // converts the inputted value from string to a number
		const newValue = Number(e.target.value); 
		if (!isNaN(newValue)) { //ensures newValue is a number
			onRepsChange(newValue); //call the onRepsChange with the user's inputted value
		}
	};

	return (
		<div className="reps-tracker">
			<label htmlFor={`${exercise}-reps`}>Reps:</label>
            {/* input box for inputting the amount of reps */}
			<input
				type="number"
				id={`${exercise}-reps`}
				value={reps} //current number of repetitions
				onChange={handleInputChange} // handles input change when user inputs a value
				min={0} //minimum value for reps is 0
				className="reps-input"
			/>
		</div>
	);
};

export default RepsTracker;
