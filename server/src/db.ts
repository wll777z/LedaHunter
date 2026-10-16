import { Pool } from "pg";

let pool: Pool | null = null;

function createPool(): Pool {
  const url = process.env.DATABASE_URL ?? "postgres://user:***@localhost:5432/leadhunter";
  const pool = new Pool({ connectionString: url, max: 10 });
  pool.on("error", (err) => {
    console.error("PostgreSQL pool error:", err);
  });
  return pool;
}

export function getPool(): Pool {
  if (!pool) {
    pool = createPool();
  }
  return pool;
}

export async function connectDB() {
  const db = getPool();
  try {
    await db.query("SELECT 1");
    console.log("Database connected.");
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
}
