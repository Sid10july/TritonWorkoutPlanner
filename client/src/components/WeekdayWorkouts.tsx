// import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Exercise, ScheduledExercise } from "../types/types";
// import { WorkoutsContext } from "../context/workouts-context";

// /**
//  * 
//  * @param day - the day
//  */
// export function WeekdayWorkout({ day }: { day: string }) {
//     const { weeklyWorkouts, setWeeklyWorkouts } = useContext(WorkoutsContext);
//     const todaysDetails: ScheduledExercise = weeklyWorkouts.find((x) => x.day === day) || { day: day, exercises: [], startTime: "00:00", endTime: "00:00" };
//     const [exercises, setExercises] = useState<Exercise[]>(todaysDetails.exercises || []);
//     const [loading, setLoading] = useState(false);

//     // Fetch existing data from the backend when the component mounts
//     useEffect(() => {
//         const fetchWorkoutPlan = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch(`http://localhost:8080/api/workoutPlans/day?day=${day}`);
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch workout plan");
//                 }

//                 const data = await response.json();
//                 console.log("Fetched workout plan:", data);

//                 setWeeklyWorkouts((prevWorkouts) => {
//                     const updatedWorkouts = prevWorkouts.filter((x) => x.day !== day);
//                     updatedWorkouts.push(data);
//                     return updatedWorkouts;
//                 });
//                 setExercises(data.exercises || []);
//             } catch (error) {
//                 console.error("Error fetching workout plan:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchWorkoutPlan();
//     }, [day, setWeeklyWorkouts]);

//     const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setWeeklyWorkouts((prevWorkouts) => {
//             return prevWorkouts.map((daySchedule) => {
//                 if (daySchedule.day === day) {
//                     return {
//                         ...daySchedule,
//                         startTime: e.target.value,
//                     };
//                 }
//                 return daySchedule;
//             });
//         });
//     };

//     const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setWeeklyWorkouts((prevWorkouts) => {
//             return prevWorkouts.map((daySchedule) => {
//                 if (daySchedule.day === day) {
//                     return {
//                         ...daySchedule,
//                         endTime: e.target.value,
//                     };
//                 }
//                 return daySchedule;
//             });
//         });
//     };

//     const handleReorder = (updatedExercises: Exercise[]) => {
//         setExercises(updatedExercises);
//     };

//     const saveWorkoutPlan = async () => {
//         const requestBody = {
//             day,
//             exercises,
//             startTime: todaysDetails.startTime,
//             endTime: todaysDetails.endTime,
//         };

//         console.log("Request body for saving workout plan:", requestBody); // Debug log

//         try {
//             const response = await fetch("http://localhost:8080/api/workoutPlans/day", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(requestBody),
//             });

//             if (!response.ok) {
//                 const error = await response.json();
//                 console.error("Error response from server:", error); // Debug log
//                 throw new Error("Failed to save workout plan");
//             }

//             const data = await response.json();
//             console.log("Workout plan saved successfully:", data); // Debug log
//             alert("Workout plan saved successfully!");
//         } catch (error) {
//             console.error("Error saving workout plan:", error);
//             alert("Error saving workout plan.");
//         }
//     };

//     return (
//         <div className="card mb-3">
//             <div className="card-header d-flex justify-content-between align-items-center">
//                 <h5 className="mb-0">{day}'s Plan</h5>
//             </div>
//             <div className="card-body d-flex">
//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <>
//                         <div className="flex-grow-1 text-center">
//                             {todaysDetails.exercises.length > 0 ? (
//                                 <ul className="list-group mx-auto">
//                                     <FancyWorkoutsDisplay exercises={exercises} onReorder={handleReorder} />
//                                 </ul>
//                             ) : (
//                                 <p>No exercises planned for {day}.</p>
//                             )}
//                         </div>
//                         <div className="ms-4" style={{ minWidth: "200px" }}>
//                             <div className="mb-3">
//                                 <label htmlFor="startTime" className="form-label">
//                                     Start Time
//                                 </label>
//                                 <input
//                                     type="time"
//                                     id="startTime"
//                                     className="form-control"
//                                     value={todaysDetails.startTime}
//                                     onChange={handleStartTimeChange}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="endTime" className="form-label">
//                                     End Time
//                                 </label>
//                                 <input
//                                     type="time"
//                                     id="endTime"
//                                     className="form-control"
//                                     value={todaysDetails.endTime}
//                                     onChange={handleEndTimeChange}
//                                 />
//                             </div>
//                         </div>
//                     </>
//                 )}
//             </div>
//             <div className="card-footer d-flex justify-content-between">
//                 <Link to={`/Day-Planner/${day}`} className="btn btn-primary btn-sm">
//                     Add
//                 </Link>
//                 <button onClick={saveWorkoutPlan} className="btn btn-success btn-sm">
//                     Save
//                 </button>
//             </div>
//         </div>
//     );
// }
// type FancyWorkoutsDisplayProps = {
//   exercises: Exercise[];
//   onReorder: (updatedExercises: Exercise[]) => void;
// };

