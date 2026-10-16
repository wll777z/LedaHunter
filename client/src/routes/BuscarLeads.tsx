import { useState } from "react";

export function BuscarLeads() {
  return (
    <div>
      <h1 className="page-title">Buscar leads</h1>
      <p className="page-sub">
        Pesquise estabelecimentos pelo Google Maps.
      </p>
      <div className="card">
        <p className="integration-pending">
          <strong>Integração pendente.</strong> O Google Places precisa de uma
          chave de API configurada no arquivo <code>.env.example</code> e
          publicada no Google Cloud. A busca não retorna resultados até que isso
          aconteça.
        </p>
      </div>
    </div>
  );
}
