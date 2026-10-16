import { Router } from "express";
import { getPool } from "../db";
import { authMiddleware } from "../middleware";

export const plansRoutes = Router();

const defaultPlans = {
  gratuito: { limitePesquisas: 0, limiteLeads: 50, exportacao: true },
  starter: { limitePesquisas: 0, limiteLeads: 2000, exportacao: true },
  pro: { limitePesquisas: 0, limiteLeads: 10000, exportacao: true },
  business: { limitePesquisas: 0, limiteLeads: Infinity, exportacao: true },
};

plansRoutes.get("/", authMiddleware, async (req, res) => {
  const db = getPool();
  const userId = (req as any).app?.userId;
  const { rows } = await db.query(
    `select plan, price_brl, status from subscriptions where workspace_id in (select id from workspace_members where user_id = $1) order by id desc limit 1`,
    [userId]
  );
  const current = rows[0]?.status ?? "gratuito";
  const plan = defaultPlans[current as keyof typeof defaultPlans] ?? defaultPlans.gratuito;
  res.json({ current, plan });
});

plansRoutes.post("/activate", authMiddleware, async (req, res) => {
  const { plan } = req.body ?? {};
  const db = getPool();
  const userId = (req as any).app?.userId;
  if (!["gratuito","starter","pro","business"].includes(plan)) {
    return res.status(400).json({ error: "Plano inválido" });
  }
  const { rows } = await db.query(
    `insert into subscriptions (workspace_id, plan, price_brl, status)
     values ((select id from workspace_members where user_id = $1), $2, 0, 'active')
     on conflict (workspace_id) do update set plan = $2, updated_at = now()
     returning id, plan, price_brl, status`,
    [userId, plan]
  );
  res.json(rows[0]);
});
