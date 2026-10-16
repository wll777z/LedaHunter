import { useState } from "react";
import { useAuth } from "../../src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Cadastro() {
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    try {
      await signUp(email, senha, nome);
      navigate("/");
    } catch (err: any) {
      setErro(err.message ?? "Falha no cadastro");
    }
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <h1>Criar conta</h1>
        <p>Comece a prospecção no LeadHunter AI.</p>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="email2">E-mail</label>
            <input
              id="email2"
              type="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="senha2">Senha</label>
            <input
              id="senha2"
              type="password"
              placeholder="No mínimo 6 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          {erro && <p className="err-msg mt-3">{erro}</p>}
          <button className="primary" type="submit" disabled={loading}>
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>
        <p className="text-muted mt-3">
          Já tem conta?{" "}
          <a href="/login">Entrar</a>
        </p>
      </div>
    </div>
  );
}
