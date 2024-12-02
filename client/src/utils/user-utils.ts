import axios from "axios";

// Use axios baseURL to define the port
axios.defaults.baseURL = `http://localhost:${process.env.PORT || 8080}`;

/**
 * Function to get user data from the server side
 * @params userId - to retrieve specific user data from the database
 * @returns The username, email, goals, and streak count
 */
export async function fetchUserData(userId: string): Promise<any> {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
}

/**
 * Function to increment streak data from the server side
 * @params userId - to increment streak for specific user from the database
 * @returns The streak count
 */
export async function incrementStreak(userId: string): Promise<any> {
  const response = await axios.patch(`/streaks/${userId}/increment`);
  return response.data;
}

/**
 * Function to reset streak data from the server side
 * @params userId - to reset streak for specific user from the database
 * @returns The streak count (0)
 */
export async function resetStreak(userId: string): Promise<any> {
  const response = await axios.patch(`/streaks/${userId}/reset`);
  return response.data;
}