// export function FancyWorkoutsDisplay({ exercises, onReorder }: FancyWorkoutsDisplayProps) {
//   const [workouts, setWorkouts] = useState<Exercise[]>(exercises);

//   const moveUp = (index: number) => {
//       if (index === 0) return;
//       const updatedWorkouts = [...workouts];
//       [updatedWorkouts[index - 1], updatedWorkouts[index]] = [
//           updatedWorkouts[index],
//           updatedWorkouts[index - 1],
//       ];
//       setWorkouts(updatedWorkouts);
//       onReorder(updatedWorkouts);
//   };

//   const moveDown = (index: number) => {
//       if (index === workouts.length - 1) return;
//       const updatedWorkouts = [...workouts];
//       [updatedWorkouts[index], updatedWorkouts[index + 1]] = [
//           updatedWorkouts[index + 1],
//           updatedWorkouts[index],
//       ];
//       setWorkouts(updatedWorkouts);
//       onReorder(updatedWorkouts);
//   };

//   const deleteExercise = (index: number) => {
//       const updatedWorkouts = workouts.filter((_, i) => i !== index); // Remove the selected exercise
//       setWorkouts(updatedWorkouts);
//       onReorder(updatedWorkouts);
//   };

//   return (
//       <ul className="list-group">
//           {workouts.map((exercise, index) => (
//               <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//                   <div>
//                       <strong>{exercise.name}</strong> - {exercise.muscle} ({exercise.difficulty})
//                   </div>
//                   <div>
//                       <button
//                           className="btn btn-sm btn-secondary me-2"
//                           onClick={() => moveUp(index)}
//                           disabled={index === 0}
//                       >
//                           ↑
//                       </button>
//                       <button
//                           className="btn btn-sm btn-secondary me-2"
//                           onClick={() => moveDown(index)}
//                           disabled={index === workouts.length - 1}
//                       >
//                           ↓
//                       </button>
//                       <button
//                           className="btn btn-sm btn-danger"
//                           onClick={() => deleteExercise(index)}
//                       >
//                           🗑️
//                       </button>
//                   </div>
//               </li>
//           ))}
//       </ul>
//   );
// }
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Exercise, ScheduledExercise } from "../types/types";
import { WorkoutsContext } from "../context/workouts-context";

