import { Exercise, ScheduledExercise } from "../types/types";
import { SERVER_URL } from "../constants/constants";
import { state } from "../constants/constants";

const PORT = process.env.PORT || 8080;

/**
 * Function to get workouts from the server side
 * @param params - to filter the results {name: ,type: , muscle: , difficulty: }
 */
export async function fetchWorkouts(params: any): Promise<Exercise[]> {
  /**
   * Helper function that builds the url
   * @param url
   * @param params
   * @returns
   */
  function buildUrlWithQueryParams(url: string, params: any) {
    const queryParams = Object.entries(params)
      .filter(([key, value]) => value != null && value !== "") // Filter out null or empty values
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
      )
      .join("&");

    return queryParams ? `${url}?${queryParams}` : url;
  }
  const url = buildUrlWithQueryParams(`${SERVER_URL}${PORT}/workouts`, params);
  console.log(`fetchWorkouts function called with url: ${url}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return response.json() || [];
}

/**
 * This function sends a GET request to the server to retrieve the Weekly Plan of the user
 */
export async function fetchWeeklyWorkouts(username: string): Promise<ScheduledExercise[]> {
    console.log(`${SERVER_URL}${PORT}/api/workouts`);
    console.log(username);
    try {
      const response = await fetch(`${SERVER_URL}${PORT}/api/workouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch workout plan:", error);
      return state;
    }
  };

export async function saveWeeklyPlan(username: string, weeklyWorkoutPlan: ScheduledExercise[]){
    console.log(`${SERVER_URL}${PORT}/api/workouts`);
    console.log(username);
    try {
      const response = await fetch(`${SERVER_URL}${PORT}/api/workouts/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, weeklyWorkoutPlan }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Failed to save workout plan:", error);
      return null;
    }
  };
  
