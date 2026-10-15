
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/libraryDB')
    .then(() => {
        console.log('MongoDB Connected Successfully!');
    })
    .catch((error) => {
        console.log('MongoDB Connection Error:', error);
    });

const Book = require('./bookModel');

app.get('/', (req, res) => {
    res.send('Library Inventory Management API is running!');
});

app.post('/api/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        const savedBook = await book.save();

        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
