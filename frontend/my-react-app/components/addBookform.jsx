import React, { useState } from 'react';

const AddBookForm = ({ addBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('à lire');
  const [pages, setPages] = useState('');
  const [category, setCategory] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = { title, author, image, status, pages, category };
    addBook(book);
    setConfirmationMessage(`Le livre "${book.title}" a été ajouté avec succès !`);
    // Réinitialiser les champs après l'ajout
    setTitle('');
    setAuthor('');
    setImage('');
    setStatus('à lire');
    setPages('');
    setCategory('');
    // Cacher le message de confirmation après quelques secondes
    setTimeout(() => {
      setConfirmationMessage('');
    }, 3000);
  };

  return (
    <div>
      {confirmationMessage && <p>{confirmationMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Auteur:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          <label>Image (URL):</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <div>
          <label>État:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="à lire">À lire</option>
            <option value="en cours de lecture">En cours de lecture</option>
            <option value="fini">Fini</option>
          </select>
        </div>
        <div>
          <label>Nombre de pages:</label>
          <input type="text" value={pages} onChange={(e) => setPages(e.target.value)} />
        </div>
        <div>
          <label>Catégorie:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <button type="submit">Ajouter le livre</button>
      </form>
    </div>
  );
};

export default AddBookForm;
