// wishlist.js

const wishlist = [];

// Exemplo de livros mockados (adicione novos livros conforme necessário)
const livros = [
  {
    id: 1,
    titulo: "O Sol é Para Todos",
    autor: "Harper Lee",
    preco: 39.90,
    imagem: "images/livro1.jpg"
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    preco: 29.90,
    imagem: "images/livro2.jpg"
  },
  {
    id: 3,
    titulo: "Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    preco: 24.90,
    imagem: "images/livro3.jpg"
  },
  {
    id: 4,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    preco: 19.90,
    imagem: "images/livro4.jpg"
  },
  {
    id: 5,
    titulo: "Orgulho e Preconceito",
    autor: "Jane Austen",
    preco: 34.90,
    imagem: "images/livro5.jpg"
  }
  // Adicione mais livros aqui conforme necessário
];

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
    if (wishlist.includes(id)) {
      btn.classList.add('wishlist-ativo');
      btn.textContent = '♥';
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('wishlist-ativo');
      btn.textContent = '♡';
      btn.setAttribute('aria-pressed', 'false');
    }
  });
}

// Função para mostrar notificação no topo central
function mostrarNotificacao(mensagem) {
  let notif = document.getElementById('notificacao-wishlist');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notificacao-wishlist';
    notif.className = 'notificacao-wishlist';
    document.body.appendChild(notif);
  }
  notif.textContent = mensagem;
  notif.style.display = 'block';
  setTimeout(() => {
    notif.style.display = 'none';
  }, 1800);
}

// Adiciona ou remove da wishlist ao clicar no coração
function toggleWishlist(id) {
  let wishlist = getWishlist();
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(livroId => livroId !== id);
    mostrarNotificacao('Removido da wishlist!');
  } else {
    wishlist.push(id);
    mostrarNotificacao('Adicionado à wishlist!');
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
  livros.forEach(livro => {
    if (wishlistIds.includes(livro.id)) {
      const card = document.createElement('div');
      card.className = 'wishlist-card';
      card.innerHTML = `
        <img src="${livro.imagem}" alt="${livro.titulo}">
        <div class="wishlist-info">
          <h3>${livro.titulo}</h3>
          <p class="autor">${livro.autor}</p>
          <p class="preco">R$ ${livro.preco.toFixed(2).replace('.', ',')}</p>
          <div class="wishlist-actions">
            <button class="btn-primary btn-add-carrinho" data-id="${livro.id}">Adicionar ao Carrinho</button>
            <button class="btn-wishlist wishlist-ativo" data-id="${livro.id}" title="Remover da Wishlist" aria-pressed="true">♥</button>
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
    btn.onclick = function() {
      const id = parseInt(this.dataset.id);
      toggleWishlist(id);
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
  const livro = livros.find(l => l.id === id);
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
  alert('Livro adicionado ao carrinho!');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  renderWishlist();
  atualizarBotoesWishlist();
});