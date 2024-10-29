import React, { useState, useEffect } from 'react';
import "../css/BookDisplay.css";
const BookDisplay = ({ func, book }) => {

   
    const [rating, setRating] = useState(book.rating);
    const url = "http://localhost:8080/books";
    // useEffect(() => {
    //     const url = "http://localhost:8080/books";
    //     const fetchBook = async () => {
    //         try {
    //             const response = await fetch(`${url}/${id}`);
    //             const data = await response.json();
    //             console.log(data);
    //             setBook(data);
    //             setRating(data.rating);
    //         } catch (error) {
    //             console.error("Error fetching book:", error);
    //         }
    //     };

    //     fetchBook();
    // }, [id]);


    const handleRatingUpdate = async (newRating) => {
        setRating(newRating);

        try {
            await fetch(`${url}/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...book, rating: newRating }),
            });

        } catch (error) {
            console.error("Error updating rating:", error);
        }
    };

    return (
        <div>
            {book ? (
                <div  style={{display:"inline"}} id="showContainer">
              
                    <button onClick={()=>{func();}} id="closeShowContainer">X</button>
                    <h4 id="imageTitle">{book.title}</h4>
                    <p id="bookPrice">{book.price} ש"ח</p>
                    <img id="bookImage" src={book.image} alt="Book Image" />
                    <div className="rating">
                        {[5, 4, 3, 2, 1].map((starValue) => (
                            <span
                                key={starValue}
                                className={`star ${starValue <= rating ? 'filled' : ''}`}
                                data-value={starValue}
                                onClick={() => handleRatingUpdate(starValue)}
                            >
                                ☆
                            </span>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BookDisplay;
