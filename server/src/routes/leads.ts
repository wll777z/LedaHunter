import { Router } from "express";
import { getPool } from "../db";
import { authMiddleware } from "../middleware";

export const leadsRoutes = Router();

leadsRoutes.get("/", authMiddleware, async (req, res) => {
  const db = getPool();
  const userId = (req as any).app?.userId;
  const { status, category, city, state, page = 1, limit = 20, q } = req.query as any;
  const offset = (Number(page) - 1) * Number(limit);
  const conditions = ["workspace_id in (select id from workspace_members where user_id = $1)"];
  const params: (string | number)[] = [userId];

  if (q) {
    conditions.push("(nome ilike $2 or categoria ilike $2 or cidade ilike $2 or estado ilike $2)");
    params.push(`%${q}%`);
  }
  if (status) {
    conditions.push("status = $3");
    params.push(status);
  }
  if (category) {
    conditions.push("categoria = $4");
    params.push(category);
  }
  if (city) {
    conditions.push("cidade = $5");
    params.push(city);
  }
  if (state) {
    conditions.push("estado = $6");
    params.push(state);
  }

  const where = conditions.map((c, i) => `(${c})`).join(" and ");
  const totalRes = await db.query(
    `select count(*)::int as total from leads where ${where}`,
    params
  );
  const total = Number(totalRes.rows[0]?.total ?? 0);

  const { rows } = await db.query(
    `select id, source, provedor_id, nome, categoria, endereco, cidade, estado, bairro,
            telefone, site, nota, avaliacoes, horario, mapa_id, status, prioridade,
            lead_score, site_informado, telefone_disp, created_at, updated_at
     from leads where ${where}
     order by created_at desc
     limit $7 offset $8`,
    [...params, Number(limit), offset]
  );

  res.json({ data: rows, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / Number(limit)) });
});

leadsRoutes.post("/", authMiddleware, async (req, res) => {
  const { source = "mapa", provedor_id, ...fields } = req.body ?? {};
  const db = getPool();
  const userId = (req as any).app?.userId;
  const { rows } = await db.query(
    `insert into leads (workspace_id, source, provedor_id, nome, categoria, endereco, cidade, estado, bairro, telefone, site, nota, avaliacoes, horario, mapa_id, status, prioridade, lead_score, site_informado, telefone_disp)
     values ((select id from workspace_members where user_id = $1), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
     returning id, source, provedor_id, nome, categoria, endereco, cidade, estado, bairro, telefone, site, nota, avaliacoes, horario, mapa_id, status, prioridade, lead_score, site_informado, telefone_disp, created_at, updated_at`,
    [userId,
     source,
     provedor_id ?? null,
     fields.nome ?? null,
     fields.categoria ?? null,
     fields.endereco ?? null,
     fields.cidade ?? null,
     fields.estado ?? null,
     fields.bairro ?? null,
     fields.telefone ?? null,
     fields.site ?? null,
     fields.nota ?? null,
     fields.avaliacoes ?? null,
     fields.horario ?? null,
     fields.mapa_id ?? null,
     fields.status ?? "novo",
     fields.prioridade ?? "normal",
     Number(fields.lead_score ?? 0),
     fields.site_informado ?? "nao_informado",
     fields.telefone_disp ?? "nao_informado"]
  );
  res.status(201).json(rows[0]);
});
