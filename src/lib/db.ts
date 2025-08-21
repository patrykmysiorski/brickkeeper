import { MongoClient } from "mongodb";

const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const appName = process.env.MONGO_DB_APP_NAME;

export default async function connectToDb() {
  const connectionString = `mongodb+srv://${username}:${password}@cluster0.itwqvhc.mongodb.net/?retryWrites=true&w=majority&appName=${appName}`;

  const client = new MongoClient(connectionString);
  return client;
}
