import { useState } from "react";

export function Admin() {
  return (
    <div>
      <h1 className="page-title">Painel administrativo</h1>
      <p className="page-sub">
        Usuários, planos, consumo, erros de processamento e logs de auditoria
        do time de administração.
      </p>
    </div>
  );
}
