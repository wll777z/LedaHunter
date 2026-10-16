import { getPool } from "./db";

export async function incrementUsage(service: string, quantity = 1) {
  const db = getPool();
  await db.query(
    `insert into usage_records(workspace_id, service, quantity)
     values ($1, $2, $3)
     on conflict (workspace_id, service) do update set quantity = usage_records.quantity + $3`,
    [service, quantity]
  );
}

export async function getUsage(workspaceId: string, service?: string) {
  const db = getPool();
  const q = service
    ? "select sum(quantity) as total from usage_records where workspace_id = $1 and service = $2"
    : "select sum(quantity) as total from usage_records where workspace_id = $1";
  const res = await db.query(q, [workspaceId, service ?? null]);
  return Number(res.rows[0]?.total ?? 0);
}
