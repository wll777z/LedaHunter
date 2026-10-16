import { useState } from "react";
import { useAuth } from "../../src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    try {
      await signIn(email, senha);
      navigate("/");
    } catch (err: any) {
      setErro(err.message ?? "Falha no login");
    }
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <h1>Entrar</h1>
        <p>Acesse sua conta no LeadHunter AI.</p>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Suas credenciais"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {erro && <p className="err-msg mt-3">{erro}</p>}
          <button className="primary" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p className="text-muted mt-3">
          Não tem conta?{" "}
          <a href="/cadastro">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
