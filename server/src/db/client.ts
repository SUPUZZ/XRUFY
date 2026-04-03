import "../loadEnv.js";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const url = process.env.DATABASE_URL;

export const pool = url ? new pg.Pool({ connectionString: url, max: 10 }) : null;

/** Drizzle instance; null when `DATABASE_URL` is unset. */
export const db = pool ? drizzle(pool) : null;
