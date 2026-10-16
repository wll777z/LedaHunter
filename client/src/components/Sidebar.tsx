import { NavLink } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  currentPath: string;
}

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/buscar", label: "Buscar leads" },
  { to: "/resultados", label: "Resultados da pesquisa" },
  { to: "/meus-leads", label: "Meus leads" },
  { to: "/listas", label: "Listas e campanhas" },
  { to: "/favoritos", label: "Favoritos" },
  { to: "/historico", label: "Histórico de pesquisas" },
  { to: "/modelos", label: "Modelos de mensagens" },
  { to: "/ia", label: "Assistente de IA" },
  { to: "/exportar", label: "Exportação de dados" },
  { to: "/configuracoes", label: "Configurações da conta" },
  { to: "/plano", label: "Plano e consumo" },
  { to: "/admin", label: "Painel administrativo" },
];

export function Sidebar({ open, onClose, currentPath }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`sidebar${open ? " sidebar-open" : ""}`}
        aria-label="Navegação principal"
      >
        <div className="sidebar-logo">
          <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="none" stroke="#0d9488" stroke-width="2" />
            <path
              d="M8 22 L14 12 L18 18 L24 8"
              fill="none"
              stroke="#0d9488"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h1>LeadHunter AI</h1>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          Provisório — sem sessão multiusuário ainda, acesso para todos.
        </div>
      </aside>
    </>
  );
}
