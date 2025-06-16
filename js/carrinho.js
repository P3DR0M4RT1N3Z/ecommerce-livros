// ecommerce-livros/js/carrinho.js

// Dados mockados do carrinho (preço fixo, quantidade variável)
let carrinho = [
  {
    id: 1,
    titulo: "O Sol é Para Todos",
    autor: "Harper Lee",
    preco: 39.90,
    qtd: 1,
    imagem: "images/livro1.jpg"
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    preco: 9.97, // Preço unitário fixo (exemplo: 59.80/6 = 9.97)
    qtd: 6,
    imagem: "images/livro2.jpg"
  }
];

// Salva e carrega do localStorage
function salvarCarrinho() {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}
function carregarCarrinho() {
  const salvo = localStorage.getItem('carrinho');
  if (salvo) carrinho = JSON.parse(salvo);
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
    renderCarrinho();
  }
});

// Inicialização
renderCarrinho();