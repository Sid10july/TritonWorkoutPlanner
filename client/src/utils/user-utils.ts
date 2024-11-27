import axios from "axios";

// Use axios baseURL to define the port
axios.defaults.baseURL = `http://localhost:${process.env.PORT || 8080}`;

export async function fetchUserData(userId: string): Promise<any> {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
}

export async function incrementStreak(userId: string): Promise<any> {
  const response = await axios.patch(`/streaks/${userId}/increment`);
  return response.data;
}

export async function resetStreak(userId: string): Promise<any> {
  const response = await axios.patch(`/streaks/${userId}/reset`);
  return response.data;
}
