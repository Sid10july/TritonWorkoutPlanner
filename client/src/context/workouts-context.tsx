// import { createContext, useState } from "react";
// import { ScheduledExercise } from "../types/types";

// const state: ScheduledExercise[] = [
//     { day: "Monday", exercises: [], startTime: "00:00", endTime: "00:00" },
//     { day: "Tuesday", exercises: [], startTime: "00:00", endTime: "00:00" },
//     { day: "Wednesday", exercises: [], startTime: "00:00", endTime: "00:00" },
//     { day: "Thursday", exercises: [], startTime: "00:00", endTime: "00:00" },
//     { day: "Friday", exercises: [], startTime: "00:00", endTime: "00:00" },
//     { day: "Saturday", exercises: [], startTime: "00:00", endTime: "00:00" },
//     { day: "Sunday", exercises: [], startTime: "00:00", endTime: "00:00" },
// ];


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
import React, { createContext, useState } from "react";
import { ScheduledExercise } from "../types/types";

interface WorkoutsContextType {
    weeklyWorkouts: ScheduledExercise[];
    setWeeklyWorkouts: React.Dispatch<React.SetStateAction<ScheduledExercise[]>>;
    modifiedDays: Set<string>;
    setModifiedDays: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const WorkoutsContext = createContext<WorkoutsContextType>({
    weeklyWorkouts: [],
    setWeeklyWorkouts: () => {},
    modifiedDays: new Set(),
    setModifiedDays: () => {},
});

export const WorkoutsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [weeklyWorkouts, setWeeklyWorkouts] = useState<ScheduledExercise[]>([]);
    const [modifiedDays, setModifiedDays] = useState<Set<string>>(new Set());

    return (
        <WorkoutsContext.Provider value={{ weeklyWorkouts, setWeeklyWorkouts, modifiedDays, setModifiedDays }}>
            {children}
        </WorkoutsContext.Provider>
    );
};