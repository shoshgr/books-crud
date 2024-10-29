import React, { useState } from 'react';
import BookDisplay from './BookDisplay';
import FormBook from './FormBook';

const Book = ({ book, onDelete ,books,setBooks}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleView = () => {
    setShowForm(false); 
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = () => {
    setShowForm(true);
    setIsEditing(true);
  };

  const handleDelete = () => {
    onDelete(book.id);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <tr>
        <td>{book.id}</td>
        <td>{book.title}</td>
        <td>{book.price} ש"ח</td>
        <td>
          <button onClick={handleView}>View</button>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </td>
      </tr>

      {showForm && (
        <div>
          {isEditing ? (
            <FormBook func={closeForm} type="UPDATE" book={book} books={books} setBooks={setBooks}/>
          ) : (
            <BookDisplay  func={closeForm} book={book} />
          )}
        </div>
      )}
    </>
  );
};

export default Book;
