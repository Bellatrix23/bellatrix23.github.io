// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get references to the book form and book list elements
    const bookForm = document.getElementById('bookForm');
    const bookList = document.getElementById('bookList');

    // Load books from session storage/initialise empty array if no books are stored
    const books = JSON.parse(sessionStorage.getItem('books')) || [];
    // Render the initial list of books
    renderBooks(books);

    // Add event listener for form submission
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Avoiding the default form submission behavior
        // Create a new book object with data from the form
        const newBook = {
            id: Date.now(), // Generate a unique ID for the book
            author: bookForm.author.value,
            title: bookForm.title.value,
            genre: bookForm.genre.value,
            review: bookForm.review.value,
            rating: bookForm.rating.value
        };
        // Add the new book to the books array
        books.push(newBook);
        // Save the updated books array to session storage
        sessionStorage.setItem('books', JSON.stringify(books));
        // Render the updated list of books
        renderBooks(books);
        // Reset the form fields
        bookForm.reset();
    });

    // Function to render the list of books
    function renderBooks(books) {
        // Clear the existing book list
        bookList.innerHTML = '';
        // Loop through each book in the array
        books.forEach(book => {
            // Create a new div element for each book
            const bookElement = document.createElement('div');
            bookElement.className = 'book';
            // Set the inner HTML of the book element to display book information
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Review:</strong> ${book.review}</p>
                <p><strong>Rating:</strong> ${book.rating}/10</p>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;
            // Append the book element to the book list
            bookList.appendChild(bookElement);

            // Add event listener for the delete button
            bookElement.querySelector('.delete').addEventListener('click', () => {
                // Find the index of the book in the array
                const index = books.findIndex(b => b.id === book.id);
                // Remove the book from the array
                books.splice(index, 1);
                // Save the updated books array to session storage
                sessionStorage.setItem('books', JSON.stringify(books));
                // Render the updated list of books
                renderBooks(books);
            });

            // Add event listener for the edit button
            bookElement.querySelector('.edit').addEventListener('click', () => {
                // Populate the form fields with the book's information
                bookForm.author.value = book.author;
                bookForm.title.value = book.title;
                bookForm.genre.value = book.genre;
                bookForm.review.value = book.review;
                bookForm.rating.value = book.rating;
                // Find the index of the book in the array
                const index = books.findIndex(b => b.id === book.id);
                // Remove the book from the array (to be replaced with the updated book)
                books.splice(index, 1);
                // Save the updated books array to session storage
                sessionStorage.setItem('books', JSON.stringify(books));
                // Render the updated list of books
                renderBooks(books);
            });
        });
    }
});