// wishlist.js

const wishlist = [];

// Remover array mockado de livros e usar produtos.js
document.write('<script src="js/produtos.js"></script>'); // Garante que produtos.js seja carregado se não estiver no HTML

// Função para obter produto pelo ID usando produtos.js
function getLivroById(id) {
  if (typeof getProductById === 'function') {
    return getProductById(id);
  }
  return null;
}

// Funções para manipular wishlist no localStorage
function getWishlist() {
  return JSON.parse(localStorage.getItem('wishlist')) || [];
}
function setWishlist(wishlist) {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Funções para manipular carrinho no localStorage
function getCarrinho() {
  return JSON.parse(localStorage.getItem('carrinho')) || [];
}
function setCarrinho(carrinho) {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Atualiza visual dos botões de wishlist em toda a página
function atualizarBotoesWishlist() {
  const wishlist = getWishlist();
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const icon = btn.querySelector('.icon-heart');
    if (wishlist.includes(id)) {
      btn.classList.add('wishlist-ativo');
      btn.setAttribute('aria-pressed', 'true');
      if (icon) icon.textContent = '♥';
    } else {
      btn.classList.remove('wishlist-ativo');
      btn.setAttribute('aria-pressed', 'false');
      if (icon) icon.textContent = '♡';
    }
  });
  // Corrige botões de wishlist da página de produto (sem data-id)
  const btnProduto = document.querySelector('.produto-compra .btn-wishlist');
  if (btnProduto && !btnProduto.querySelector('.icon-heart')) {
    btnProduto.innerHTML = '<span class="icon-heart">♡</span>';
  }
}

// Notificação padrão para qualquer ação (wishlist ou carrinho)
function mostrarNotificacaoPadrao(mensagem) {
  let notif = document.getElementById('notificacao-wishlist');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notificacao-wishlist';
    notif.className = 'notificacao-wishlist';
    document.body.appendChild(notif);
  }
  notif.textContent = mensagem;
  notif.style.display = 'block';
  notif.classList.remove('fadeInOut');
  void notif.offsetWidth;
  notif.classList.add('fadeInOut');
  setTimeout(() => {
    notif.style.display = 'none';
    notif.classList.remove('fadeInOut');
  }, 1800);
}

// Adiciona ou remove da wishlist ao clicar no coração
function toggleWishlist(id) {
  let wishlist = getWishlist();
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(livroId => livroId !== id);
    mostrarNotificacaoPadrao('Removido da wishlist!');
  } else {
    wishlist.push(id);
    mostrarNotificacaoPadrao('Adicionado à wishlist!');
  }
  setWishlist(wishlist);
  atualizarBotoesWishlist();
  renderWishlist();
}

// Renderiza a wishlist editável
function renderWishlist() {
  const grid = document.querySelector('.wishlist-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const wishlistIds = getWishlist();
  if (wishlistIds.length === 0) {
    grid.innerHTML = `<div class="wishlist-vazia">
      Sua lista de desejos está vazia. Explore o <a href="catalogo.html">catálogo</a> e salve seus livros favoritos!
    </div>`;
    return;
  }
  wishlistIds.forEach(id => {
    const livro = getLivroById(id);
    if (livro) {
      const card = document.createElement('div');
      card.className = 'wishlist-card';
      card.innerHTML = `
        <img src="${livro.imagem}" alt="${livro.titulo}">
        <div class="wishlist-info">
          <h3>${livro.titulo}</h3>
          <p class="autor">${livro.autor}</p>
          <p class="preco">${formatPriceBRL(livro.preco)}</p>
          <div class="wishlist-actions">
            <button class="btn-primary btn-add-carrinho" data-id="${livro.id}">Adicionar ao Carrinho</button>
            <button class="btn-wishlist wishlist-ativo" data-id="${livro.id}" title="Remover da Wishlist" aria-pressed="true">
              <span class="icon-heart-ativo"><img src="https://img.icons8.com/material-sharp/24/like--v1.png" alt="Remover dos favoritos" style="width:1em;height:1em;vertical-align:middle;"></span>
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    }
  });
  inicializarBotoesWishlist();
  inicializarBotoesAddCarrinho();
}

// Inicializa botões de wishlist (adicionar/remover)
function inicializarBotoesWishlist() {
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    btn.onclick = function(e) {
      e.preventDefault();
      const id = parseInt(this.dataset.id);
      if (!isNaN(id)) {
        this.classList.add('heart-animate');
        setTimeout(() => this.classList.remove('heart-animate'), 250);
        toggleWishlist(id);
      }
    };
  });
}

// Inicializa botões de adicionar ao carrinho
function inicializarBotoesAddCarrinho() {
  document.querySelectorAll('.btn-add-carrinho').forEach(btn => {
    btn.onclick = function() {
      const id = parseInt(this.dataset.id);
      adicionarAoCarrinho(id);
    };
  });
}

// Adiciona livro ao carrinho e remove da wishlist
function adicionarAoCarrinho(id) {
  const livro = getLivroById(id);
  if (!livro) return;
  let carrinho = getCarrinho();
  const idx = carrinho.findIndex(item => item.id === id);
  if (idx > -1) {
    carrinho[idx].qtd++;
  } else {
    carrinho.push({ ...livro, qtd: 1 });
  }
  setCarrinho(carrinho);
  // Remove da wishlist após adicionar ao carrinho
  let wishlist = getWishlist();
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(livroId => livroId !== id);
    setWishlist(wishlist);
    atualizarBotoesWishlist();
    renderWishlist();
  }
  mostrarNotificacaoPadrao('Livro adicionado ao carrinho!');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderWishlist();
  atualizarBotoesWishlist();
  window.inicializarBotoesWishlist = inicializarBotoesWishlist;
});