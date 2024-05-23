import React, { useState } from 'react';

const BookItem = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(book.currentPage);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.target.value);
  };

  const handleSavePage = () => {
    // Mettre à jour la dernière page lue du livre
    // Exemple de requête à l'API pour mettre à jour la page
    fetch(`http://localhost:5000/api/books/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPage }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Page mise à jour avec succès', data);
        // Vous pouvez également mettre à jour localement l'état du livre ici si nécessaire
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la page', error);
      });
  };

  return (
    <div>
      <div onClick={handleModalToggle}>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <p>{book.category}</p>
        {book.status === 'en cours de lecture' && (
          <div>
            <p>Dernière page lue: {book.currentPage}</p>
            <input
              type="number"
              value={currentPage}
              onChange={handlePageChange}
              placeholder="Entrez la dernière page lue"
            />
            <button onClick={handleSavePage}>Enregistrer la page</button>
          </div>
        )}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalToggle}>&times;</span>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.category}</p>
            <p>{book.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookItem;
