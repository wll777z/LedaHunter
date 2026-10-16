import { Router } from "express";
import { getPool } from "../db";
import { authMiddleware } from "../middleware";

export const meRoutes = Router();

meRoutes.get("/", authMiddleware, async (req, res) => {
  const db = getPool();
  const userId = (req as any).app?.userId;
  const row = await db.query(
    `select id, email, name, avatar_url, plan, created_at
     from profiles where id = $1`,
    [userId]
  );
  if (row.rows.length === 0) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  res.json({ user: row.rows[0] });
});
