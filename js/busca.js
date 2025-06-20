// Exemplo de livros mockados (substitua por dados reais ou carregue de um JSON)
// Utilize os produtos reais do sistema
const livrosBusca = typeof getAllProducts === 'function' ? getAllProducts() : [];

// Função para normalizar texto (remover acentos e deixar minúsculo)
function normalizar(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Busca inteligente com sugestões
const searchInput = document.getElementById('search-input');
const suggestions = document.getElementById('suggestions');

if (searchInput && suggestions) {
  searchInput.addEventListener('input', function () {
    const termo = normalizar(this.value.trim());
    suggestions.innerHTML = '';
    if (termo.length < 2) {
      suggestions.style.display = 'none';
      return;
    }
    // Busca por título, autor ou gênero
    const resultados = livrosBusca.filter(livro =>
      normalizar(livro.titulo).includes(termo) ||
      normalizar(livro.autor).includes(termo) ||
      (livro.genero && normalizar(livro.genero).includes(termo))
    ).slice(0, 5); // Limita a 5 sugestões

    if (resultados.length === 0) {
      suggestions.style.display = 'none';
      return;
    }

    resultados.forEach(livro => {
      const li = document.createElement('li');
      li.textContent = `${livro.titulo} – ${livro.autor}`;
      li.tabIndex = 0;
      li.onclick = () => {
        searchInput.value = livro.titulo;
        suggestions.style.display = 'none';
        // Redireciona para a página do produto (ajuste o link conforme sua estrutura)
        window.location.href = `produto.html?id=${livro.id}`;
      };
      li.onkeydown = (e) => {
        if (e.key === 'Enter') li.onclick();
      };
      suggestions.appendChild(li);
    });
    suggestions.style.display = 'block';
  });

  // Esconde sugestões ao clicar fora
  document.addEventListener('click', function (e) {
    if (!suggestions.contains(e.target) && e.target !== searchInput) {
      suggestions.style.display = 'none';
    }
  });
}

// Submissão do formulário de busca
if (searchInput && searchInput.form) {
  searchInput.form.addEventListener('submit', function (e) {
    e.preventDefault();
    const termo = normalizar(searchInput.value.trim());
    if (!termo) return;
    // Busca o primeiro resultado correspondente
    const resultado = livrosBusca.find(livro =>
      normalizar(livro.titulo).includes(termo) ||
      normalizar(livro.autor).includes(termo) ||
      normalizar(livro.categoria).includes(termo)
    );
    if (resultado) {
      window.location.href = `produto.html?id=${resultado.id}`;
    } else {
      alert('Nenhum livro encontrado.');
    }
    suggestions.style.display = 'none';
  });
}