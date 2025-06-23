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
    sinopse: "Uma das obras mais importantes da literatura brasileira, narrada por Bentinho e sua relação com Capitu.",
    frase: "Capitu, olhos de ressaca e mistérios do coração.",
    trecho: "Capitu olhou para mim com aqueles olhos de ressaca, e eu soube que jamais decifraria seus segredos."
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
    sinopse: "Um clássico sobre regimes totalitários e vigilância, que segue sendo atual décadas após sua publicação.",
    frase: "Big Brother está de olho em você.",
    trecho: "Se você quer uma imagem do futuro, imagine uma bota prensando um rosto humano — para sempre."
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
    sinopse: "Uma fábula poética sobre a vida, o amor e a amizade.",
    frase: "Tu te tornas eternamente responsável por aquilo que cativas.",
    trecho: "O essencial é invisível aos olhos."
  },
  {
    id: 4,
    titulo: "O Sol é Para Todos",
    autor: "Harper Lee",
    genero: "Clássico",
    idioma: "Português",
    tipoCapa: "Brochura",
    preco: 44.90,
    avaliacao: 4.8,
    estoqueDisponivel: 18,
    imagem: "images/o-sol-e-para-todos.jpg",
    sinopse: "Um clássico da literatura mundial, aborda temas como justiça, preconceito e empatia através dos olhos de uma criança no sul dos EUA dos anos 1930.",
    frase: "Você só entende uma pessoa de verdade quando vê as coisas do ponto de vista dela.",
    trecho: "A coragem é quando você sabe que está derrotado antes de começar, mas começa mesmo assim e vai até o fim, custe o que custar."
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
      <button class="btn-wishlist" data-id="${product.id}" title="Adicionar à Wishlist">
        <span class="icon-heart">&#9829;</span>
      </button>
      <div class="image-wrapper">
        <img src="${product.imagem}" alt="${product.titulo}" class="product-image">
      </div>
      <h3>${product.titulo}</h3>
      <p class="author">${product.autor}</p>
      <p class="price">${formatPriceBRL(product.preco)}</p>
      <!-- Botões removidos do card para mobile, agora só no produto.html -->
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
