import axios from "axios";

// Use axios baseURL to define the port
axios.defaults.baseURL = `http://localhost:${process.env.PORT || 8080}`;

/**
 * Function to get user data from the server side
 * @params userId - to retrieve specific user data from the database
 * @returns The username, email, goals, and streak count
 */
export async function fetchUserData(userId: string): Promise<any> {
  try {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
  } catch (err) {
    console.log("Network error: " + err);
  }
}

/**
 * Function to increment streak data from the server side
 * @params userId - to increment streak for specific user from the database
 * @returns The streak count
 */
export async function incrementStreak(userId: string): Promise<any> {
  try {
    const response = await axios.patch(`/streaks/${userId}/increment`);
    return response.data;
  } catch (err) {
    console.log("Network error: " + err);
  }
}

/**
 * Function to reset streak data from the server side
 * @params userId - to reset streak for specific user from the database
 * @returns The streak count (0)
 */
export async function resetStreak(userId: string): Promise<any> {
  try {
    const response = await axios.patch(`/streaks/${userId}/reset`);
    return response.data;
  } catch (err) {
    console.log("Network error: " + err);
  }
}

/**
 * Function to update last workout date from the server side
 * @params userId - to update workout date for specific user from the database
 * @params date - new date to store in the database
 * @returns The updated workout date
 */
export async function updateWorkoutDate(
  userId: string,
  date: number[]
): Promise<any> {
  try {
    const data = { userId: userId, date: date };

    const response = await axios.patch(`/streaks/logWorkoutDate`, data);
    return response.data;
  } catch (err) {
    console.log("Network error: " + err);
  }
}

/**
 * Function to add workout progress from the server side
 * @params userId - to update workout date for specific user from the database
 * @params date - date of workout progress
 * @params goals - array of goals with goal IDs and progress values
 * @returns All progress update logs
 */
export async function addWorkoutProgress(
  userId: string,
  date: string,
  goals: { _id: string; value: number }[]
): Promise<any> {
  try {
    const data = { date: date, goals: goals };
    const response = await axios.post(`/progress/${userId}`, data);
    return response.data;
  } catch (err) {
    console.log("Network error: " + err);
  }
}

/**
 * Function to get all workout progress logs from the server side
 * @params userId - to update workout date for specific user from the database
 * @returns All progress update logs
 */
export async function getWorkoutProgress(userId: string): Promise<any> {
  try {
    const response = await axios.get(`/progress/${userId}`);
    return response.data;
  } catch (err) {
    console.log("Network error: " + err);
  }
}

/**
 * Function to delete all workout progress logs from the server side
 * @params userId - to update workout date for specific user from the database
 * @returns All progress update logs (empty array)
 */
export async function deleteWorkoutProgress(userId: string): Promise<any> {
  try {
    const response = await axios.delete(`/progress/${userId}`);
    return response.data;
  } catch (err) {
    console.log("Network error: " + err);
  }
}
