import {MongoClient, Db} from "mongodb";

export async function initializeDatabase() {
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();
    const db = client.db("Users").collection('user-credentials');
    return db;
  }