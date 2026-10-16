import { useEffect, useState } from "react";

export function Dashboard() {
  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-sub">Bem-vindo ao LeadHunter AI.</p>
      <div className="grid grid-2">
        <div className="card">
          <h3>Leads salvos</h3>
          <p className="text-3xl font-semibold">0</p>
          <p className="text-muted">Da sua conta</p>
        </div>
        <div className="card">
          <h3>Novos</h3>
          <p className="text-3xl font-semibold">0</p>
          <p className="text-muted">Este mês</p>
        </div>
        <div className="card">
          <h3>Contatados</h3>
          <p className="text-3xl font-semibold">0</p>
          <p className="text-muted">Este mês</p>
        </div>
        <div className="card">
          <h3>Interessados</h3>
          <p className="text-3xl font-semibold">0</p>
          <p className="text-muted">Este mês</p>
        </div>
      </div>
      <div className="card mt-3">
        <h3>Últimas pesquisas</h3>
        <p className="text-muted">Nenhuma pesquisa realizada ainda.</p>
      </div>
    </div>
  );
}
