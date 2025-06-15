// wishlist.js

const wishlist = [];

// Função para adicionar um livro à lista de desejos
function addToWishlist(book) {
    if (!wishlist.includes(book)) {
        wishlist.push(book);
        alert(`${book.title} foi adicionado à sua lista de desejos!`);
        updateWishlistDisplay();
    } else {
        alert(`${book.title} já está na sua lista de desejos.`);
    }
}

// Função para remover um livro da lista de desejos
function removeFromWishlist(book) {
    const index = wishlist.indexOf(book);
    if (index > -1) {
        wishlist.splice(index, 1);
        alert(`${book.title} foi removido da sua lista de desejos.`);
        updateWishlistDisplay();
    }
}

// Função para atualizar a exibição da lista de desejos
function updateWishlistDisplay() {
    const wishlistContainer = document.getElementById('wishlist-container');
    wishlistContainer.innerHTML = ''; // Limpa a lista atual

    wishlist.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'wishlist-item';
        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>Autor: ${book.author}</p>
            <button onclick="removeFromWishlist('${book.title}')">Remover</button>
        `;
        wishlistContainer.appendChild(bookElement);
    });
}

// Função para carregar a lista de desejos do localStorage
function loadWishlist() {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
    if (savedWishlist) {
        savedWishlist.forEach(book => wishlist.push(book));
        updateWishlistDisplay();
    }
}

// Função para salvar a lista de desejos no localStorage
function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Evento para salvar a lista de desejos ao sair da página
window.addEventListener('beforeunload', saveWishlist);

// Carregar a lista de desejos ao iniciar a página
loadWishlist();