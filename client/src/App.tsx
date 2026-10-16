import { useState, useCallback, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Sidebar } from "./components/Sidebar";
import { Landing } from "./routes/Landing";
import { Login } from "./routes/Login";
import { Cadastro } from "./routes/Cadastro";
import { Recuperacao } from "./routes/Recuperacao";
import { Dashboard } from "./routes/Dashboard";
import { BuscarLeads } from "./routes/BuscarLeads";
import { ResultadosBusca } from "./routes/ResultadosBusca";
import { MeusLeads } from "./routes/MeusLeads";
import { ListasCampanhas } from "./routes/ListasCampanhas";
import { Favoritos } from "./routes/Favoritos";
import { HistoricoPesquisas } from "./routes/HistoricoPesquisas";
import { ModelosMensagens } from "./routes/ModelosMensagens";
import { AssistenteIA } from "./routes/AssistenteIA";
import { Exportacao } from "./routes/Exportacao";
import { Configuracoes } from "./routes/Configuracoes";
import { PlanoConsumo } from "./routes/PlanoConsumo";
import { Admin } from "./routes/Admin";

export default function App() {
  const { me, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="page">
        <div className="spinner" />
      </div>
    );
  }

  const isAuthenticated = !!me;

  return (
    <div className="page">
      {isAuthenticated ? (
        <>
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            currentPath={location.pathname}
          />
          <main className="main" id="conteudo">
            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/buscar" element={<BuscarLeads />} />
                <Route path="/resultados" element={<ResultadosBusca />} />
                <Route path="/meus-leads" element={<MeusLeads />} />
                <Route path="/listas" element={<ListasCampanhas />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/historico" element={<HistoricoPesquisas />} />
                <Route path="/modelos" element={<ModelosMensagens />} />
                <Route path="/ia" element={<AssistenteIA />} />
                <Route path="/exportar" element={<Exportacao />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                <Route path="/plano" element={<PlanoConsumo />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperacao" element={<Recuperacao />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </div>
  );
}
