import { useState } from "react";

export function ResultadosBusca() {
  return (
    <div>
      <h1 className="page-title">Resultados da pesquisa</h1>
      <p className="page-sub">
        Nenhum resultado ainda. O estado da pesquisa depende da integração com
        o Google Places.
      </p>
    </div>
  );
}
