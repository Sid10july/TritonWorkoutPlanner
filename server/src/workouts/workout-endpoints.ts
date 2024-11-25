import { getWorkouts } from "./workout-utils";
import { Request, Response } from "express";


export async function createWorkoutEndpoints(app: any){
    app.get("/workouts", (req: Request, res: Response) =>{
        getWorkouts(req,res);
    })

}