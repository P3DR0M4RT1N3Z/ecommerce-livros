// ecommerce-livros/js/carrinho.js

// Remover array mockado de carrinho e usar produtos.js
let carrinho = [];

document.write('<script src="js/produtos.js"></script>'); // Garante que produtos.js seja carregado se não estiver no HTML

// Função para obter produto pelo ID usando produtos.js
function getLivroById(id) {
  if (typeof getProductById === 'function') {
    return getProductById(id);
  }
  return null;
}

// Função para adicionar ao carrinho pelo ID do produto
function adicionarAoCarrinho(id) {
  const livro = getLivroById(id);
  if (!livro) return;
  let idx = carrinho.findIndex(item => item.id === id);
  if (idx > -1) {
    carrinho[idx].qtd++;
  } else {
    carrinho.push({ ...livro, qtd: 1 });
  }
  salvarCarrinho();
  renderCarrinho();
}

// Salva e carrega do localStorage
function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}
function carregarCarrinho() {
  const salvo = localStorage.getItem('carrinho');
  if (salvo) {
    carrinho = JSON.parse(salvo);
  } else {
    carrinho = [];
    salvarCarrinho();
  }
}

// Atualiza o contador do carrinho no navbar
function atualizarContadorCarrinho() {
  const carrinho = window.getCarrinho ? getCarrinho() : (window.carrinho || []);
  const total = carrinho.reduce((s, item) => s + (item.qtd || 1), 0);
  const span = document.getElementById('cart-count');
  if (span) span.textContent = total;
}

// Renderiza os itens do carrinho
function renderCarrinho() {
  const itensDiv = document.querySelector('.carrinho-itens');
  itensDiv.innerHTML = '';
  if (carrinho.length === 0) {
    itensDiv.innerHTML = `<div class="carrinho-vazio">
      Seu carrinho está vazio. <a href="catalogo.html">Explore o catálogo</a>!
    </div>`;
    atualizarResumo();
    return;
  }
  carrinho.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'carrinho-item';
    div.innerHTML = `
      <img src="${item.imagem}" alt="${item.titulo}">
      <div class="carrinho-info">
        <h3>${item.titulo}</h3>
        <p class="autor">${item.autor}</p>
        <div class="carrinho-qtd">
          <button class="qtd-btn" data-idx="${idx}" data-action="menos">-</button>
          <input type="number" value="${item.qtd}" min="1" data-idx="${idx}" readonly>
          <button class="qtd-btn" data-idx="${idx}" data-action="mais">+</button>
        </div>
      </div>
      <div class="carrinho-preco">
        <span>R$ ${(item.preco * item.qtd).toFixed(2).replace('.', ',')}</span>
        <button class="btn-remove" data-idx="${idx}" title="Remover do carrinho">✕</button>
      </div>
    `;
    itensDiv.appendChild(div);
  });
  atualizarResumo();
}

// Atualiza o resumo do pedido
function atualizarResumo() {
  let subtotal = carrinho.reduce((s, item) => s + item.preco * item.qtd, 0);
  let frete = carrinho.length > 0 ? 10 : 0;
  document.querySelectorAll('.resumo-linha span:last-child')[0].textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.querySelectorAll('.resumo-linha span:last-child')[1].textContent = `R$ ${frete.toFixed(2).replace('.', ',')}`;
  document.querySelector('.preco-total').textContent = `R$ ${(subtotal + frete).toFixed(2).replace('.', ',')}`;
}

// Função para mostrar notificação ao remover produto
function mostrarNotificacaoCarrinho(msg) {
  let notif = document.getElementById('notificacao-carrinho');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notificacao-carrinho';
    notif.className = 'notificacao-carrinho';
    notif.style.position = 'fixed';
    notif.style.top = '20px';
    notif.style.left = '50%';
    notif.style.transform = 'translateX(-50%)';
    notif.style.background = 'var(--cor-btn)';
    notif.style.color = '#fff';
    notif.style.padding = '0.8em 2em';
    notif.style.borderRadius = '2em';
    notif.style.fontSize = '1.1em';
    notif.style.boxShadow = '0 2px 8px rgba(123,94,87,0.15)';
    notif.style.zIndex = '1000';
    document.body.appendChild(notif);
  }
  notif.textContent = msg;
  notif.style.display = 'block';
  setTimeout(() => {
    notif.style.display = 'none';
  }, 1500);
}

// Eventos dos botões
document.addEventListener('click', function(e) {
  // Aumentar/diminuir quantidade
  if (e.target.classList.contains('qtd-btn')) {
    const idx = parseInt(e.target.dataset.idx);
    if (e.target.dataset.action === 'mais') {
      carrinho[idx].qtd++;
    } else if (e.target.dataset.action === 'menos' && carrinho[idx].qtd > 1) {
      carrinho[idx].qtd--;
    }
    renderCarrinho();
  }
  // Remover item
  if (e.target.classList.contains('btn-remove')) {
    const idx = parseInt(e.target.dataset.idx);
    carrinho.splice(idx, 1);
    salvarCarrinho();
    renderCarrinho();
    atualizarContadorCarrinho();
    mostrarNotificacaoCarrinho('Produto removido do carrinho!');
  }
});

// Exemplo de integração: adicionar evento global para botões de adicionar ao carrinho
window.addToCart = adicionarAoCarrinho;

// Inicialização
carregarCarrinho();
renderCarrinho();
atualizarContadorCarrinho();