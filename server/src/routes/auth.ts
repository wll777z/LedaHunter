import { Router } from "express";
import bcrypt from "bcryptjs";
import { getPool } from "../db";
import { signToken } from "../auth";

export const authRoutes = Router();

authRoutes.post("/sign-up", async (req, res) => {
  const { email, password, name } = req.body ?? {};
  if (!email || !password || !name) {
    return res.status(400).json({ error: "email, senha e nome são obrigatórios" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "A senha precisa ter pelo menos 6 caracteres" });
  }

  const db = getPool();
  const exists = await db.query("select id from profiles where email = $1", [email]);
  if (exists.rows.length > 0) {
    return res.status(409).json({ error: "E-mail já está em uso" });
  }

  const hash = await bcrypt.hash(password, 10);
  const { rows } = await db.query(
    `insert into profiles (email, password_hash, name)
     values ($1, $2, $3)
     returning id, email, name, plan, created_at`,
    [email, hash, name]
  );

  const user = rows[0];
  const workspace = await db.query(
    `insert into workspaces (owner_id, name) values ($1, $2) returning id`,
    [user.id, "Meu workspace"]
  );
  const token = signToken({ sub: user.id, email: user.email, name: user.name, workspaceId: workspace.rows[0].id, role: "owner" });

  res.status(201).json({
    user: { id: user.id, email: user.email, name: user.name, plan: user.plan, avatar_url: null },
    token,
    workspaceId: workspace.rows[0].id,
  });
});

authRoutes.post("/sign-in", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ error: "email e senha são obrigatórios" });
  }
  const db = getPool();
  const row = await db.query("select * from profiles where email = $1", [email]);
  if (row.rows.length === 0) {
    return res.status(401).json({ error: "E-mail ou senha inválidos" });
  }
  const user = row.rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({ error: "E-mail ou senha inválidos" });
  }

  const workspace = await db.query(
    `select id from workspaces where owner_id = $1 limit 1`,
    [user.id]
  );
  const token = signToken({
    sub: user.id,
    email: user.email,
    name: user.name,
    workspaceId: workspace.rows[0]?.id ?? "",
    role: "owner",
  });
  res.json({
    user: { id: user.id, email: user.email, name: user.name, plan: user.plan, avatar_url: null },
    token,
  });
});

authRoutes.post("/sign-out", (_req, res) => {
  res.json({ ok: true });
});
