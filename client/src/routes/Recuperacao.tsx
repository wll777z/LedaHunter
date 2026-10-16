import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Recuperacao() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    try {
      await fetch("/api/auth/reciepe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      navigate("/login", { state: { reset: true } });
    } catch {
      setErro("Falha ao enviar e-mail de recuperação.");
    }
  }

  return (
    <div className="auth">
      <div className="auth-card">
        <h1>Esqueceu a senha?</h1>
        <p>
          Enviamos um e-mail com instruções para redefinir sua senha.
        </p>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mt-3">
            <label htmlFor="email3">E-mail</label>
            <input
              id="email3"
              type="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          {erro && <p className="err-msg mt-3">{erro}</p>}
          <button className="primary" type="submit">
            Enviar e-mail
          </button>
        </form>
        <p className="text-muted mt-3">
          <a href="/login">Voltar ao login</a>
        </p>
      </div>
    </div>
  );
}
