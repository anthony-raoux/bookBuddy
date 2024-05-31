import React, { useState } from 'react';
import BookItem from './BookItem';

const BookComponent = ({ book, onUpdateBook }) => {
  const [showModal, setShowModal] = useState(false);
  const [lastPageRead, setLastPageRead] = useState(book.lastPageRead || 0);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChangePage = (e) => {
    setLastPageRead(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateBook({
      ...book,
      lastPageRead: lastPageRead
    });
    toggleModal();
  };

  return (
    <div>
      <div onClick={toggleModal}>
        <BookItem book={book} />
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <h2>{book.title}</h2>
            <p>Auteur: {book.author}</p>
            <p>Catégorie: {book.category}</p>
            <p>Nombre de pages: {book.totalPages}</p>
            <img src={book.imageUrl} alt={book.title} style={{ maxWidth: '200px', maxHeight: '200px' }} />
            <p>État: {book.status}</p>
            {book.status === 'En cours de lecture' && (
              <form onSubmit={handleSubmit}>
                <label htmlFor="lastPageRead">Dernière page lue:</label>
                <input type="number" id="lastPageRead" value={lastPageRead} onChange={handleChangePage} />
                <button type="submit">Mettre à jour</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookComponent;
