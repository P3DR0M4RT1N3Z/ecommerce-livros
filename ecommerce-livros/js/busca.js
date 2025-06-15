// Função para implementar a busca inteligente com autocomplete
const livros = [
    { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien" },
    { titulo: "1984", autor: "George Orwell" },
    { titulo: "Dom Casmurro", autor: "Machado de Assis" },
    { titulo: "A Revolução dos Bichos", autor: "George Orwell" },
    { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry" },
    { titulo: "A Menina que Roubava Livros", autor: "Markus Zusak" },
    { titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling" },
    { titulo: "O Alquimista", autor: "Paulo Coelho" },
    { titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez" },
    { titulo: "A Culpa é das Estrelas", autor: "John Green" }
];

const campoBusca = document.getElementById('campo-busca');
const sugestoes = document.getElementById('sugestoes');

campoBusca.addEventListener('input', function() {
    const valorBusca = this.value.toLowerCase();
    sugestoes.innerHTML = '';

    if (valorBusca) {
        const resultados = livros.filter(livro => 
            livro.titulo.toLowerCase().includes(valorBusca) || 
            livro.autor.toLowerCase().includes(valorBusca)
        );

        resultados.forEach(livro => {
            const itemSugestao = document.createElement('div');
            itemSugestao.classList.add('sugestao');
            itemSugestao.textContent = `${livro.titulo} - ${livro.autor}`;
            itemSugestao.addEventListener('click', function() {
                campoBusca.value = livro.titulo;
                sugestoes.innerHTML = '';
            });
            sugestoes.appendChild(itemSugestao);
        });
    }
});

// Função para correção simples de digitação
function corrigirDigitação(texto) {
    const correcoes = {
        's': 'ç',
        'a': 'á',
        'e': 'é',
        'i': 'í',
        'o': 'ó',
        'u': 'ú'
    };

    return texto.split('').map(letra => correcoes[letra] || letra).join('');
}