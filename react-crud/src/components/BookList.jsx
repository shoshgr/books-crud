import React, { useState, useEffect } from 'react';
import Book from './Book';  
import FormBook from './FormBook';
import "../css/BookList.css";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddBook = () => {
    setShowAddForm(true);
  };

  const closeForm = () => {
    setShowAddForm(false);
  };
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8080/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/books/${id}`, { method: 'DELETE' });
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
            <button onClick={handleAddBook}>Add Book</button>
       {showAddForm && (
        <FormBook type="ADD" func={closeForm} books={books} setBooks={setBooks} />
      )}
      <table id="book-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <Book key={book.id} book={book} onDelete={handleDelete} books={books} setBooks={setBooks} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
