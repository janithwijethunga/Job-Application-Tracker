// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable in .env");
}

export const mongoClient = new MongoClient(uri);
export const mongoDb = mongoClient.db();