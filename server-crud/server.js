const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

let books = [];

const loadBooks = () => {
    fs.readFile('books.json', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        books = JSON.parse(data);
    });
};

const saveBooks = (res, successMessage) => {
    fs.writeFile('books.json', JSON.stringify(books, null, 2), (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json(successMessage);
    });
};

loadBooks();

app.get('/books', (req, res) => {

    if (books) {
        res.status(200).json(books);
    } else {
        res.status(404).json({ message: 'No books found' });
    }

});

app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(b => b.id == id);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }

})


app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id == id);

    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1)[0];
        saveBooks(res, deletedBook);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBook = req.body;


    if (!updatedBook) {
        return res.status(400).json({ message: 'Invalid book data' });
    }

    const bookIndex = books.findIndex(b => b.id == id);

    if (bookIndex !== -1) {
    
        books[bookIndex] = { ...books[bookIndex], ...updatedBook };
        saveBooks(res, books[bookIndex]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.post('/books', (req, res) => {
    const book = req.body;

    if (!book || !book.title || !book.price || !book.imageUrl) {
        return res.status(400).json({ message: 'Invalid book data' });
    }
    books.push(book);
    saveBooks(res, { message: 'Book added successfully', book });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
