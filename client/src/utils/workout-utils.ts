import {Response} from  'express'
import { Exercise } from '../types/types'
import { SERVER_URL } from '../constants/constants'

/**
 * Function to get workouts from the server side
 * @param params - to filter the results {name: ,type: , muscle: , difficulty: }
 */
export async function fetchWorkouts(params: String):Promise<Exercise[]>{
    const response = await fetch(`${SERVER_URL}/workouts`);
    if (!response.ok) {
    	throw new Error('Failed to fetch expenses');
	}
    return response.json() || [];
}