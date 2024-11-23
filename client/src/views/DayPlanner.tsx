import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { muscles,difficultyLevels,exerciesTypes } from '../constants/constants';
import { fetchWorkouts } from '../utils/workout-utils';
import { Exercise } from '../types/types';

export function DayPlanner(){
    const {day} = useParams();
    return (
        <div>
            <h1>This is the {`${day}`} planner</h1>
            <QueryForm/>
        </div>
        
    );
}


function QueryForm(){
    const [type,setType] = useState('');
    const [muscle,setMuscle] = useState('');
    const [difficulty,setDifficulty] = useState('');

/**
 * On form submission. Send the values of muscle, type and difficulty to fetchWorkouts function with these values.
 * @param event - Form submission event
 */
    async function onSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const params = {'type': type, 'muscle': muscle, 'difficulty': difficulty};
        try{
            const workouts: Exercise[]= await fetchWorkouts(params);
            console.log(`Workouts:${workouts}`);
        } catch(error){
            console.log(error);
        }
    }
    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <div className="row">
                <div className="col-sm">
                    <label htmlFor="type">Type</label>
                    <select
                        data-testid="type"
                        required
                        className="form-control"
                        id="type"
                        value={type}
                        onChange={(e) => {
                        console.log(`Change triggered: ${e.target.value}`);
                        setType(e.target.value);
                        }}
                    >
                        <option value="" disabled>
                        Select a type
                        </option>
                        {exerciesTypes.map((value,index) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                        ))}
                    </select>
                </div>
                
                <div className="col-sm">
                    <label htmlFor="muscle">Muscle Group</label>
                    <select
                        data-testid="muscle"
                        required
                        className="form-control"
                        id="muscle"
                        value={muscle}
                        onChange={(e) => {
                        console.log(`Change triggered: ${e.target.value}`);
                        setMuscle(e.target.value);
                        }}
                    >
                        <option value="" disabled>
                        Select a muscle
                        </option>
                        {muscles.map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                        ))}
                    </select>
                </div>

                <div className="col-sm">
                    <label htmlFor="difficulty">Difficulty level</label>
                    <select
                        data-testid="difficulty"
                        required
                        className="form-control"
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => {
                        console.log(`Change triggered: ${e.target.value}`);
                        setDifficulty(e.target.value);
                        }}
                    >
                        <option value="" disabled>
                        Select a difficulty
                        </option>
                        {difficultyLevels.map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                        ))}
                    </select>
                </div>

                <div className="col-sm">
                <button type="submit" className="btn btn-primary mt-3">
                    Search
                </button>
                </div>
            </div>
        </form>
    );
}
