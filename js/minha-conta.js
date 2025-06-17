// Script para preencher a seção Minha Conta com os dados do usuário cadastrado
// --- INTEGRAÇÃO BACK-END: substituir localStorage por API futuramente ---
window.addEventListener('DOMContentLoaded', function() {
  // Recupera dados do usuário do localStorage (ou API futuramente)
  const nome = localStorage.getItem('nomeUsuario') || '';
  const email = localStorage.getItem('emailUsuario') || '';
  const foto = localStorage.getItem('fotoUsuario') || '';

  // Preenche avatar e nome
  const avatar = document.querySelector('.user-avatar span');
  const nomeEl = document.querySelector('.user-nome');
  if (nome) {
    nomeEl.textContent = nome;
    if (avatar) {
      const iniciais = nome.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
      avatar.textContent = iniciais;
    }
  } else {
    nomeEl.textContent = 'Visitante';
    if (avatar) avatar.textContent = '??';
  }

  // Tabs
  const conteudo = document.getElementById('conteudo-conta');
  function renderPedidos() {
    conteudo.innerHTML = `
      <h2>Meus Pedidos</h2>
      <div class="pedidos-table-wrap">
        <table class="pedidos-table">
          <thead>
            <tr>
              <th>Nº Pedido</th>
              <th>Data</th>
              <th>Itens</th>
              <th>Total</th>
              <th>Status</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            <!-- INTEGRAÇÃO BACK-END: Listar pedidos do usuário -->
            <tr><td colspan="6" style="text-align:center;color:#888;">Nenhum pedido encontrado.</td></tr>
          </tbody>
        </table>
      </div>
    `;
  }
  function renderDados() {
    conteudo.innerHTML = `
      <h2>Dados da Conta</h2>
      <div class="dados-conta-box">
        <p><strong>Nome:</strong> ${nome || '<span style=\'color:#888\'>Não informado</span>'}</p>
        <p><strong>E-mail:</strong> ${email || '<span style=\'color:#888\'>Não informado</span>'}</p>
        <!-- INTEGRAÇÃO BACK-END: Permitir edição dos dados -->
      </div>
    `;
  }
  function renderEnderecos() {
    conteudo.innerHTML = `
      <h2>Endereços</h2>
      <div class="enderecos-box">
        <!-- INTEGRAÇÃO BACK-END: Listar e editar endereços do usuário -->
        <p style="color:#888;">Nenhum endereço cadastrado.</p>
      </div>
    `;
  }
  // Navegação das abas
  document.getElementById('tab-pedidos').onclick = function(e) { e.preventDefault(); renderPedidos(); };
  document.getElementById('tab-dados').onclick = function(e) { e.preventDefault(); renderDados(); };
  document.getElementById('tab-enderecos').onclick = function(e) { e.preventDefault(); renderEnderecos(); };
  // Sair
  document.getElementById('btn-sair').onclick = function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = 'index.html';
  };
  // Renderiza pedidos por padrão
  renderPedidos();
});
