-- 001_initial.sql — LeadHunter AI
-- Perfis, workspaces, leads, pesquisas, listas, notas, atividades, tarefas.

create extension if not exists "pgcrypto";

-- ===== Perfis =====
create table profiles (
  id              uuid primary key default gen_random_uuid(),
  email           text not null unique,
  password_hash   text not null,
  name            text not null,
  avatar_url      text,
  plan            text not null default 'gratuito',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ===== Workspaces (isolamento entre usuários) =====
create table workspaces (
  id              uuid primary key default gen_random_uuid(),
  owner_id        uuid not null references profiles(id) on delete cascade,
  name            text not null default 'Meu workspace',
  created_at      timestamptz not null default now()
);

create table workspace_members (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references workspaces(id) on delete cascade,
  user_id         uuid not null references profiles(id) on delete cascade,
  role            text not null default 'member' check (role in ('owner','member')),
  created_at      timestamptz not null default now(),
  unique (workspace_id, user_id)
);

create index idx_workspace_members_user on workspace_members(user_id);

-- ===== Leads =====
create table leads (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references workspaces(id) on delete cascade,
  source          text not null default 'mapa',  -- "mapa" | "importado"
  provedor_id     text,                            -- ID retornado pelo Google Maps
  nome            text,
  categoria       text,
  endereco        text,
  cidade          text,
  estado          text,
  bairro          text,
  telefone        text,
  site            text,
  nota            text,
  avaliacoes      text,
  horario         text,
  mapa_id         text,
  status          text not null default 'novo',
  prioridade      text not null default 'normal',
  lead_score      integer not null default 0,
  site_informado  text not null default 'nao_informado',  -- "sim" | "nao_informado" | "nao_verificado"
  telefone_disp   text not null default 'nao_informado',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table leads enable row level security;
create policy "leads_own" on leads
  for all
  using (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid))
  with check (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid));

-- ===== Lead notes =====
create table lead_notes (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid not null references leads(id) on delete cascade,
  user_id         uuid not null references profiles(id) on delete cascade,
  content         text not null,
  created_at      timestamptz not null default now()
);

alter table lead_notes enable row level security;
create policy "notes_own" on lead_notes
  for all
  using (lead_id in (select id from leads where workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid)))
  with check (lead_id in (select id from leads where workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid)));

-- ===== Lead lists =====
create table lead_lists (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references workspaces(id) on delete cascade,
  name            text not null,
  created_at      timestamptz not null default now()
);

alter table lead_lists enable row level security;
create policy "lists_own" on lead_lists
  for all
  using (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid))
  with check (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid));

-- ===== Lead list items =====
create table lead_list_items (
  id              uuid primary key default gen_random_uuid(),
  list_id         uuid not null references lead_lists(id) on delete cascade,
  lead_id         uuid not null references leads(id) on delete cascade,
  created_at      timestamptz not null default now(),
  unique (list_id, lead_id)
);

alter table lead_list_items enable row level security;
create policy "items_own" on lead_list_items
  for all
  using (list_id in (select id from lead_lists where workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid)))
  with check (list_id in (select id from lead_lists where workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid)));

-- ===== Lead activities (histórico) =====
create table lead_activities (
  id              uuid primary key default gen_random_uuid(),
  lead_id         uuid not null references leads(id) on delete cascade,
  user_id         uuid not null references profiles(id) on delete cascade,
  kind            text not null,
  payload         jsonb,
  created_at      timestamptz not null default now()
);

alter table lead_activities enable row level security;
create policy "activities_own" on lead_activities
  for all
  using (lead_id in (select id from leads where workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid)))
  with check (lead_id in (select id from leads where workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid)));

-- ===== Searches (registro de pesquisas) =====
create table searches (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references workspaces(id) on delete cascade,
  query           text not null,
  category        text,
  city            text,
  state           text,
  country         text,
  radius_km       integer,
  filters       jsonb,
  page            integer default 1,
  limit           integer default 20,
  created_at      timestamptz not null default now()
);

alter table searches enable row level security;
create policy "searches_own" on searches
  for all
  using (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid))
  with check (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid));

-- ===== Tasks =====
create table tasks (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references workspaces(id) on delete cascade,
  lead_id         uuid references leads(id) on delete set null,
  title           text not null,
  done            boolean not null default false,
  due_at          timestamptz,
  user_id         uuid not null references profiles(id) on delete cascade,
  created_at      timestamptz not null default now()
);

alter table tasks enable row level security;
create policy "tasks_own" on tasks
  for all
  using (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid))
  with check (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid));

-- ===== Message templates =====
create table message_templates (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references workspaces(id) on delete cascade,
  name            text not null,
  body            text not null,
  tone            text not null default 'profissional',
  created_at      timestamptz not null default now()
);

alter table message_templates enable row level security;
create policy "templates_own" on message_templates
  for all
  using (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid))
  with check (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid));

-- ===== Usage records (créditos) =====
create table usage_records (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references workspaces(id) on delete cascade,
  service         text not null,     -- "pesquisa_mapa" | "ia" | "exportacao"
  quantity        integer not null default 0,
  created_at      timestamptz not null default now()
);

alter table usage_records enable row level security;
create policy "usage_own" on usage_records
  for all
  using (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid))
  with check (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid));

-- ===== Subscriptions (planos) =====
create table subscriptions (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references workspaces(id) on delete cascade,
  plan            text not null,
  price_brl       numeric(10,2) not null default 0,
  stripe_id       text,
  status          text not null default 'active',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table subscriptions enable row level security;
create policy "subscriptions_own" on subscriptions
  for all
  using (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid))
  with check (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid));

-- ===== Audit logs =====
create table audit_logs (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references workspaces(id) on delete cascade,
  actor_id        uuid references profiles(id) on delete set null,
  action          text not null,
  entity          text,
  entity_id       text,
  details         jsonb,
  created_at      timestamptz not null default now()
);

alter table audit_logs enable row level security;
create policy "logs_own" on audit_logs
  for all
  using (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid))
  with check (workspace_id in (select id from workspace_members where user_id = current_setting('app.user_id')::uuid));

-- ===== Globals (configuração do app) =====
create table app_globals (
  key         text primary key,
  value       jsonb not null
);

-- Índices auxiliares para pesquisa e filtros
create index idx_leads_workspace on leads(workspace_id);
create index idx_leads_status on leads(status);
create index idx_leads_cidade on leads(cidade);
create index idx_leads_estado on leads(estado);
create index idx_leads_nome on leads(nome);
create index idx_searches_workspace on searches(workspace_id);
create index idx_searches_created_at on searches(created_at desc);
create index idx_tasks_workspace on tasks(workspace_id);
create index idx_tasks_lead on tasks(lead_id);
create index idx_usage_workspace_service on usage_records(workspace_id, service);