export function WeekdayWorkout({ day }: { day: string }) {
  const { weeklyWorkouts, setWeeklyWorkouts, modifiedDays } = useContext(WorkoutsContext);
  const todaysDetails: ScheduledExercise =
      weeklyWorkouts.find((x) => x.day === day) || { day: day, exercises: [], startTime: "00:00", endTime: "00:00" };
  const [exercises, setExercises] = useState<Exercise[]>(todaysDetails.exercises || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (modifiedDays.has(day)) {
          console.log(`Skipping fetch for ${day} because it was recently modified.`);
          return;
      }

      setLoading(true);
      const fetchWorkoutPlan = async () => {
          try {
              const response = await fetch(`http://localhost:8080/api/workoutPlans/day?day=${day}`);
              if (!response.ok) {
                  throw new Error("Failed to fetch workout plan");
              }

              const data = await response.json();
              console.log("Fetched workout plan:", data);

              setWeeklyWorkouts((prevWorkouts) => {
                  const updatedWorkouts = prevWorkouts.filter((x) => x.day !== day);
                  updatedWorkouts.push(data);
                  return updatedWorkouts;
              });
              setExercises(data.exercises || []);
          } catch (error) {
              console.error("Error fetching workout plan:", error);
          } finally {
              setLoading(false);
          }
      };

      fetchWorkoutPlan();
  }, [day, setWeeklyWorkouts, modifiedDays]);

  const renderExercises = () => {
      if (loading) {
          return <p>Loading...</p>;
      }

      if (todaysDetails.exercises.length > 0) {
          return (
              <ul className="list-group mx-auto">
                  <FancyWorkoutsDisplay exercises={exercises} onReorder={(updated) => setExercises(updated)} />
              </ul>
          );
      }

      return <p>No exercises planned for {day}.</p>;
  };
    const saveWorkoutPlan = async () => {
      const updatedDetails = {
          ...todaysDetails,
          exercises,
      };

      // Update weeklyWorkouts state synchronously
      setWeeklyWorkouts((prevWorkouts) => {
          const updatedWorkouts = prevWorkouts.map((daySchedule) =>
              daySchedule.day === day ? updatedDetails : daySchedule
          );
          return updatedWorkouts;
      });

      const requestBody = {
          day,
          exercises: updatedDetails.exercises,
          startTime: updatedDetails.startTime,
          endTime: updatedDetails.endTime,
      };

      console.log("Request body for saving workout plan:", requestBody);

      try {
          const response = await fetch("http://localhost:8080/api/workoutPlans/day", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
          });

          if (!response.ok) {
              const error = await response.json();
              console.error("Error response from server:", error);
              throw new Error("Failed to save workout plan");
          }

          const data = await response.json();
          console.log("Workout plan saved successfully:", data);
          alert("Workout plan saved successfully!");
      } catch (error) {
          console.error("Error saving workout plan:", error);
          alert("Error saving workout plan.");
      }
};

    return (
        <div className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{day}'s Plan</h5>
            </div>
            <div className="card-body d-flex">
                <div className="flex-grow-1 text-center">{renderExercises()}</div>
                <div className="ms-4" style={{ minWidth: "200px" }}>
                    <div className="mb-3">
                        <label htmlFor="startTime" className="form-label">
                            Start Time
                        </label>
                        <input
                            type="time"
                            id="startTime"
                            className="form-control"
                            value={todaysDetails.startTime}
                            onChange={(e) =>
                                setWeeklyWorkouts((prevWorkouts) =>
                                    prevWorkouts.map((daySchedule) =>
                                        daySchedule.day === day
                                            ? { ...daySchedule, startTime: e.target.value }
                                            : daySchedule
                                    )
                                )
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endTime" className="form-label">
                            End Time
                        </label>
                        <input
                            type="time"
                            id="endTime"
                            className="form-control"
                            value={todaysDetails.endTime}
                            onChange={(e) =>
                                setWeeklyWorkouts((prevWorkouts) =>
                                    prevWorkouts.map((daySchedule) =>
                                        daySchedule.day === day
                                            ? { ...daySchedule, endTime: e.target.value }
                                            : daySchedule
                                    )
                                )
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-between">
                <Link to={`/Day-Planner/${day}`} className="btn btn-primary btn-sm">
                    Edit
                </Link>
                <button onClick={saveWorkoutPlan} className="btn btn-success btn-sm">
                    Save
                </button>
            </div>
        </div>
      );
    }

type FancyWorkoutsDisplayProps = {
    exercises: Exercise[];
    onReorder: (updatedExercises: Exercise[]) => void;
};

export function FancyWorkoutsDisplay({ exercises, onReorder }: FancyWorkoutsDisplayProps) {
    const [workouts, setWorkouts] = useState<Exercise[]>(exercises);

    const moveUp = (index: number) => {
        if (index === 0) return;
        const updatedWorkouts = [...workouts];
        [updatedWorkouts[index - 1], updatedWorkouts[index]] = [
            updatedWorkouts[index],
            updatedWorkouts[index - 1],
        ];
        setWorkouts(updatedWorkouts);
        onReorder(updatedWorkouts);
    };

    const moveDown = (index: number) => {
        if (index === workouts.length - 1) return;
        const updatedWorkouts = [...workouts];
        [updatedWorkouts[index], updatedWorkouts[index + 1]] = [
            updatedWorkouts[index + 1],
            updatedWorkouts[index],
        ];
        setWorkouts(updatedWorkouts);
        onReorder(updatedWorkouts);
    };

    return (
        <ul className="list-group">
            {workouts.map((exercise, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>{exercise.name}</strong> - {exercise.muscle} ({exercise.difficulty})
                    </div>
                    <div>
                        <button
                            className="btn btn-sm btn-secondary me-2"
                            onClick={() => moveUp(index)}
                            disabled={index === 0}
                        >
                            ↑
                        </button>
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => moveDown(index)}
                            disabled={index === workouts.length - 1}
                        >
                            ↓
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}