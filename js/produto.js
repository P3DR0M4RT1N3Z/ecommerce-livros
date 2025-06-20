// produto.js
// Carrega os dados do produto com base no ID da URL e preenche a página

document.addEventListener('DOMContentLoaded', function() {
  // Função para obter o parâmetro id da URL
  function getIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
  }

  const id = getIdFromUrl();
  if (!id || typeof getProductById !== 'function') return;
  const produto = getProductById(id);
  if (!produto) return;

  // Preenche os dados do produto na página
  document.querySelector('.produto-capa img').src = produto.imagem;
  document.querySelector('.produto-capa img').alt = `Capa do livro ${produto.titulo}`;
  document.querySelector('.produto-detalhes h2').textContent = produto.titulo;
  document.querySelector('.produto-detalhes .autor').textContent = produto.autor;
  document.querySelector('.produto-detalhes .avaliacao .estrelas').textContent = '★'.repeat(Math.round(produto.avaliacao)) + '☆'.repeat(5-Math.round(produto.avaliacao));
  document.querySelector('.produto-detalhes .avaliacao .nota').textContent = `(${produto.avaliacao}/5)`;
  // Sinopse
  document.querySelector('.produto-detalhes .sinopse').textContent = produto.sinopse;
  // Preço
  if (window.formatPriceBRL) {
    document.querySelector('.produto-preco .preco').textContent = formatPriceBRL(produto.preco);
  } else {
    document.querySelector('.produto-preco .preco').textContent = 'R$ ' + produto.preco.toFixed(2).replace('.', ',');
  }
  // Estoque
  document.querySelector('.produto-preco .disponibilidade').textContent = produto.estoqueDisponivel > 0 ? 'Em estoque' : 'Indisponível';
  document.querySelector('.produto-preco .disponibilidade').className = 'disponibilidade ' + (produto.estoqueDisponivel > 0 ? 'disponivel' : 'indisponivel');

  // Ficha técnica (exemplo)
  const ficha = document.querySelector('.ficha-tecnica');
  if (ficha) {
    ficha.innerHTML = `
      <li><strong>Gênero:</strong> ${produto.genero}</li>
      <li><strong>Idioma:</strong> ${produto.idioma}</li>
      <li><strong>Tipo de capa:</strong> ${produto.tipoCapa}</li>
      <li><strong>Preço:</strong> ${window.formatPriceBRL ? formatPriceBRL(produto.preco) : 'R$ ' + produto.preco.toFixed(2).replace('.', ',')}</li>
    `;
  }

  // Exibe a frase específica do produto
  const fraseEl = document.querySelector('.frase-produto');
  if (fraseEl && produto.frase) {
    fraseEl.textContent = `"${produto.frase}"`;
  }

  // Botão 'Leia um trecho' funcional
  const btnTrecho = document.getElementById('abrirTrecho');
  const modalTrecho = document.getElementById('modalTrecho');
  const fecharTrecho = document.getElementById('fecharTrecho');
  if (btnTrecho && modalTrecho && fecharTrecho) {
    btnTrecho.onclick = () => {
      const trecho = produto.trecho || 'Trecho não disponível para este livro.';
      const pTrecho = modalTrecho.querySelector('.trecho-dinamico');
      if (pTrecho) pTrecho.textContent = trecho;
      modalTrecho.style.display = 'flex';
    };
    fecharTrecho.onclick = () => modalTrecho.style.display = 'none';
    window.onclick = e => { if (e.target === modalTrecho) modalTrecho.style.display = 'none'; };
  }
});
