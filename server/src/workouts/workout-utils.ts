import { Request, Response } from "express";
import axios from 'axios';

const apiUrl = 'https://api.api-ninjas.com/v1/exercises';
const apiKey = process.env.EXERCISE_API_KEY;

interface Exercise {
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
  }

export async function getWorkouts(req: Request, res: Response){
    console.log(`getWorkouts function called`);

    console.log(req.params);
    
    function buildUrlWithQueryParams(url : string, params: any) {
        const queryParams = Object.entries(params)
          .filter(([key, value]) => value != null && value !== '')  // Filter out null or empty values
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
          .join('&');
    
        return queryParams ? `${url}?${queryParams}` : url;
      }

    const url = buildUrlWithQueryParams(apiUrl, req.query);
    console.log(url);
    try {
        const response = await axios.get<{ results: Exercise[] }>(url, {
          headers: {
            'x-api-key' : `${apiKey}`
          },
        });
        // Send the workout plans as a JSON response
        res.status(201).json(response.data);
      } catch (error) {
        console.error('Error fetching workout plans:', error);
        // Send an error response if the API request fails
        res.status(500).json({ error: 'Failed to fetch workout plans' });
      }
};
