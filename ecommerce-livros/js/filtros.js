// Lógica para implementar os filtros do catálogo de livros

document.addEventListener('DOMContentLoaded', function() {
    const books = [
        // Exemplo de dados de livros
        { title: "Livro A", author: "Autor A", genre: "Ficção", price: 29.90, rating: 4.5 },
        { title: "Livro B", author: "Autor B", genre: "Não-ficção", price: 39.90, rating: 3.5 },
        { title: "Livro C", author: "Autor C", genre: "Ficção", price: 19.90, rating: 5.0 },
        // Adicione mais livros conforme necessário
    ];

    const filterForm = document.getElementById('filter-form');
    const bookContainer = document.getElementById('book-container');

    filterForm.addEventListener('change', filterBooks);

    function filterBooks() {
        const genre = filterForm.genre.value;
        const author = filterForm.author.value;
        const minPrice = parseFloat(filterForm.minPrice.value) || 0;
        const maxPrice = parseFloat(filterForm.maxPrice.value) || Infinity;
        const minRating = parseFloat(filterForm.minRating.value) || 0;

        const filteredBooks = books.filter(book => {
            return (genre === '' || book.genre === genre) &&
                   (author === '' || book.author === author) &&
                   (book.price >= minPrice && book.price <= maxPrice) &&
                   (book.rating >= minRating);
        });

        displayBooks(filteredBooks);
    }

    function displayBooks(booksToDisplay) {
        bookContainer.innerHTML = ''; // Limpa o container

        booksToDisplay.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <p>Autor: ${book.author}</p>
                <p>Gênero: ${book.genre}</p>
                <p>Preço: R$ ${book.price.toFixed(2)}</p>
                <p>Avaliação: ${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5 - Math.floor(book.rating))}</p>
            `;
            bookContainer.appendChild(bookCard);
        });

        if (booksToDisplay.length === 0) {
            bookContainer.innerHTML = '<p>Nenhum livro encontrado.</p>';
        }
    }

    // Inicializa a exibição com todos os livros
    displayBooks(books);
});