import React, { useState } from 'react';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('à lire');
  const [pages, setPages] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = { title, author, image, status, pages, category };

    try {
      const response = await fetch('http://localhost:5000/api/books/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du livre');
      }

      // Réinitialiser les champs après l'ajout
      setTitle('');
      setAuthor('');
      setImage('');
      setStatus('à lire');
      setPages('');
      setCategory('');

      alert('Le livre a été ajouté avec succès !');
    } catch (error) {
      console.error(error);
      alert('Une erreur s\'est produite lors de l\'ajout du livre.');
    }
  };

  return (
    <div>
      <h2>Ajouter un livre</h2>
      <form onSubmit={handleSubmit}>
        <label>Titre:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Auteur:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <label>Image (URL):</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        <label>État:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="à lire">À lire</option>
          <option value="en cours de lecture">En cours de lecture</option>
          <option value="fini">Fini</option>
        </select>
        <label>Nombre de pages:</label>
        <input type="number" value={pages} onChange={(e) => setPages(e.target.value)} required />
        <label>Catégorie:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <button type="submit">Ajouter le livre</button>
      </form>
    </div>
  );
};

export default AddBookForm;

