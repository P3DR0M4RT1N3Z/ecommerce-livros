// /js/produtos.js
// 📌 Módulo central para gerenciamento de produtos (Livros) no e-commerce

// Array de produtos (cada livro como um objeto completo)
const products = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    genero: "Clássico",
    idioma: "Português",
    tipoCapa: "Brochura",
    preco: 39.90,
    avaliacao: 4.8,
    estoqueDisponivel: 20,
    imagem: "images/dom-casmurro.jpg",
    sinopse: "Uma das obras mais importantes da literatura brasileira, narrada por Bentinho e sua relação com Capitu."
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    genero: "Ficção Distópica",
    idioma: "Inglês",
    tipoCapa: "Capa Dura",
    preco: 59.90,
    avaliacao: 4.9,
    estoqueDisponivel: 15,
    imagem: "images/1984.jpg",
    sinopse: "Um clássico sobre regimes totalitários e vigilância, que segue sendo atual décadas após sua publicação."
  },
  {
    id: 3,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    genero: "Infantil",
    idioma: "Francês",
    tipoCapa: "Brochura",
    preco: 29.90,
    avaliacao: 4.7,
    estoqueDisponivel: 30,
    imagem: "images/o-pequeno-principe.jpg",
    sinopse: "Uma fábula poética sobre a vida, o amor e a amizade."
  }
  // 👉 Adicione mais livros conforme necessário
];

// Função: Retorna todos os produtos
function getAllProducts() {
  return products;
}

// Função: Retorna um produto específico pelo ID
function getProductById(id) {
  return products.find(product => product.id === id);
}

// Função: Filtra os produtos por múltiplos critérios
function filterProducts(filters) {
  return products.filter(product => {
    const matchGenero = !filters.genero || product.genero === filters.genero;
    const matchAutor = !filters.autor || product.autor === filters.autor;
    const matchPrecoMin = filters.precoMin === undefined || product.preco >= filters.precoMin;
    const matchPrecoMax = filters.precoMax === undefined || product.preco <= filters.precoMax;
    const matchIdioma = !filters.idioma || product.idioma === filters.idioma;
    const matchCapa = !filters.tipoCapa || product.tipoCapa === filters.tipoCapa;
    return matchGenero && matchAutor && matchPrecoMin && matchPrecoMax && matchIdioma && matchCapa;
  });
}

// Função: Formatar preço para BRL
function formatPriceBRL(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

// Função utilitária: Gerar HTML do Card de Produto (usado no catálogo)
function generateProductCardHTML(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <button class="btn-wishlist btn-estrela" data-id="${product.id}" title="Adicionar à Wishlist" aria-label="Favoritar" style="position:absolute;top:0.7em;right:0.7em;z-index:3;">
        ★
      </button>
      <img src="${product.imagem}" alt="${product.titulo}" class="product-image">
      <h3>${product.titulo}</h3>
      <p class="author">${product.autor}</p>
      <p class="price">${formatPriceBRL(product.preco)}</p>
      <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
    </div>
  `;
}

// Expondo funções no escopo global (caso necessário)
window.getAllProducts = getAllProducts;
window.getProductById = getProductById;
window.filterProducts = filterProducts;
window.formatPriceBRL = formatPriceBRL;
window.generateProductCardHTML = generateProductCardHTML;

// Após renderizar os produtos, inicializar eventos dos botões wishlist
if (typeof inicializarBotoesWishlist === 'function') {
  setTimeout(() => inicializarBotoesWishlist(), 0);
}
