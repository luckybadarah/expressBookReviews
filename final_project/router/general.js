const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

// Get all books
public_users.get('/', async (req, res) => {
    return res.status(200).json(books);
});

// Get book by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        return res.status(200).json(books[isbn]);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

// Get books by author
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author.toLowerCase();
    const filteredBooks = Object.values(books).filter(book => 
        book.author.toLowerCase() === author
    );
    return res.status(200).json(filteredBooks);
});

// Get books by title
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title.toLowerCase();
    const filteredBooks = Object.values(books).filter(book => 
        book.title.toLowerCase() === title
    );
    return res.status(200).json(filteredBooks);
});

module.exports.general = public_users;
