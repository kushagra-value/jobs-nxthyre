// api/jobs.ts
import { MongoClient } from "mongodb";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const uri = process.env.MONGODB_URI!;
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const client = await connectToDatabase();
    const db = client.db("nxthyre-jobs");
    const jobs = await db.collection("AI_ML_Jobs").find({}).toArray();
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
}
