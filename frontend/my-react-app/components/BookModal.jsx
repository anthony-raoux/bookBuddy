import React, { useState, useEffect } from 'react';
import { Modal, Button, ProgressBar, Form } from 'react-bootstrap';

const BookModal = ({ book, isOpen, onClose, onSave, id }) => {
  const [status, setStatus] = useState(book.status);
  const [lastPageRead, setLastPageRead] = useState(book.lastPageRead || 0);

  useEffect(() => {
    setStatus(book.status); // Initialize status with the book status when the modal is opened
    setLastPageRead(book.lastPageRead || 0); // Initialize last page read
  }, [book]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...book, status, lastPageRead }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du livre');
      }

      const updatedBook = await response.json();
      onSave(updatedBook); // Call the update function passed as prop
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (e) => {
    setLastPageRead(Number(e.target.value));
  };

  const progress = Math.min((lastPageRead / book.totalPages) * 100, 100);

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Détails du Livre</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>{book.title}</h2>
        <p>Auteur: {book.author}</p>
        <p>Catégorie: {book.category}</p>
        <p>Nombre de pages: {book.totalPages}</p>
        <img src={book.imageUrl} alt={book.title} style={{ maxWidth: '200px', maxHeight: '200px' }} />
        <div className="mb-3">
          <label className="form-label">État:</label>
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="à lire">À lire</option>
            <option value="en cours de lecture">En cours de lecture</option>
            <option value="fini">Fini</option>
          </select>
        </div>
        {status === 'en cours de lecture' && (
          <>
            <Form.Group controlId="formLastPageRead">
              <Form.Label>Dernière page lue:</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max={book.totalPages}
                value={lastPageRead}
                onChange={handlePageChange}
              />
            </Form.Group>
            <ProgressBar now={progress} label={`${progress.toFixed(2)}%`} className="mt-3" />
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Sauvegarder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookModal;
