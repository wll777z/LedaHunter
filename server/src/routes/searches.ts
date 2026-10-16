import { Router } from "express";
import { getPool } from "../db";
import { authMiddleware } from "../middleware";

export const searchesRoutes = Router();

searchesRoutes.post("/", authMiddleware, async (req, res) => {
  const { category, city, state, country, radius_km, query, filters, page = 1, limit = 20 } = req.body ?? {};
  const db = getPool();
  const userId = (req as any).app?.userId;

  const { rows } = await db.query(
    `insert into searches (workspace_id, query, category, city, state, country, radius_km, filters, page, limit)
     values ((select id from workspace_members where user_id = $1), $2, $3, $4, $5, $6, $7, $8, $9, $10)
     returning id, workspace_id, query, category, city, state, country, radius_km, filters, page, limit, created_at`,
    [userId,
     query ?? null,
     category ?? null,
     city ?? null,
     state ?? null,
     country ?? null,
     radius_km ?? null,
     JSON.stringify(filters ?? {}),
     Number(page),
     Number(limit)]
  );

  res.status(201).json({
    data: rows[0],
    results: [],
    state: config.integrationsDisabled ? "integracao_pendente" : "avaliando",
  });
});
