export function Landing() {
  return (
    <>
      <div className="site-header">
        <div className="container">
          <a href="/" className="brand">
            <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="#0d9488" />
              <path
                d="M8 22 L14 12 L18 18 L24 8"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>LeadHunter AI</span>
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            <a href="#funcionalidades">Funcionalidades</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#planos">Planos</a>
            <a href="/faq">FAQ</a>
            <a href="/login">Entrar</a>
            <a className="btn btn-primary btn-sm" href="/cadastro">
              Criar conta
            </a>
          </nav>
        </div>
      </div>

      <main id="conteudo">
        <section className="hero">
          <div className="container">
            <div className="hero-copy">
              <p className="eyebrow">Plataforma de prospecção comercial</p>
              <h1 className="hero-title">
                Descubra quem precisa do seu serviço.
                <br />
                Não adivinhe, encontre.
              </h1>
              <p className="hero-sub">
                Pesquise estabelecimentos comerciais no Google Maps, escolha o
                segmento e a região, e comece um cadastro de leads com os dados
                reais do local.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary btn-lg" href="/cadastro">
                  Começar grátis
                </a>
                <a className="btn btn-ghost btn-lg" href="#como-funciona">
                  Como funciona
                </a>
              </div>
              <p className="hero-note">
                Não precisa de cartão de crédito. Sem dados fictícios. Apenas
                empresas reais.
              </p>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="hero-card">
                <div className="hero-card-top">
                  <span className="badge badge-success">Encontrado</span>
                  <span className="badge badge-warn">Novo</span>
                </div>
                <p className="hero-card-title">Clínica Imagine</p>
                <p className="hero-card-sub">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  São Paulo, SP
                </p>
                <p className="hero-card-sub">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  (11) 99999-0000
                </p>
                <button className="btn btn-ghost btn-sm">Ver no Maps</button>
                <div className="hero-card-bar">
                  <span className="hero-card-bar-fill" style={{ width: "92%" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="funcionalidades" className="section">
          <div className="container">
            <p className="section-tag">Sobre o produto</p>
            <h2 className="section-title">Tudo o que um vendedor precisa pra fazer prospecção.</h2>
            <div className="features">
              <article className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3>Pesquisa geolocalizada</h3>
                <p>
                  Busque por segmento (clínicas, salões, restaurantes,
                  oficinas) e filtre por cidade, bairro e raio.
                </p>
              </article>
              <article className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3>Dados do estabelecimento</h3>
                <p>
                  Endereço, telefone, site, avaliações, rótulo e horário, quando
                  o Maps informa.
                </p>
              </article>
              <article className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3>Leads e listas</h3>
                <p>
                  Salve empresas, organize em listas por nicho ou campanha e
                  acompanhe o status.
                </p>
              </article>
              <article className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </div>
                <h3>O que é interessante</h3>
                <p>
                  Critério objetivo que aponta pontos fortes e gaps sem
                  prometer conversão.
                </p>
              </article>
              <article className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3>Modelos de mensagem</h3>
                <p>
                  Pré-montados, personalizáveis e abertos no WhatsApp com apenas
                  uma clique.
                </p>
              </article>
              <article className="feature">
                <div className="feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </div>
                <h3>Organização e prioridade</h3>
                <p>
                  Status, tarefas, observações e histórico por lead, com filtros
                  pelos próprios dados.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="section section-alt">
          <div className="container">
            <p className="section-tag">Para que serve</p>
            <h2 className="section-title">Fluxo projetado para funcionar em poucos minutos.</h2>
            <ol className="steps">
              <li className="step">
                <span className="step-num">1</span>
                <h4>Escolha seu foco</h4>
                <p>
                  Selecione o segmento (ex.: clínicas odontológicas) e a
                  região.
                </p>
              </li>
              <li className="step">
                <span className="step-num">2</span>
                <h4>Busque no Maps</h4>
                <p>
                  O formulário envia a pesquisa e os filtros para o Google Maps;
                  você vê os locais reais, com capa e dados oficiais.
                </p>
              </li>
              <li className="step">
                <span className="step-num">3</span>
                <h4>Revise e salve</h4>
                <p>
                  Abra o perfil, confira o que está disponível e salve o lead.
                  Os campos vazios ficam como "Não informado" — nunca adivinhamos.
                </p>
              </li>
              <li className="step">
                <span className="step-num">4</span>
                <h4>Priorize</h4>
                <p>
                  Use o Lead Score para indicar o que vale a pena abrir. Marque
                  favoritos, crie listas e organize a carga de trabalho.
                </p>
              </li>
              <li className="step">
                <span className="step-num">5</span>
                <h4>Entre em contato</h4>
                <p>
                  Teste a mensagem, abra o WhatsApp com os dados reais do local e
                  crie uma tarefa para fechar.
                </p>
              </li>
              <li className="step">
                <span className="step-num">6</span>
                <h4>Acompanhe</h4>
                <p>
                  Atualize o status, leve os registros em CSV e decida que planos
                  há mais valor.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section id="planos" className="section">
          <div className="container">
            <p className="section-tag">Planos</p>
            <h2 className="section-title">Planos simples. Sem fidelidade.</h2>
            <p className="section-sub">
              Cada plano limita operações; o limite exato é definido pelo
              administrador. Nenhum plano promete conteúdo que o Maps não
              disponibiliza.
            </p>
            <div className="plan-grid">
              <article className="plan">
                <h3>Gratuito</h3>
                <p className="price">R$ 0</p>
                <ul className="plan-list">
                  <li>Pesquisa ilimitada (com limites de taxa do Maps)</li>
                  <li>Até 50 leads salvos</li>
                  <li>Listas e favoritos</li>
                  <li>Modelos de mensagem</li>
                  <li>O que é interessante e estimativa de presença digital</li>
                  <li>Exportação CSV</li>
                </ul>
                <a className="btn btn-ghost" href="/login">
                  Começar
                </a>
              </article>
              <article className="plan featured">
                <h3>Starter <span>Recomendado</span></h3>
                <p className="price">R$ 89<small>/mês</small></p>
                <ul className="plan-list">
                  <li>Pesquisa ilimitada (com limites de taxa do Maps)</li>
                  <li>Até 2.000 leads salvos</li>
                  <li>Listas e campanhas</li>
                  <li>Estatísticas por lead e filtros</li>
                  <li>Todos os modelos de mensagem</li>
                  <li>Importação de locais existentes</li>
                  <li>Exportação CSV + relatório de uso</li>
                </ul>
                <a className="btn btn-primary" href="/login">
                  Começar
                </a>
              </article>
              <article className="plan">
                <h3>Business</h3>
                <p className="price">R$ 249<small>/mês</small></p>
                <ul className="plan-list">
                  <li>Pesquisa ilimitada (com limites de taxa do Maps)</li>
                  <li>Quantidade ilimitada de leads</li>
                  <li>Uso de múltiplos perfis</li>
                  <li>Relatórios detalhados e filtros por período</li>
                  <li>Modelos e chat de inteligência comercial</li>
                  <li>Exportação avançada</li>
                  <li>Suporte prioritário</li>
                </ul>
                <a className="btn btn-ghost" href="/login">
                  Falar com vendas
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <p className="section-tag">Perguntas</p>
            <h2 className="section-title">Aqui está o que mais se pergunta.</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h4>O Google Maps pode fornecer nome, endereço, telefone e site?</h4>
                <p>
                  Sim, quando o usuário autorizar e o estado da API permitir. O
                  app só exibe o que o Maps devolve; campos em branco ficam
                  "Não informado".
                </p>
              </div>
              <div className="faq-item">
                <h4>Preciso dar acesso à minha conta de Google?</h4>
                <p>
                  Sim, para usar o Maps. Você só precisa autorizar o aplicativo a
                  usar o Maps e a chave da API do Google; o app não salva sua
                  senha.
                </p>
              </div>
              <div className="faq-item">
                <h4>Tudo é armazenado no banco do Supabase?</h4>
                <p>
                  Sim, as credenciais do Maps ficam na camada do cliente no
                  backend; o app fala com o backend e não com o Maps. Os dados do
                  usuário são isolados por trabalho.
                </p>
              </div>
              <div className="faq-item">
                <h4>O que acontece se eu não tiver acesso à API?</h4>
                <p>
                  O estado da pesquisa mostra "integração pendente". O app não
                  finge que encontrou tudo. A interface contínua está pronta
                  para quando a configuração estiver pronta.
                </p>
              </div>
              <div className="faq-item">
                <h4>Posso migrar para o plano Business depois?</h4>
                <p>
                  Sim. No painel de planos, você pode mudar a linha de assinatura
                  conforme o administrador estiver disponível. Deixamos o ambiente
                  de migração aberto.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <h2>Comece a encontrar clientes agora.</h2>
            <p>
              Cadastro grátis. Sem cartão de crédito. Os dados são reais quando o
              Maps disponibiliza.
            </p>
            <a className="btn btn-primary btn-lg" href="/cadastro">
              Criar conta grátis
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="/" className="brand">
                <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
                  <rect width="32" height="32" rx="8" fill="#0d9488" />
                  <path
                    d="M8 22 L14 12 L18 18 L24 8"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>LeadHunter AI</span>
              </a>
              <p className="footer-note">
                Plataforma de prospecção comercial. Dados fornecidos pelo Google
                Maps; dados do usuário em banco próprio e privado.
              </p>
            </div>
            <div>
              <h4>Navegação</h4>
              <ul className="footer-links">
                <li><a href="#funcionalidades">Funcionalidades</a></li>
                <li><a href="#como-funciona">Como funciona</a></li>
                <li><a href="#planos">Planos</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/login">Entrar</a></li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul className="footer-links">
                <li><a href="/terminos">Termos de uso</a></li>
                <li><a href="/privacidade">Política de privacidade</a></li>
                <li><a href="/suporte">Suporte</a></li>
              </ul>
            </div>
            <div>
              <h4>Product</h4>
              <ul className="footer-links">
                <li>Cadastro</li>
                <li>Login</li>
                <li>Painel</li>
                <li>Como funciona</li>
                <li>Suporte</li>
              </ul>
            </div>
          </div>
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} LeadHunter AI. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
