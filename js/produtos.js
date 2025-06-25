// /js/produtos.js
// 📌 Módulo central para gerenciamento de produtos (Livros) no e-commerce
//
// =============================
// COMO CUSTOMIZAR ESTE ARQUIVO
// =============================
// - Altere o array 'products' para mudar os itens do catálogo (pode ser qualquer nicho: livros, roupas, eletrônicos, etc).
// - Cada campo do objeto pode ser renomeado ou removido conforme o tipo de produto.
// - Para adicionar/remover campos visuais nos cards, edite a função generateProductCardHTML.
// - Para mudar o formato do preço, altere a função formatPriceBRL.
// - Para mudar a estrutura dos cards (imagem, título, botões, etc), edite o template HTML na função generateProductCardHTML.
// - Para mudar a lógica de wishlist/carrinho, altere os arquivos wishlist.js e carrinho.js.
// - Os estilos visuais (cores, tamanhos, fontes, espaçamentos) estão em css/styles.css.

// Array de produtos (cada livro como um objeto completo)
// Para outro nicho, basta trocar os campos e objetos deste array.
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
// Use para listar todos os itens na vitrine, catálogo, etc.
function getAllProducts() {
  return products;
}

// Função: Retorna um produto específico pelo ID
// Use para página de detalhes ou ações de wishlist/carrinho.
function getProductById(id) {
  return products.find(product => product.id === id);
}

// Função: Filtra os produtos por múltiplos critérios
// Altere os filtros conforme o nicho (ex: categoria, marca, tamanho, cor, etc).
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
// Altere para outro formato de moeda se necessário.
function formatPriceBRL(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

// Função utilitária: Gerar HTML do Card de Produto (usado no catálogo)
// Edite este template para mudar a estrutura visual dos cards (imagem, botões, textos, etc).
function generateProductCardHTML(product) {
  const wishlist = (typeof getWishlist === 'function') ? getWishlist() : [];
  const isFavorito = wishlist.includes(product.id);
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="image-wrapper" style="position:relative;">
        <img src="${product.imagem}" alt="${product.titulo}" class="product-image">
        <!-- Botão de favoritos: altere a classe, posição, ícone ou lógica conforme o nicho -->
        <button class="btn-wishlist${isFavorito ? ' wishlist-ativo' : ''}" data-id="${product.id}" title="Adicionar à Wishlist" aria-pressed="${isFavorito ? 'true' : 'false'}">
          <span class="icon-heart">${isFavorito ? '♥' : '♡'}</span>
        </button>
      </div>
      <h3>${product.titulo}</h3> <!-- Altere para exibir outro campo/título -->
      <p class="author">${product.autor}</p> <!-- Altere/remova conforme o nicho -->
      <p class="price">${formatPriceBRL(product.preco)}</p> <!-- Altere classe, cor, formato -->
    </div>
  `;
}

// Expondo funções no escopo global (caso necessário)
// Use window.NOME_DA_FUNCAO para acessar de outros scripts.
window.getAllProducts = getAllProducts;
window.getProductById = getProductById;
window.filterProducts = filterProducts;
window.formatPriceBRL = formatPriceBRL;
window.generateProductCardHTML = generateProductCardHTML;

// Após renderizar os produtos, inicializar eventos dos botões wishlist
// Se mudar a lógica dos botões, ajuste aqui e em wishlist.js
if (typeof inicializarBotoesWishlist === 'function') {
  setTimeout(() => inicializarBotoesWishlist(), 0);
}
