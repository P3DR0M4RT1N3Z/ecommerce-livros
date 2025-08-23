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
    titulo: "Nossas Almas famintas",
    autor: "Camila Koengkan",
    genero: "Dark Romance",
    idioma: "Português",
    tipoCapa: "Brochura",
    preco: 62.70,
    avaliacao: 4.8,
    estoqueDisponivel: 21,
    imagem: "images/nossas-almas-famintas.jpg",
    sinopse: "Dois corações partidos encontram consolo em um jogo emocional onde a dor é tão comum quanto o amor.",
    frase: "Amor é a fome que nunca se sacia.", 
    trecho: "Fome era pouco — eu desejava até a alma dela."
  },
  {
    id: 2,
    titulo: "Um falso acordo de amor",
    autor: "Eny Siqueira",
    genero: "Dark Romance",
    idioma: "Português",
    tipoCapa: "Capa Dura",
    preco: 50.00,
    avaliacao: 4.9,
    estoqueDisponivel: 15,
    imagem: "images/um-falso-acordo-de-amor.jpg",
    sinopse: "O que começou como um contrato de fachada se transforma em um relacionamento carregado de tensão, desejo e segredos do passado.",
    frase: " Acordos falsos podem esconder verdades perigosas.",
  trecho: "Fingimos tão bem, que deixamos de saber o que era real."
  },
  {
    id: 3,
    titulo: "Hunted",
    autor: "Darcy Coates",
    genero: "Juvenil",
    idioma: "Português",
    tipoCapa: "Capa Dura",
    preco: 71.32,
    avaliacao: 4.7,
    estoqueDisponivel: 30,
    imagem: "images/hunted.jpg",
    sinopse: "Uma jovem desaparecida. Um bosque maldito. Uma caçada pela verdade que pode custar a vida de todos.",
    frase: "Entre a vida e a morte, escolhi viver.",
    trecho: "A floresta me chamou. Eu respondi — e agora não posso sair."
  },
  {
    id: 4,
    titulo: "Atração fatal",
    autor: "Maeve Burns",
    genero: "Dark Romance",
    idioma: "Português",
    tipoCapa: "Brochura",
    preco: 52.99,
    avaliacao: 3.8,
    estoqueDisponivel: 18,
    imagem: "images/atracao-fatal.jpg",
    sinopse: "Um detetive e sua principal suspeita vivem uma relação onde o desejo pode ser mortal.",
    frase: "Atração é um jogo perigoso.",
    trecho: "Desejá-la era perigoso, mas negar-se era impossível."
  },
  {
    id: 5,
    titulo: "Love In the dark 1",
    autor: "Ellie Morgan",
    genero: "Dark Romance", 
    idioma: "Português",
    tipoCapa: "Brochura",
    preco: 65.99,
    avaliacao: 4.0,
    estoqueDisponivel: 23,
    imagem: "images/love-in-the-dark-1.jpg",
    sinopse: "Em um mundo dividido entre luz e sombras, uma jovem descobre que o amor pode ser sua salvação... ou sua ruína.",
    frase: "Em meio às trevas, encontrei uma luz que jamais pensei existir.",
    trecho: "Mesmo no breu, eu sentia o calor dos olhos dele queimando os meus segredos."
  },
  {
    id: 6,
    titulo: "Perseguindo Adeline 1",
    autor: "H.D. Carlton",
    genero: "Dark Romance",
    idioma: "Português",
    tipoCapa: "Capa Dura",
    preco: 19.99,
    avaliacao: 5.0,
    estoqueDisponivel: 39,
    imagem: "images/perseguindo-adeline-1.jpg",
    sinopse: "Adeline vive sob constante vigilância. Quando o perseguidor vira seu salvador, tudo se inverte num jogo cruel de controle e desejo.",
    frase: " Nas sombras do medo, encontrei um amor perigoso e irresistível.",
    trecho: "Ele me caçou como fera, mas me olhou como um homem perdido."
  },
  {
    id: 7,
    titulo: "Garotas Cruéis merecem pagar",
    autor: "R. Red",
    genero: "Dark Romance", 
    idioma:  "Português",
    tipoCapa: "Brochura",
    preco: 65.99,
    avaliacao: 3.0,
    estoqueDisponivel: 34,
    imagem: "images/garotas-crueis-merecem-pagar.jpg",
    sinopse: "Três garotas, três segredos obscuros e um pacto de vingança que pode destruir tudo ao redor.",
    frase: "A crueldade é a máscara que usamos para esconder nossas próprias feridas.",
    trecho:"Nós éramos cruéis porque o mundo nos obrigou a ser."
  },
  {
    id: 8,
    titulo: "Scarlet Devotion",
    autor: "Camila Koengkan",
    genero: "Dark Romance", 
    idioma: "Português",
    tipoCapa: "Brochura",
    preco: 15.99,
    avaliacao: 4.5,
    estoqueDisponivel: 55,
    imagem: "images/scarlet-devotion.jpg",
    sinopse: "Um culto secreto, uma garota marcada e um amor que desafia o pecado.",
    frase: " Entre o sagrado e o profano, escolhi meu próprio destino.",
    trecho: "Ele disse que eu era sagrada, mas sangrou cada parte da minha alma."
  },
  {
    id: 9,
    titulo: "Desenfreados 1",
    autor: "Kelly M.",
    genero: "Dark Romance",
    idioma:  "Português",
    tipoCapa: "Capa Dura",
    preco: 66.49,
    avaliacao: 4.8,
    estoqueDisponivel: 67,
    imagem: "images/desenfreados-1.jpg",
    sinopse: "Um romance proibido entre dois jovens dominados por paixões destrutivas e promessas que não deveriam ser feitas.",
    frase: "Nosso amor era um fogo que consumia tudo, inclusive a nós mesmos.",
    trecho:"Desenfreado não era o amor — era tudo que ele fazia comigo." 
  },
  {
    id: 10,
    titulo: "Desenfreados 2",
    autor: "Kelly M.",
    genero: "Dark Romance",
    idioma:  "Português",
    tipoCapa: "Capa Dura",
    preco: 66.49,
    avaliacao: 4.5,
    estoqueDisponivel: 58,
    imagem: "images/desenfreados-2.jpg",
    sinopse: "A continuação intensa e sombria de um amor que não aprendeu a viver sob regras.",
    frase: "Alguns amores são feitos para destruir, não para salvar.",
    trecho:"Talvez amar fosse isso: correr de tudo para se perder um no outro."
  },
  {
    id: 11,
    titulo: "Oblívio",
    autor: "Leonor Carvalho",
    genero: "Dark Romance",
    idioma:  "Português",
    tipoCapa: "Brochura",
    preco: 11.98,
    avaliacao: 3.4,
    estoqueDisponivel: 23,
    imagem: "images/oblivio.jpg",
    sinopse: "Em uma cidade onde todos querem esquecer, ela só queria lembrar quem realmente era — e por que aquele homem a fazia tremer.",
    frase: " No esquecimento, encontrei a verdade que ninguém queria ver.",
    trecho:"O esquecimento é um presente, mas ele me deu memórias como castigo."
  },
  {
    id: 12,
    titulo: "Obsessão Sangria",
    autor: "S.M. Silveira",
    genero: "Dark Romance",
    idioma:  "Português",
    tipoCapa: "Brochura",
    preco: 3.99,
    avaliacao: 2.9,
    estoqueDisponivel: 13,
    imagem: "images/obsessao-sangria.jpg",
    sinopse: "Uma jovem tenta escapar de um relacionamento obsessivo enquanto mergulha em um jogo de poder e submissão.",
    frase: "A obsessão é uma prisão dourada da qual não se pode escapar.",
    trecho:"Ele me fez provar o gosto do controle — e eu nunca mais fui a mesma."
  },
  {
    id: 13,
    titulo: "Garotos Furiosos Queimam Você",
    autor: "R. Red",
    genero: "Dark Romance",
    idioma:  "Português",
    tipoCapa: "Brochura",
    preco: 16.99,
    avaliacao: 4.6,
    estoqueDisponivel: 39,
    imagem: "images/garotos-furiosos-queimam-voce.jpg",
    sinopse: "Cinco garotos marcados por traumas se envolvem com uma garota que carrega sua própria fúria — e juntos, incendiarão o mundo",
    frase: "Furiosos, queimados, mas vivos — era tudo que tínhamos.",
    trecho: "Eles eram fogo, eu era gasolina. Era só uma questão de tempo."
    },
    {
    id: 14,
    titulo: "Possuída pela Sombra",
    autor: "Ruby Lace",
    genero: "Dark Romance",
    idioma:  "Português",
    tipoCapa: "Capa Dura",
    preco: 73.99,
    avaliacao: 4.7,
    estoqueDisponivel: 52,
    imagem: "images/possuida-pela-sombra.jpg",
    sinopse: "Entre o mundo real e o espiritual, ela foi marcada por uma entidade que a ama... de forma doentia e inevitável.",
    frase: "A sombra que me possui é a única que me entende.",
    trecho:"A sombra não me deixou — ela me amou até que eu fosse dela por completo."
    },
    {
    id: 15,
    titulo: "Assombrando Adeline",
    autor: "H. D. Carlson",
    genero: "Dark Romance",
    idioma:  "Português",
    tipoCapa: "Brochura",
    preco: 28.90,
    avaliacao: 5.0,
    estoqueDisponivel: 56,
    imagem: "images/assombrando-adeline.jpg",
    sinopse: "A sequência de 'Perseguindo Adeline' traz um enredo mais obscuro, onde os limites entre o medo e a paixão desaparecem.",
    frase: " No medo, encontrei o desejo mais profundo.",
    trecho:"A escuridão não apenas a rodeava — ela vivia dentro de mim."
    },
    {
    id: 16,
    titulo: "Twisted beauty",
    autor: "Camila Koengkan",
    genero: "Romance",
    idioma:  "Português",
    tipoCapa: "Brochura",
    preco: 62.90,
    avaliacao: 4.6,
    estoqueDisponivel: 23,
    imagem: "images/twisted-beauty.jpg",
    sinopse: "Ela foi amaldiçoada pela beleza, ele pela escuridão. Um romance impossível em um mundo cheio de segredos místicos.",
    frase: "Entre o sagrado e o profano, escolhi meu próprio destino.",
    trecho:"A beleza dela era uma prisão dourada, e eu era a chave."
    },
    {
    id: 17,
    titulo: "Dark manipulation",
    autor: "Dani Medina",
    genero: "Dark Romance",
    idioma:  "Português",
    tipoCapa: "Brochura",
    preco: 65.90,
    avaliacao: 4.1,
    estoqueDisponivel: 43,
    imagem: "images/dark-manipulation.jpg",
    sinopse: "Um mestre da manipulação encontra uma garota imune aos seus jogos. Mas talvez, no fim, o manipulado seja ele.",
    frase: " No jogo do controle, ninguém é realmente livre.",
    trecho:"Quem controla tudo, nunca está preparado para ser controlado."
    },

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
