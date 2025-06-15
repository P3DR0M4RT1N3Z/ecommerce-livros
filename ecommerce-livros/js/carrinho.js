// Lógica do carrinho de compras
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para atualizar o carrinho na interface
function atualizarCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho-container');
    carrinhoContainer.innerHTML = '';

    if (carrinho.length === 0) {
        carrinhoContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    carrinho.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('carrinho-item');
        itemDiv.innerHTML = `
            <img src="${item.imagem}" alt="${item.titulo}">
            <h3>${item.titulo}</h3>
            <p>Autor: ${item.autor}</p>
            <p>Preço: R$ ${item.preco.toFixed(2)}</p>
            <input type="number" value="${item.quantidade}" min="1" data-index="${index}" class="quantidade-input">
            <button data-index="${index}" class="remover-btn">Remover</button>
        `;
        carrinhoContainer.appendChild(itemDiv);
    });

    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total');
    totalDiv.innerHTML = `<h2>Total: R$ ${total.toFixed(2)}</h2>`;
    carrinhoContainer.appendChild(totalDiv);
}

// Função para adicionar um livro ao carrinho
function adicionarAoCarrinho(livro) {
    const livroExistente = carrinho.find(item => item.id === livro.id);
    if (livroExistente) {
        livroExistente.quantidade++;
    } else {
        carrinho.push({ ...livro, quantidade: 1 });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Função para remover um livro do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Função para alterar a quantidade de um livro no carrinho
function alterarQuantidade(index, novaQuantidade) {
    if (novaQuantidade < 1) {
        removerDoCarrinho(index);
    } else {
        carrinho[index].quantidade = novaQuantidade;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrinho();

    document.getElementById('carrinho-container').addEventListener('click', (event) => {
        if (event.target.classList.contains('remover-btn')) {
            const index = event.target.dataset.index;
            removerDoCarrinho(index);
        }
    });

    document.getElementById('carrinho-container').addEventListener('input', (event) => {
        if (event.target.classList.contains('quantidade-input')) {
            const index = event.target.dataset.index;
            const novaQuantidade = parseInt(event.target.value);
            alterarQuantidade(index, novaQuantidade);
        }
    });
});