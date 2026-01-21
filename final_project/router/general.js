const express = require('express');
const axios = require('axios');  // Import Axios
const public_users = express.Router();

// Helper function to fetch books via Axios
const fetchBooks = async () => {
    try {
        // Replace this URL with your own server if needed
        const response = await axios.get('http://localhost:6000/books');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch books');
    }
};

// Get all books
public_users.get('/', async (req, res) => {
    try {
        const books = await fetchBooks();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get book by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const books = await fetchBooks();
        const isbn = req.params.isbn;
        if (books[isbn]) {
            return res.status(200).json(books[isbn]);
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get books by author
public_users.get('/author/:author', async (req, res) => {
    try {
        const books = await fetchBooks();
        const author = req.params.author.toLowerCase();
        const filteredBooks = Object.values(books).filter(book =>
            book.author.toLowerCase() === author
        );
        if (filteredBooks.length > 0) {
            return res.status(200).json(filteredBooks);
        } else {
            return res.status(404).json({ message: "No books found for that author" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Get books by title
public_users.get('/title/:title', async (req, res) => {
    try {
        const books = await fetchBooks();
        const title = req.params.title.toLowerCase();
        const filteredBooks = Object.values(books).filter(book =>
            book.title.toLowerCase() === title
        );
        if (filteredBooks.length > 0) {
            return res.status(200).json(filteredBooks);
        } else {
            return res.status(404).json({ message: "No books found for that title" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports.general = public_users;
