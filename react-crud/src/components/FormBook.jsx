import React, { useState } from 'react';

const FormBook = ({ func, type, book = {} ,books,setBooks}) => {
  const [formData, setFormData] = useState({
    id: book.id || '',
    title: book.title || '',
    price: book.price || '',
    imageUrl: book.imageUrl || ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = type === 'UPDATE' ? `http://localhost:8080/books/${formData.id}` : 'http://localhost:8080/books';
      const method = type === 'UPDATE' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (type === 'UPDATE') {
          setBooks(books.map(b => (b.id === formData.id ? formData : b)));
        } else {
          setBooks([...books, formData]); 
        }
        func();
     
      } else {
        console.error(`Failed to ${type === 'UPDATE' ? 'update' : 'add'} book`);
      }
    } catch (error) {
      console.error(`Error trying to ${type === 'UPDATE' ? 'update' : 'add'} book:`, error);
    }
  };

  return (
    <form className="form" id="addBookForm" onSubmit={handleSubmit}>
      <button
        type="button"
        id="closeForm"
        onClick={() => func()}
      >
        <span>X</span>
      </button>
      <label htmlFor="id">ID:</label>
      <input
        type="number"
        id="id"
        value={formData.id}
        onChange={handleInputChange}
        disabled={type === 'UPDATE'}
      />
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        value={formData.price}
        onChange={handleInputChange}
      />
      <label htmlFor="imageUrl">Image URL:</label>
      <input
        type="text"
        id="imageUrl"
        value={formData.imageUrl}
        onChange={handleInputChange}
      />
      <button id="updateBtn" type="submit">
        {type === 'UPDATE' ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default FormBook;
