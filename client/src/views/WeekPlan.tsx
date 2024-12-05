import { WeekdayWorkout } from "../components/WeekdayWorkouts";
import { Week } from "../constants/constants";
import { useContext, useEffect, useState } from "react";
import { WorkoutsContext } from "../context/workouts-context";
import { fetchWeeklyWorkouts,saveWeeklyPlan } from "../utils/workout-utils";
import { ScheduledExercise } from "../types/types";

export function WeekPlan({userId}:{userId: string}){
    const {weeklyWorkouts, setWeeklyWorkouts, numRenders, setNumRenders} = useContext(WorkoutsContext);
    

    async function handleSave() {
        console.log(`handleSave called with userId:${userId}`);
        saveWeeklyPlan(userId,weeklyWorkouts);
    }

    useEffect(() => {
        if(numRenders > 0){return;}
        const fetchData = async () => {
          try {
            const workouts: ScheduledExercise[] = await fetchWeeklyWorkouts(userId);
            setWeeklyWorkouts(workouts); // Set the fetched data in state
            console.log(workouts);
            setNumRenders(numRenders+1);
          } catch (error) {
            console.error('Error fetching workouts:', error);
          }
        };
    
        fetchData(); // Call fetchData on mount
      }, []);
    
    return (
        <div>
            <h1>Weekly Workout Plan</h1>
            {Week.map((day)=>{
                return <WeekdayWorkout handleSave={handleSave} key={day} day={day}/>
            })}
        </div>
    );
}