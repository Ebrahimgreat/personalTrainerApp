// src/db/index.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { config } from "dotenv";
import "dotenv/config";
config({ path: '.env' });
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
