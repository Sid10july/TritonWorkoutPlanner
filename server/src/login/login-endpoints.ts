import { createUser } from "./login-utils";
import { Request, Response } from "express";


export async function createLoginEndpoints(app: any, db: any){
    app.post("/sign-up", (req: Request, res: Response) =>{
        createUser(req,res,db);
    })

}