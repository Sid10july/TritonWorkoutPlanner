import { createContext, useState } from "react";
import { ScheduledExercise } from "../types/types";

const state: ScheduledExercise[] = [
    { day: "Sunday", exercises: [], startTime: "00:00", endTime: "00:00" },
    { day: "Monday", exercises: [], startTime: "00:00", endTime: "00:00" },
    { day: "Tuesday", exercises: [], startTime: "00:00", endTime: "00:00" },
    { day: "Wednesday", exercises: [], startTime: "00:00", endTime: "00:00" },
    { day: "Thursday", exercises: [], startTime: "00:00", endTime: "00:00" },
    { day: "Friday", exercises: [], startTime: "00:00", endTime: "00:00" },
    { day: "Saturday", exercises: [], startTime: "00:00", endTime: "00:00" }
];


interface context {
    weeklyWorkouts: ScheduledExercise[],
    setWeeklyWorkouts: React.Dispatch<React.SetStateAction<ScheduledExercise[]>>;
}
const initialState: context = {
    weeklyWorkouts : state,
    setWeeklyWorkouts: () => {}
}

export const WorkoutsContext = createContext<context>(initialState);

export function WorkoutsProvider(props: any){
    const [weeklyWorkouts,setWeeklyWorkouts] = useState<ScheduledExercise[]>(state);
    return (
        <WorkoutsContext.Provider
          value={{
            weeklyWorkouts: weeklyWorkouts,
            setWeeklyWorkouts: setWeeklyWorkouts
          }}
        >
          {props.children}
        </WorkoutsContext.Provider>
      );
}