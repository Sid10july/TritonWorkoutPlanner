import { WeekdayWorkout } from "../components/WeekdayWorkouts";
import { Week } from "../constants/constants";

export function WeekPlan(){
    return (
        <div>
            <h1>Weekly Workout Plan</h1>
            {Week.map((day)=>{
                return <WeekdayWorkout day={day}/>
            })}
        </div>
    );
}