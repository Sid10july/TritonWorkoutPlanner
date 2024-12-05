// import { createContext, useState } from "react";
// import { ScheduledExercise } from "../types/types";


// interface context {
    //     weeklyWorkouts: ScheduledExercise[],
    //     setWeeklyWorkouts: React.Dispatch<React.SetStateAction<ScheduledExercise[]>>;
    // }
    // const initialState: context = {
        //     weeklyWorkouts : state,
        //     setWeeklyWorkouts: () => {}
        // }
        
        // export const WorkoutsContext = createContext<context>(initialState);
        
        // export function WorkoutsProvider(props: any){
            //     const [weeklyWorkouts,setWeeklyWorkouts] = useState<ScheduledExercise[]>(state);
            //     return (
                //         <WorkoutsContext.Provider
                //           value={{
                    //             weeklyWorkouts: weeklyWorkouts,
                    //             setWeeklyWorkouts: setWeeklyWorkouts
                    //           }}
                    //         >
                    //           {props.children}
                    //         </WorkoutsContext.Provider>
                    //       );
                    // }

import React, { createContext, useEffect, useState } from "react";
import { ScheduledExercise } from "../types/types";
import { fetchWeeklyWorkouts } from "../utils/workout-utils";

const state: ScheduledExercise[] = [
    { day: "Monday", exercises: [], startTime: "00:00", endTime: "00:00" },
    { day: "Tuesday", exercises: [], startTime: "00:00", endTime: "00:00" },
    { day: "Wednesday", exercises: [], startTime: "00:00", endTime: "00:00" },
    { day: "Thursday", exercises: [], startTime: "00:00", endTime: "00:00" },
    { day: "Friday", exercises: [], startTime: "00:00", endTime: "00:00" },
    { day: "Saturday", exercises: [], startTime: "00:00", endTime: "00:00" },
    { day: "Sunday", exercises: [], startTime: "00:00", endTime: "00:00" },
];

interface WorkoutsContextType {
    weeklyWorkouts: ScheduledExercise[];
    setWeeklyWorkouts: React.Dispatch<React.SetStateAction<ScheduledExercise[]>>;
    numRenders: number;
    setNumRenders: React.Dispatch<React.SetStateAction<number>>;
}

export const WorkoutsContext = createContext<WorkoutsContextType>({
    weeklyWorkouts: [],
    setWeeklyWorkouts: () => {},
    numRenders: 0,
    setNumRenders: () => {}
});

export const WorkoutsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [weeklyWorkouts, setWeeklyWorkouts] = useState<ScheduledExercise[]>(state);
    const [numRenders, setNumRenders] = useState<number>(0);
    
    return (
        <WorkoutsContext.Provider value={{ weeklyWorkouts, setWeeklyWorkouts
        , numRenders, setNumRenders
        }}>
            {children}
        </WorkoutsContext.Provider>
    );
};