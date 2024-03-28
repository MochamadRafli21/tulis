import { userseed } from "./default_user";
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";


const seed = () => {
  dotenv.config();
  if (!("DB_URL" in process.env))
    throw new Error("DATABASE_URL not found on .env.development");
  const client = new Pool({
    connectionString: process.env.DB_URL,
  });
  const db = drizzle(client);
  userseed(db)
}

seed()
