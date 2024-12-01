import { WeekdayWorkout } from "../components/WeekdayWorkouts";
import { Week } from "../constants/constants";

export function WeekPlan(){
    return (
        <div>
            {Week.map((day)=>{
                return <WeekdayWorkout day={day}/>
            })}
        </div>
    );
}