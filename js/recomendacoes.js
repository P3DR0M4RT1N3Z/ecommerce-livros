// Simula recomendações personalizadas com base nos livros visualizados anteriormente
// utilizando JavaScript e localStorage.

// Função para obter recomendações personalizadas
function obterRecomendacoes() {
    // Simulação de livros recomendados
    const livrosRecomendados = [
        { id: 1, titulo: "O Alquimista", autor: "Paulo Coelho", imagem: "images/o-alquimista.jpg" },
        { id: 2, titulo: "1984", autor: "George Orwell", imagem: "images/1984.jpg" },
        { id: 3, titulo: "Dom Casmurro", autor: "Machado de Assis", imagem: "images/dom-casmurro.jpg" },
        { id: 4, titulo: "A Revolução dos Bichos", autor: "George Orwell", imagem: "images/a-revolucao-dos-bichos.jpg" },
        { id: 5, titulo: "A Menina que Roubava Livros", autor: "Markus Zusak", imagem: "images/a-menina-que-roubava-livros.jpg" }
    ];

    // Recupera os livros visualizados do localStorage
    const livrosVisualizados = JSON.parse(localStorage.getItem('livrosVisualizados')) || [];

    // Filtra recomendações com base nos livros visualizados
    const recomendacoes = livrosRecomendados.filter(livro => 
        livrosVisualizados.includes(livro.id)
    );

    return recomendacoes.length > 0 ? recomendacoes : livrosRecomendados.slice(0, 3); // Retorna recomendações ou os 3 primeiros livros
}

// Função para exibir recomendações na página inicial
function exibirRecomendacoes() {
    const recomendacoes = obterRecomendacoes();
    const container = document.getElementById('recomendacoes-container'); // Certifique-se de ter um elemento com esse ID no HTML

    recomendacoes.forEach(livro => {
        const card = document.createElement('div');
        card.className = 'livro-card';
        card.innerHTML = `
            <img src="${livro.imagem}" alt="${livro.titulo}">
            <h3>${livro.titulo}</h3>
            <p>${livro.autor}</p>
        `;
        container.appendChild(card);
    });
}

// Chama a função para exibir recomendações ao carregar a página
document.addEventListener('DOMContentLoaded', exibirRecomendacoes);