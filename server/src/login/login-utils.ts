import { Request, Response } from "express";

/**
 * Creates a user on the backend. A POST function
 */
export async function createUser(req: Request, res: Response, db: any) {
    const { username, email, password } = req.body as { username: string, email: string, password: string };

    if (!username || !email || !password) {
        return res.status(400).send({ message: "All fields are required" });
    }

    try {
        // If the email already exists - reroute to login page on client
        const existingEmail = await db.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({ message: "Email is already in use" });
        }

        // If username already exists ask to change the username
        const existingUsername = await db.findOne({ username });
        if (existingUsername) {
            return res.status(401).send({ message: "Username is already taken" });
        }

        // Create user details object
        const user_details = {
            username: username,
            email: email,
            password: password
        };

        // Insert the new user document into the collection
        await db.insertOne(user_details);

        // Respond with success
        res.status(201).send({ message: "User created" });
    } catch (err: any) {
        console.error(`Error creating user: ${err.message}`);
        res.status(500).send({ message: "Could not create an account" });
    }
}
